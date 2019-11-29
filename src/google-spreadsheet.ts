import {google, sheets_v4} from 'googleapis';
import {OAuth2Client, Credentials} from 'google-auth-library';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

interface GoogleCreadentialInstalled {
  client_id: string;
  project_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_secret: string;
  redirect_uris: string[];
}

interface GoogleCredential {
  installded: GoogleCreadentialInstalled;
}

export class Sheet {
  private oAuth2Client: OAuth2Client;
  private sheets: sheets_v4.Sheets;

  constructor(credential: GoogleCredential) {
    const {
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uris: redirectUris
    } = credential.installded;

    this.oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUris[0]);
  }

  setToken(token: Credentials) {
    const {oAuth2Client} = this;
    oAuth2Client.setCredentials(token);
  }

  async getNewToken(code: string): Promise<Credentials> {
    const {oAuth2Client} = this;
    const tokenResponse = await oAuth2Client.getToken(code);
    return tokenResponse.tokens;
  }

  generateAuthUrl(): string {
    const {oAuth2Client} = this;

    const authUrl: string = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });

    return authUrl;
  }

  getSheet(): sheets_v4.Sheets {
    this.sheets = google.sheets({
      version: 'v4',
      auth: this.oAuth2Client,
    });
    return this.sheets;
  }
}
