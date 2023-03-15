import { conectionServerJson } from '../helpers/request.helper';

export default class Resource {
  constructor(uri) {
    this.uri = uri;
    this.connectionServer = conectionServerJson();
  }

  async getList(filterQuery) {
    return await this.connectionServer
      .get(`/${this.uri}`, {
        params: filterQuery,
      })
      .then((resp) => {
        return resp;
      })
      .catch((err) => err);
  }

  async getById(id, data) {
    return await this.connectionServer
      .get(`/${this.uri}/${id}`, { params: data })
      .then((resp) => {
        return resp;
      })
      .catch((err) => err);
  }

  async create(newData) {
    return await this.connectionServer
      .post(`/${this.uri}`, newData)
      .then((resp) => {
        return resp;
      })
      .catch((err) => err);
  }

  async update(id, newData) {
    return await this.connectionServer
      .patch(`/${this.uri}/${id}`, newData)
      .then((resp) => {
        return resp;
      })
      .catch((err) => err);
  }

  async delete(id) {
    return await this.connectionServer
      .delete(`/${this.uri}/${id}`)
      .then((resp) => {
        return resp;
      })
      .catch((err) => err);
  }
}

export const useResource = (uri) => {
  return new Resource(uri);
};
