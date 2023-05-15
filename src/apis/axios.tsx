import axios from "axios";

const instance = axios.create({
  baseURL: 'https://l3mshop.onrender.com',
  timeout: 1000,
  headers: {
    Accept: 'application/json',
    "Content-Type": 'application/json'
  },
  withCredentials: true
});

const postRequest = (url: string, params?: any) => {
  instance
    .post(url, params)
    .then(res => {
      console.log(res);
      return res
    })
    .catch(function (err) {
      console.log(err);
    })
}

const getRequest = (url: string) => {
  instance
    .get(url)
    .then(res => {
      console.log(res);
      return res
    })
    .catch(function (err) {
      console.log(err.response);
    })
}

const deleteRequest = (url: string): any => {
  axios
    .delete(url)
    .then(res => {
      return res;
    })
    .catch(function (err) {
      console.log("loi" + err);
      return err
    })
}

export default { postRequest, getRequest, deleteRequest }