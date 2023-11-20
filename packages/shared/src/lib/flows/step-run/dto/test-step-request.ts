import { Static, Type } from '@sinclair/typebox'
import { PackageType, PieceType, VersionType } from '../../../pieces'
import { ActionType } from '../../actions/action'

export const CreateStepRunRequestBody = Type.Object({
    flowVersionId: Type.String(),
    stepName: Type.String(),
})

export const PieceRunRequestBody = Type.Object({
    name: Type.String({}),
    valid: Type.Boolean({}),
    displayName: Type.String({}),
    type: Type.Literal(ActionType.PIECE),
    settings: Type.Object({
        packageType: Type.Enum(PackageType),
        pieceType: Type.Enum(PieceType),
        pieceName: Type.String({}),
        pieceVersion: VersionType,
        actionName: Type.Optional(Type.String({})),
        input: Type.Record(Type.String({}), Type.Any()),
        inputUiInfo: Type.Object(
            {
                currentSelectedData: Type.Optional(Type.Unknown()),
                customizedInputs: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
                lastTestDate: Type.Optional(Type.String()),
            },
            {
                additionalProperties: true,
            },
        ),  
    }),
})

export const StepRunResponse = Type.Object({
    success: Type.Boolean(),
    output: Type.Unknown(),
    standardError: Type.String(),
    standardOutput: Type.String(),
})

export type StepRunResponse = Static<typeof StepRunResponse>