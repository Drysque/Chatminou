export const appConstants = {
  port: 8080,
} as const;

export const riotConstants = {
  accessToken: {
    url: 'https://auth.riotgames.com/api/v1/authorization',
    client_id: 'play-valorant-web-prod',
    redirect_uri: 'https://playvalorant.com/opt_in',
    response_type: 'token id_token',
    nonce: '1',
    scope: 'account openid',
  },
  entitlements: {
    url: 'https://entitlements.auth.riotgames.com/api/token/v1',
  },
  user_agent: 'RiotClient/43.0.1.4195386.4190634 rso-auth (Windows; 10;;Professional, x64)',
} as const;
