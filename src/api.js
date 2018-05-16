import axios from 'axios';
import * as PATH from './constants/path';

export default {
  auth: {
    getPrivateUser: () => axios.get(`${PATH.PATH_API_V1}private/user/account.json`).then(res => res.data.account),
    getPrivateUsername: () => axios.get(`${PATH.PATH_API_V1}private/user/username.json `).then(res => res.data.username),
    getAuthorItems:  params =>
      axios.get(
        `${PATH.PATH_API_DISCOVERY_V1}search/search/item`,
        {
          'params': {
            username: params
          }
        }
      )
  },
  statement: {
    getUserStatement: params =>
      axios.get(
        `${PATH.PATH_API_V3}user/statement`,
        {
          'params': {
            page: 1,
            from_date: params.startDate,
            to_date: params.endDate,
            site: params.site
          }
        }
      ).then(res => res.data),
    getUserStatementByPage: params =>
      axios.get(
        `${PATH.PATH_API_V3}user/statement`,
        {
          'params': {
            page: params.page,
            from_date: params.startDate,
            to_date: params.endDate,
            site: params.site
          }
        }
      ).then(res => res.data)
  },
  purchases: {
    getSale: params =>
      axios.get(
        `${PATH.PATH_API_V3}author/sale`,
        {
          'params': {
            code: params
          }
        }
      ).then(res => res.data)
  }
};
