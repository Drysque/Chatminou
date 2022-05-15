import { Agent } from 'https';

export const appConstants = {
  port: 8080,
};

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
  userAgent: 'RiotClient/43.0.1.4195386.4190634 rso-auth (Windows; 10;;Professional, x64)',
  httpsAgent: new Agent({
    ciphers: [
      'TLS_CHACHA20_POLY1305_SHA256',
      'TLS_AES_128_GCM_SHA256',
      'TLS_AES_256_GCM_SHA384',
      'TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256',
    ].join(':'),
    honorCipherOrder: true,
    minVersion: 'TLSv1.2',
  }),
};
