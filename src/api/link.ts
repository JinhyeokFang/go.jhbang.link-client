import axios, { AxiosResponse } from 'axios';

class LinkApi {
  private httpRequest = axios.create({
    baseURL: 'https://go.jhbang.link/link',
  });

  setAPIToken(token: string) {
    this.httpRequest.defaults.headers.common.Authorization = token;
  }

  getAllLink(): Promise<AxiosResponse> {
    return this.httpRequest.get('/all');
  }

  deleteItem(item: string): Promise<AxiosResponse> {
    return this.httpRequest.delete(`/${item}`);
  }

  addItem(originalLink: string, shortLink: string): Promise<AxiosResponse> {
    return this.httpRequest.post('/', {
      originalLink,
      shortLink,
    });
  }
}

export default new LinkApi();
