export interface UserAuth {
  discordId: string;
  discordToken: string;
  lastfmToken: string;
  scrobblesOn: boolean;
}

export type Authentication = {
  accessToken: string;
  refreshToken: string;
};
