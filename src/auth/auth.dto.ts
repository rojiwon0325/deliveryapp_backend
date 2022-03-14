export class AuthPayload {
  passport_id: string;
  username: string;
  email: string | null;
  access_token: string | null;
  refresh_token: string | null;
}
