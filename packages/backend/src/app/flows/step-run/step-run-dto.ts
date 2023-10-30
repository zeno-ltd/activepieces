import { CreateStepRunRequestBody } from '@activepieces/shared'
import { PieceRunRequestBody } from '@activepieces/shared'
import { Type } from '@sinclair/typebox'

export const CreateStepRunRequest = {
    schema: {
        body: CreateStepRunRequestBody,
    },
}

export const PieceRunRequest = {
    schema: {
        body: Type.Object({
            projectId: Type.String(),
            piece: PieceRunRequestBody,  
        }),
    },
}