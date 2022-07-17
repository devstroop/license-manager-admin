import { useQuery, useQueryClient, useMutation } from "react-query";
import {
  listAuthoritys,
  createAuthority,
  updateAuthority,
  softDeleteAuthority,
  softDeleteMultipleAuthority,
  getAuthorityAggregate,
  getAuthorityById,
  getAuthorityCount
} from "../services/Authority.service";

function useAuthorityList(args, id = "") {
  const { page, limit: paginate } = args.options;
  let $and = [],
    sort = {};

  if (args.query?.$and) {
    $and = { ...args.query?.$and };
  }
  if (args.options?.sort) {
    sort = { ...args.options?.sort };
  }
  return useQuery([`Authority${id}`, { page, paginate, $and, sort }], () =>
    listAuthoritys(args)
  );
}

function useAuthorityCreate() {
  const queryClient = useQueryClient();
  return useMutation(record => createAuthority(record), {
    onMutate: async newRecord => {
      await queryClient.cancelQueries(["Authority"]);

      const previousValue = queryClient.getQueryData(["Authority"]) || [];

      queryClient.setQueryData(["Authority"], () => [
        ...previousValue,
        newRecord
      ]);
      return previousValue;
    },
    // On failure, roll back to the previous value
    onError: (err, variables, previousValue) =>
      queryClient.setQueryData(["Authority"], previousValue),
    // After success or failure, refetch the Authoritys query
    onSettled: () => {
      queryClient.invalidateQueries(["Authority"]);
    }
  });
}

function useAuthorityUpdate() {
  const queryClient = useQueryClient();
  return useMutation(record => updateAuthority(record), {
    onMutate: async updatedData => {
      await queryClient.cancelQueries(["Authority"]);

      const previousValue = queryClient.getQueryData(["Authority"]);

      queryClient.setQueryData(["Authority"], old => {
        return old?.map(oldData => {
          if (oldData.id === updatedData.id) return updatedData;
          else return oldData;
        });
      });
      return previousValue;
    },

    // On failure, roll back to the previous value
    onError: (err, variables, previousValue) =>
      queryClient.setQueryData(["Authority"], previousValue),
    // After success or failure, refetch the Authoritys query
    onSettled: () => {
      queryClient.invalidateQueries(["Authority"]);
    }
  });
}

function useAuthoritySoftDelete() {
  const queryClient = useQueryClient();
  return useMutation(record => softDeleteAuthority(record), {
    onMutate: async deletedRecord => {
      await queryClient.cancelQueries(["Authority"]);

      const previousValue = queryClient.getQueryData(["Authority"]) || [];
      queryClient.setQueryData(["Authority"], oldData =>
        previousValue.filter(record => record.id !== deletedRecord.id)
      );
      return previousValue;
    },

    // On failure, roll back to the previous value
    onError: (err, variables, previousValue) =>
      queryClient.setQueryData(["Authority"], previousValue),
    // After success or failure, refetch the Authoritys query
    onSettled: () => {
      queryClient.invalidateQueries(["Authority"]);
    }
  });
}

function useAuthorityMultipleSoftDelete() {
  const queryClient = useQueryClient();
  return useMutation(record => softDeleteMultipleAuthority(record), {
    onMutate: async deletedRecord => {
      await queryClient.cancelQueries(["Authority"]);

      const previousValue = queryClient.getQueryData(["Authority"]) || [];
      queryClient.setQueryData(["Authority"], oldData =>
        previousValue.filter(record => !deletedRecord.ids.includes(record.id))
      );
      return previousValue;
    },

    // On failure, roll back to the previous value
    onError: (err, variables, previousValue) =>
      queryClient.setQueryData(["Authority"], previousValue),
    // After success or failure, refetch the Authoritys query
    onSettled: () => {
      queryClient.invalidateQueries(["Authority"]);
    }
  });
}

function useAuthorityCount(id = "") {
  return useQuery([`Authority${id}Count`], () => {
    return getAuthorityCount();
  });
}

function useAuthorityAggregate(record) {
  return useQuery("Authority", () => {
    return getAuthorityAggregate(record);
  });
}

function useAuthorityGetById(id) {
  return useQuery(["Authority", id], () => {
    return getAuthorityById(id);
  });
}

export {
  useAuthorityList,
  useAuthorityCreate,
  useAuthorityUpdate,
  useAuthorityMultipleSoftDelete,
  useAuthorityCount,
  useAuthoritySoftDelete,
  useAuthorityAggregate,
  useAuthorityGetById
};
