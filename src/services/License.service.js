import { apiClient } from "./../api/client";
import { API_URLS } from "../api/config";
const { license } = API_URLS;

export const listLicenses = payload => {
  return apiClient({ url: license.list, data: payload })
    .then(res => res?.data || {})
    .catch(err => {
      throw new Error(err);
    });
};

export const createLicense = payload => {
  return apiClient({ url: license.create, data: payload })
    .then(res => res)
    .catch(err => {
      throw new Error(err?.data?.message);
    });
};

export const updateLicense = payload => {
  return apiClient({
    url: license.update + payload.id,
    data: payload,
    method: "PUT"
  })
    .then(res => res?.data || {})
    .catch(err => {
      throw new Error(err?.data?.message || "Can't update record.");
    });
};

export const softDeleteLicense = payload => {
  return apiClient({
    url: license.softdelete + payload.id,
    data: payload,
    method: "PUT"
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err);
    });
};

export const getLicenseCount = () => {
  return apiClient({ url: license.count })
    .then(res => res.data?.totalRecords || 0)
    .catch(err => {
      throw new Error(err);
    });
};

export const getLicenseAggregate = payload => {
  return apiClient({ url: license.aggregation, data: payload })
    .then(res => res.data?.data || [])
    .catch(err => {
      throw new Error(err);
    });
};

export const getLicenseById = payload => {
  return apiClient({
    url: license.singlerecord + payload,
    data: { query: { isActive: true, isDeleted: false } },
    method: "GET"
  })
    .then(res => res?.data || {})
    .catch(err => {
      throw new Error(err);
    });
};

export const softDeleteMultipleLicense = payload => {
  return apiClient({
    url: license.multisoftdelete,
    data: payload,
    method: "PUT"
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err);
    });
};
