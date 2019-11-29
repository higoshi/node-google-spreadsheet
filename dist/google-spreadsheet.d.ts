import { sheets_v4 } from 'googleapis';
import { Credentials } from 'google-auth-library';
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
    installed: GoogleCreadentialInstalled;
}
export declare class Sheet {
    private oAuth2Client;
    private sheets;
    constructor(credential: GoogleCredential);
    setToken(token: Credentials): void;
    getNewToken(code: string): Promise<Credentials>;
    generateAuthUrl(): string;
    getSheet(): sheets_v4.Sheets;
}
export {};
