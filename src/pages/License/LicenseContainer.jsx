
    import React from 'react';
    import { useLicenseCreate, useLicenseSoftDelete,useLicenseMultipleSoftDelete, useLicenseUpdate } from '../../queries/License.queries';
    import License from './License';
    
    const LicenseContainer = () => {
    
      const {mutate:addRecord} = useLicenseCreate();
      const {mutate:editRecord} = useLicenseUpdate();
      const {mutate:deleteRecord} = useLicenseSoftDelete();
      const {mutate:deleteRecords} = useLicenseMultipleSoftDelete();
    
      const onAddRecord = (record) => {
        return new Promise((resolve,reject) => {
          addRecord(record, {
            onSuccess: async () => resolve('Record created successfully.'),
            onError: async (error) => reject(error?.message || "Can not connect to server"),
          });
        })
      };
    
      const onEditRecord = (record) => {
        return new Promise((resolve, reject) => {
          editRecord(
            record,
            {
              onSuccess: async () => resolve('Record updated successfully.'),
              onError: async (error) => reject(error?.message || "Can not connect to server"),
            }
          );
        });
      };
    
      const onDeleteRecord = (record) => {
        return new Promise((resolve, reject) => {
          deleteRecord(
            record, 
            {
              onSuccess: async () => resolve('Record deleted successfully.'),
              onError: async (error) => reject(error?.message || "Can not connect to server"),
            }
          );
        });
      };

      const onMultiDelete = (record) => {
        return new Promise((resolve, reject) => {
          deleteRecords(
            record, 
            {
              onSuccess: async () => resolve('Records deleted successfully.'),
              onError: async (error) => reject(error?.message || "Can not connect to server"),
            }
          );
        });
      };

      return (
        <License 
          addRecord={onAddRecord}
          deleteRecord={onDeleteRecord}
          deleteRecords={onMultiDelete}
          editRecord={onEditRecord}
        />
      )
    }
    
    export default LicenseContainer;
    