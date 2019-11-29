"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const googleapis_1 = require("googleapis");
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
class Sheet {
    constructor(credential) {
        const { client_id: clientId, client_secret: clientSecret, redirect_uris: redirectUris, } = credential.installed;
        this.oAuth2Client = new googleapis_1.google.auth.OAuth2(clientId, clientSecret, redirectUris[0]);
    }
    setToken(token) {
        const { oAuth2Client } = this;
        oAuth2Client.setCredentials(token);
    }
    async getNewToken(code) {
        const { oAuth2Client } = this;
        const tokenResponse = await oAuth2Client.getToken(code);
        return tokenResponse.tokens;
    }
    generateAuthUrl() {
        const { oAuth2Client } = this;
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
        });
        return authUrl;
    }
    getSheet() {
        this.sheets = googleapis_1.google.sheets({
            version: 'v4',
            auth: this.oAuth2Client,
        });
        return this.sheets;
    }
}
exports.Sheet = Sheet;
//# sourceMappingURL=google-spreadsheet.js.map