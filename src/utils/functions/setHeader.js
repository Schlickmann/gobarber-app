import api from '~/services/api';

export default function setHeader(header, value) {
  api.defaults.headers[header] = value;
}
