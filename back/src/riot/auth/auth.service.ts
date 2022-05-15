import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { AxiosRequestConfig } from 'axios';

import { riotConstants } from 'utils/constants';

type Multifactor = { type: 'multifactor' };

type MultifactorResponse = Multifactor & {
  multifactor: {
    email: string;
    method: 'email';
    methods: ['email'];
    multiFactorCodeLength: number;
    mfaVersion: string;
  };
  country: string;
  securityProfile: string;
};

type NormalResponse = { response: { parameters: { uri: string } } };

export type AuthResponse = MultifactorResponse | NormalResponse;

@Injectable()
export class RiotAuthService {
  constructor(private readonly httpService: HttpService) {
    this.httpService.axiosRef.interceptors.response.use(
      (response) => response,
      (error) => {
        console.dir(error);
        throw error;
      },
    );
  }

  private request = <T = void>(config: AxiosRequestConfig) => lastValueFrom(this.httpService.request<T>(config));

  getCookies() {
    const { url, ...data } = riotConstants.accessToken;

    return this.request({ method: 'POST', url, data }).then((res) => res.headers['set-cookie']);
  }

  login(username: string, password: string, cookie: string): Promise<AuthResponse> {
    const {
      accessToken: { url },
    } = riotConstants;

    return this.request<AuthResponse>({
      method: 'PUT',
      url,
      data: { type: 'auth', username, password },
      headers: { cookie },
    }).then((res) => res.data);
  }

  validateMFACode(code: string, cookie: string) {
    const { url } = riotConstants.accessToken;

    return this.request<NormalResponse>({
      method: 'PUT',
      url,
      headers: { Cookie: cookie },
      data: { type: 'multifactor', code, rememberDevice: true },
      withCredentials: true,
    }).then((res) => res.data);
  }
}
