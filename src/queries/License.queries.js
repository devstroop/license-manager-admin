import { useQuery, useQueryClient, useMutation } from "react-query";
import {
  listLicenses,
  createLicense,
  updateLicense,
  softDeleteLicense,
  softDeleteMultipleLicense,
  getLicenseAggregate,
  getLicenseById,
  getLicenseCount
} from "../services/License.service";

function useLicenseList(args, id = "") {
  const { page, limit: paginate } = args.options;
  let $and = [],
    sort = {};

  if (args.query?.$and) {
    $and = { ...args.query?.$and };
  }
  if (args.options?.sort) {
    sort = { ...args.options?.sort };
  }
  return useQuery([`License${id}`, { page, paginate, $and, sort }], () =>
    listLicenses(args)
  );
}

function useLicenseCreate() {
  const queryClient = useQueryClient();
  return useMutation(record => createLicense(record), {
    onMutate: async newRecord => {
      await queryClient.cancelQueries(["License"]);

      const previousValue = queryClient.getQueryData(["License"]) || [];

      queryClient.setQueryData(["License"], () => [
        ...previousValue,
        newRecord
      ]);
      return previousValue;
    },
    // On failure, roll back to the previous value
    onError: (err, variables, previousValue) =>
      queryClient.setQueryData(["License"], previousValue),
    // After success or failure, refetch the Licenses query
    onSettled: () => {
      queryClient.invalidateQueries(["License"]);
    }
  });
}

function useLicenseUpdate() {
  const queryClient = useQueryClient();
  return useMutation(record => updateLicense(record), {
    onMutate: async updatedData => {
      await queryClient.cancelQueries(["License"]);

      const previousValue = queryClient.getQueryData(["License"]);

      queryClient.setQueryData(["License"], old => {
        return old?.map(oldData => {
          if (oldData.id === updatedData.id) return updatedData;
          else return oldData;
        });
      });
      return previousValue;
    },

    // On failure, roll back to the previous value
    onError: (err, variables, previousValue) =>
      queryClient.setQueryData(["License"], previousValue),
    // After success or failure, refetch the Licenses query
    onSettled: () => {
      queryClient.invalidateQueries(["License"]);
    }
  });
}

function useLicenseSoftDelete() {
  const queryClient = useQueryClient();
  return useMutation(record => softDeleteLicense(record), {
    onMutate: async deletedRecord => {
      await queryClient.cancelQueries(["License"]);

      const previousValue = queryClient.getQueryData(["License"]) || [];
      queryClient.setQueryData(["License"], oldData =>
        previousValue.filter(record => record.id !== deletedRecord.id)
      );
      return previousValue;
    },

    // On failure, roll back to the previous value
    onError: (err, variables, previousValue) =>
      queryClient.setQueryData(["License"], previousValue),
    // After success or failure, refetch the Licenses query
    onSettled: () => {
      queryClient.invalidateQueries(["License"]);
    }
  });
}

function useLicenseMultipleSoftDelete() {
  const queryClient = useQueryClient();
  return useMutation(record => softDeleteMultipleLicense(record), {
    onMutate: async deletedRecord => {
      await queryClient.cancelQueries(["License"]);

      const previousValue = queryClient.getQueryData(["License"]) || [];
      queryClient.setQueryData(["License"], oldData =>
        previousValue.filter(record => !deletedRecord.ids.includes(record.id))
      );
      return previousValue;
    },

    // On failure, roll back to the previous value
    onError: (err, variables, previousValue) =>
      queryClient.setQueryData(["License"], previousValue),
    // After success or failure, refetch the Licenses query
    onSettled: () => {
      queryClient.invalidateQueries(["License"]);
    }
  });
}

function useLicenseCount(id = "") {
  return useQuery([`License${id}Count`], () => {
    return getLicenseCount();
  });
}

function useLicenseAggregate(record) {
  return useQuery("License", () => {
    return getLicenseAggregate(record);
  });
}

function useLicenseGetById(id) {
  return useQuery(["License", id], () => {
    return getLicenseById(id);
  });
}

export {
  useLicenseList,
  useLicenseCreate,
  useLicenseUpdate,
  useLicenseMultipleSoftDelete,
  useLicenseCount,
  useLicenseSoftDelete,
  useLicenseAggregate,
  useLicenseGetById
};
