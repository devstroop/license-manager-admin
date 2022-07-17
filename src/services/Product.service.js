import { apiClient } from "./../api/client";
import { API_URLS } from "../api/config";
const { product } = API_URLS;

export const listProducts = payload => {
  return apiClient({ url: product.list, data: payload })
    .then(res => res?.data || {})
    .catch(err => {
      throw new Error(err);
    });
};

export const createProduct = payload => {
  return apiClient({ url: product.create, data: payload })
    .then(res => res)
    .catch(err => {
      throw new Error(err?.data?.message);
    });
};

export const updateProduct = payload => {
  return apiClient({
    url: product.update + payload.id,
    data: payload,
    method: "PUT"
  })
    .then(res => res?.data || {})
    .catch(err => {
      throw new Error(err?.data?.message || "Can't update record.");
    });
};

export const softDeleteProduct = payload => {
  return apiClient({
    url: product.softdelete + payload.id,
    data: payload,
    method: "PUT"
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err);
    });
};

export const getProductCount = () => {
  return apiClient({ url: product.count })
    .then(res => res.data?.totalRecords || 0)
    .catch(err => {
      throw new Error(err);
    });
};

export const getProductAggregate = payload => {
  return apiClient({ url: product.aggregation, data: payload })
    .then(res => res.data?.data || [])
    .catch(err => {
      throw new Error(err);
    });
};

export const getProductById = payload => {
  return apiClient({
    url: product.singlerecord + payload,
    data: { query: { isActive: true, isDeleted: false } },
    method: "GET"
  })
    .then(res => res?.data || {})
    .catch(err => {
      throw new Error(err);
    });
};

export const softDeleteMultipleProduct = payload => {
  return apiClient({
    url: product.multisoftdelete,
    data: payload,
    method: "PUT"
  })
    .then(res => res)
    .catch(err => {
      throw new Error(err);
    });
};
