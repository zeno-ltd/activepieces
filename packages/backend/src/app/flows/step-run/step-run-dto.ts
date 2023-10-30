import { CreateStepRunRequestBody } from '@activepieces/shared'
import { PieceRunRequestBody } from '@activepieces/shared'
import { Type } from '@sinclair/typebox'
import { FlowVersion } from '@activepieces/shared'

export const CreateStepRunRequest = {
    schema: {
        body: CreateStepRunRequestBody,
    },
}

export const PieceRunRequest = {
    schema: {
        body: Type.Object({
            flowVersion: FlowVersion,
            projectId: Type.String(),
            piece: PieceRunRequestBody,  
        }),
    },
}