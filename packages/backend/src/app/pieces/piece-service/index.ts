import {
    ActivepiecesError,
    EngineResponseStatus,
    ErrorCode,
    PackageType,
    PiecePackage,
    PieceType,
    ProjectId,
    PieceAction,
    Action,
    StepRunResponse,
    isNil,
    ExecutePieceOperation,
} from '@activepieces/shared'
import { getServerUrl } from '../../helper/public-ip-utils'
import { engineHelper } from '../../helper/engine-helper'
import { pieceMetadataService } from '../piece-metadata-service'
import { PieceMetadataModel } from '../piece-metadata-entity'
import { logger } from '../../helper/logger'
import { pieceServiceHooks } from './piece-service-hooks'

export const pieceService = {
    async add(params: AddPieceParams): Promise<PieceMetadataModel> {
        try {
            const piecePackage = await getPiecePackage(params)
            const engineResponse = await engineHelper.extractPieceMetadata(piecePackage)

            if (engineResponse.status !== EngineResponseStatus.OK) {
                throw new Error(engineResponse.standardError)
            }

            const savedPiece = await pieceMetadataService.create({
                pieceMetadata: {
                    ...engineResponse.result,
                    minimumSupportedRelease: engineResponse.result.minimumSupportedRelease ?? '0.0.0',
                    maximumSupportedRelease: engineResponse.result.maximumSupportedRelease ?? '999.999.999',
                    name: params.pieceName,
                    version: params.pieceVersion,
                },
                projectId: params.projectId,
                packageType: params.packageType,
                pieceType: PieceType.CUSTOM,
                archiveId: piecePackage.archiveId,
            })

            return savedPiece
        }
        catch (error) {
            logger.error(error, '[PieceService#add]')

            throw new ActivepiecesError({
                code: ErrorCode.PIECE_NOT_FOUND,
                params: {
                    pieceName: params.pieceName,
                    pieceVersion: params.pieceVersion,
                },
            })
        }
    },
    async run({ step, projectId }: RunParams<PieceAction>): Promise<StepRunResponse> {
        return executePiece({ step, projectId })
    },
}

const getPiecePackage = async (params: AddPieceParams): Promise<PiecePackage> => {
    switch (params.packageType) {
        case PackageType.ARCHIVE: {
            return await pieceServiceHooks.get().getPieceArchivePackage(params)
        }

        case PackageType.REGISTRY: {
            return {
                ...params,
                pieceType: PieceType.CUSTOM,
            }
        }
    }
}

async function executePiece({ step, projectId }: RunParams<PieceAction>): Promise<StepRunResponse> {
    const { packageType, pieceType, pieceName, pieceVersion, actionName, input } = step.settings
    if (isNil(actionName)) {
        throw new ActivepiecesError({
            code: ErrorCode.VALIDATION,
            params: {
                message: 'actionName is undefined',
            },
        })
    }

    const operation: ExecutePieceOperation = {
        serverUrl: await getServerUrl(),
        piece: {
            packageType,
            pieceType,
            pieceName,
            pieceVersion,
            projectId,
        },
        actionName,
        input,
        projectId,
    }

    const { result, standardError, standardOutput } = await engineHelper.executePiece(operation)
    return {
        success: result.success,
        output: result.output,
        standardError,
        standardOutput,
    }
}

type BaseAddPieceParams<PT extends PackageType> = {
    packageType: PT
    pieceName: string
    pieceVersion: string
    projectId: ProjectId
}

type AddRegistryPieceParams = BaseAddPieceParams<PackageType.REGISTRY>

type AddArchivePieceParams = BaseAddPieceParams<PackageType.ARCHIVE> & {
    archive: Buffer
}

type AddPieceParams =
    | AddRegistryPieceParams
    | AddArchivePieceParams

type RunParams<T extends Action> = {
    step: T
    projectId: ProjectId
}