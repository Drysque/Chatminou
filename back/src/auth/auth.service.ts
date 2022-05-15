import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { strict as assert } from 'assert';

import { AuthResponse, RiotAuthService } from 'riot/auth/auth.service';

@Injectable()
export class AuthService {
  constructor(private readonly riotAuthInstance: RiotAuthService) {}

  private async getCookie(): Promise<string> {
    const cookies = await this.riotAuthInstance.getCookies();
    console.log('cookies', cookies);

    if (!cookies) throw new InternalServerErrorException('No cookies returned');

    const cookie = cookies.find((elem) => /^asid/.test(elem));
    console.log('cookie', cookie);

    if (!cookie) throw new InternalServerErrorException('No id cookie returned');

    return cookie;
  }

  // private parseTokenFromUri(uri: string) {
  //   // private parseTokensFromUri(uri: string) {
  //   const url = new URL(uri);
  //   const params = new URLSearchParams(url.hash.substring(1));
  //   return params.get('access_token');
  //   // return {
  //   //   access_token: params.get('access_token'),
  //   //   id_token: params.get('id_token'),
  //   // };
  // }

  private async login(username: string, password: string, cookie: string): Promise<AuthResponse> {
    const authResponse = await this.riotAuthInstance.login(username, password, cookie);
    console.log('accessTokensURI', authResponse);

    if ('type' in authResponse && authResponse.type === 'multifactor') {
      assert.equal(authResponse.multifactor.mfaVersion, 'v2');
      assert.equal(authResponse.multifactor.method, 'email');
    }

    return authResponse;
  }

  // private async getAccessToken(authResponse: any): Promise<string> {
  //   const accessToken = this.parseTokenFromUri(authResponse.response.parameters.uri);
  //   console.log('accessTokens', accessToken);

  //   if (!accessToken) throw new InternalServerErrorException('No access token returned');

  //   return accessToken;
  // }

  async validateMFACode(code: string, cookie: string): Promise<any> {
    const authResponse = await this.riotAuthInstance.validateMFACode(code, cookie);
    console.log('authResponse', authResponse);

    return authResponse;
  }

  async authorize(username: string, password: string): Promise<any> {
    const cookie = await this.getCookie();
    const res = await this.login(username, password, cookie);

    return { res, cookie };
    // const {
    //   entitlements: { url },
    // } = riotConstants;

    // const entitlementsToken = await lastValueFrom(
    //   this.riotInstance.post(url, {}, { headers: { Authorization: `Bearer ${accessToken}` } }).pipe(
    //     map((res) => {
    //       console.log('res.data', res.data);
    //       return res.data.entitlements_token;
    //     }),
    //   ),
    // );

    // console.log('entitlementsToken', entitlementsToken);

    // const userId = JSON.parse(Buffer.from(accessToken.split('.')[1], 'base64').toString()).sub;
    // console.log('userId', userId);

    // return {
    //   username,
    //   userId,
    //   entitlementsToken,
    //   accessToken,
    // };
  }
}
