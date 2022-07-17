import { useQuery, useQueryClient, useMutation } from "react-query";
import {
  listProducts,
  createProduct,
  updateProduct,
  softDeleteProduct,
  softDeleteMultipleProduct,
  getProductAggregate,
  getProductById,
  getProductCount
} from "../services/Product.service";

function useProductList(args, id = "") {
  const { page, limit: paginate } = args.options;
  let $and = [],
    sort = {};

  if (args.query?.$and) {
    $and = { ...args.query?.$and };
  }
  if (args.options?.sort) {
    sort = { ...args.options?.sort };
  }
  return useQuery([`Product${id}`, { page, paginate, $and, sort }], () =>
    listProducts(args)
  );
}

function useProductCreate() {
  const queryClient = useQueryClient();
  return useMutation(record => createProduct(record), {
    onMutate: async newRecord => {
      await queryClient.cancelQueries(["Product"]);

      const previousValue = queryClient.getQueryData(["Product"]) || [];

      queryClient.setQueryData(["Product"], () => [
        ...previousValue,
        newRecord
      ]);
      return previousValue;
    },
    // On failure, roll back to the previous value
    onError: (err, variables, previousValue) =>
      queryClient.setQueryData(["Product"], previousValue),
    // After success or failure, refetch the Products query
    onSettled: () => {
      queryClient.invalidateQueries(["Product"]);
    }
  });
}

function useProductUpdate() {
  const queryClient = useQueryClient();
  return useMutation(record => updateProduct(record), {
    onMutate: async updatedData => {
      await queryClient.cancelQueries(["Product"]);

      const previousValue = queryClient.getQueryData(["Product"]);

      queryClient.setQueryData(["Product"], old => {
        return old?.map(oldData => {
          if (oldData.id === updatedData.id) return updatedData;
          else return oldData;
        });
      });
      return previousValue;
    },

    // On failure, roll back to the previous value
    onError: (err, variables, previousValue) =>
      queryClient.setQueryData(["Product"], previousValue),
    // After success or failure, refetch the Products query
    onSettled: () => {
      queryClient.invalidateQueries(["Product"]);
    }
  });
}

function useProductSoftDelete() {
  const queryClient = useQueryClient();
  return useMutation(record => softDeleteProduct(record), {
    onMutate: async deletedRecord => {
      await queryClient.cancelQueries(["Product"]);

      const previousValue = queryClient.getQueryData(["Product"]) || [];
      queryClient.setQueryData(["Product"], oldData =>
        previousValue.filter(record => record.id !== deletedRecord.id)
      );
      return previousValue;
    },

    // On failure, roll back to the previous value
    onError: (err, variables, previousValue) =>
      queryClient.setQueryData(["Product"], previousValue),
    // After success or failure, refetch the Products query
    onSettled: () => {
      queryClient.invalidateQueries(["Product"]);
    }
  });
}

function useProductMultipleSoftDelete() {
  const queryClient = useQueryClient();
  return useMutation(record => softDeleteMultipleProduct(record), {
    onMutate: async deletedRecord => {
      await queryClient.cancelQueries(["Product"]);

      const previousValue = queryClient.getQueryData(["Product"]) || [];
      queryClient.setQueryData(["Product"], oldData =>
        previousValue.filter(record => !deletedRecord.ids.includes(record.id))
      );
      return previousValue;
    },

    // On failure, roll back to the previous value
    onError: (err, variables, previousValue) =>
      queryClient.setQueryData(["Product"], previousValue),
    // After success or failure, refetch the Products query
    onSettled: () => {
      queryClient.invalidateQueries(["Product"]);
    }
  });
}

function useProductCount(id = "") {
  return useQuery([`Product${id}Count`], () => {
    return getProductCount();
  });
}

function useProductAggregate(record) {
  return useQuery("Product", () => {
    return getProductAggregate(record);
  });
}

function useProductGetById(id) {
  return useQuery(["Product", id], () => {
    return getProductById(id);
  });
}

export {
  useProductList,
  useProductCreate,
  useProductUpdate,
  useProductMultipleSoftDelete,
  useProductCount,
  useProductSoftDelete,
  useProductAggregate,
  useProductGetById
};
