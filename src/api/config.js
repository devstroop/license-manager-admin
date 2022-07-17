export const TOKEN_KEY = "authToken";
export const REFRESH_TOKEN_KEY = "refreshToken"; // Change URL as per your server configuration

let serviceUrl = process.env.REACT_APP_SERVICE_URL;
const BASE_URL = `${serviceUrl}/admin`;
export const UPLOAD_URL = `${BASE_URL}/upload`;
export const API_URLS = {
  auth: {
    url: `${BASE_URL}`,
    login: `${BASE_URL}/auth/login`,
    logout: `${BASE_URL}/auth/logout`,
    resetPassword: `${BASE_URL}/auth/reset-password`,
    forgotPassword: `${BASE_URL}/auth/forgot-password`,
    register: `${BASE_URL}/auth/register`,
    validateOtp: `${BASE_URL}/auth/validate-otp`,
    changePassword: `${BASE_URL}/user/change-password/`,
    updateProfile: `${BASE_URL}/user/update-profile/`,
    login: `${BASE_URL}/auth/login/`
  },
  license: {
    create: `${BASE_URL}/license/create`,
    update: `${BASE_URL}/license/update/`,
    delete: `${BASE_URL}/license/delete/`,
    multidelete: `${BASE_URL}/license/deleteMany/`,
    list: `${BASE_URL}/license/list`,
    count: `${BASE_URL}/license/count`,
    aggregate: `${BASE_URL}/license/aggregate`,
    softdelete: `${BASE_URL}/license/softDelete/`,
    multisoftdelete: `${BASE_URL}/license/softDeleteMany/`,
    singlerecord: `${BASE_URL}/license/`
  },
  product: {
    create: `${BASE_URL}/product/create`,
    update: `${BASE_URL}/product/update/`,
    delete: `${BASE_URL}/product/delete/`,
    multidelete: `${BASE_URL}/product/deleteMany/`,
    list: `${BASE_URL}/product/list`,
    count: `${BASE_URL}/product/count`,
    aggregate: `${BASE_URL}/product/aggregate`,
    softdelete: `${BASE_URL}/product/softDelete/`,
    multisoftdelete: `${BASE_URL}/product/softDeleteMany/`,
    singlerecord: `${BASE_URL}/product/`
  },
  authority: {
    create: `${BASE_URL}/authority/create`,
    update: `${BASE_URL}/authority/update/`,
    delete: `${BASE_URL}/authority/delete/`,
    multidelete: `${BASE_URL}/authority/deleteMany/`,
    list: `${BASE_URL}/authority/list`,
    count: `${BASE_URL}/authority/count`,
    aggregate: `${BASE_URL}/authority/aggregate`,
    softdelete: `${BASE_URL}/authority/softDelete/`,
    multisoftdelete: `${BASE_URL}/authority/softDeleteMany/`,
    singlerecord: `${BASE_URL}/authority/`
  },
  user: {
    create: `${BASE_URL}/user/create`,
    update: `${BASE_URL}/user/update/`,
    delete: `${BASE_URL}/user/delete/`,
    multidelete: `${BASE_URL}/user/deleteMany/`,
    list: `${BASE_URL}/user/list`,
    count: `${BASE_URL}/user/count`,
    aggregate: `${BASE_URL}/user/aggregate`,
    softdelete: `${BASE_URL}/user/softDelete/`,
    multisoftdelete: `${BASE_URL}/user/softDeleteMany/`,
    singlerecord: `${BASE_URL}/user/`
  },
  role: {
    list: `${BASE_URL}/role/list`
  },
  userRole: {
    create: `${BASE_URL}/userRole/create`,
    list: `${BASE_URL}/userRole/list`,
    softdelete: `${BASE_URL}/userRole/softDelete/`
  }
};
