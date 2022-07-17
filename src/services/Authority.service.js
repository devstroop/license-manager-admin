import { apiClient } from "./../api/client";
import { API_URLS } from "../api/config";
const { authority } = API_URLS;

export const listAuthoritys = payload => {
  return apiClient({ url: authority.list, data: payload })
    .then(res => res?.data || {})
    .catch(err => {
      throw new Error(err);
    });
};

export const createAuthority = payload => {
  return apiClient({ url: authority.create, data: payload })
    .then(res => res)
    .catch(err => {
      throw new Error(err?.data?.message);
    });
};

export const updateAuthority = payload => {
  return apiClient({
    url: authority.update + payload.id,
    data: payload,
    method: "PUT"
  })
    .then(res => res?.data || {})
    .catch(err => {
      throw new Error(err?.data?.message || "Can't update record.");
    });
};

export const softDeleteAuthority = payload => {
  return apiClient({
    url: authority.softdelete + payload.id,
    data: payload,
    method: "PUT"
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err);
    });
};

export const getAuthorityCount = () => {
  return apiClient({ url: authority.count })
    .then(res => res.data?.totalRecords || 0)
    .catch(err => {
      throw new Error(err);
    });
};

export const getAuthorityAggregate = payload => {
  return apiClient({ url: authority.aggregation, data: payload })
    .then(res => res.data?.data || [])
    .catch(err => {
      throw new Error(err);
    });
};

export const getAuthorityById = payload => {
  return apiClient({
    url: authority.singlerecord + payload,
    data: { query: { isActive: true, isDeleted: false } },
    method: "GET"
  })
    .then(res => res?.data || {})
    .catch(err => {
      throw new Error(err);
    });
};

export const softDeleteMultipleAuthority = payload => {
  return apiClient({
    url: authority.multisoftdelete,
    data: payload,
    method: "PUT"
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err);
    });
};
