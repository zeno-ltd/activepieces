
import { createPiece, PieceAuth, Property } from "@activepieces/pieces-framework";
import { sendTemplateMessage } from "./lib/actions/send-template-message";

export const watiAuth = PieceAuth.CustomAuth({
  required: true,
  props: {
    url: Property.ShortText({
      displayName: 'api endpoint url',
      required: true
    }),
    token: PieceAuth.SecretText({
      displayName: 'api auth token',
      required: true
    })
  }
});


export const wati = createPiece({
  displayName: "Wati",
  auth: watiAuth,
  minimumSupportedRelease: '0.9.0',
  logoUrl: "https://cdn.activepieces.com/pieces/wati.png",
  authors: [],
  actions: [sendTemplateMessage],
  triggers: [],
});
