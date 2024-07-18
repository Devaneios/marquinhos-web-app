export interface UserAuth {
  discordId: string;
  discordToken: string;
  lastfmToken: string;
  scrobblesOn: boolean;
}

export type UserAuthentication = {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
};
