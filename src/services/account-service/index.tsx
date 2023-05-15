import _api from "../../apis/axios";

const accountGetRequest = (params: any) => {

    console.log(_api.getRequest(`/api/users/${params}`));
}
const accountDelete = async (params: any) => {
    await _api.deleteRequest(`/api/users/${params}`)
}

export default { accountDelete, accountGetRequest }