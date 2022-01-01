import axios, { AxiosResponse } from 'axios';

class UserApi {
  private httpRequest = axios.create({
    baseURL: 'https://go.jhbang.link/user',
  });

  login(email: string, password: string): Promise<AxiosResponse> {
    return this.httpRequest.post('/login', { email, password });
  }

  register(email: string, password: string): Promise<AxiosResponse> {
    return this.httpRequest.post('/register', { email, password });
  }
}

export default new UserApi();
