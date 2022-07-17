
    import React from 'react';
    import { useProductCreate, useProductSoftDelete,useProductMultipleSoftDelete, useProductUpdate } from '../../queries/Product.queries';
    import Product from './Product';
    
    const ProductContainer = () => {
    
      const {mutate:addRecord} = useProductCreate();
      const {mutate:editRecord} = useProductUpdate();
      const {mutate:deleteRecord} = useProductSoftDelete();
      const {mutate:deleteRecords} = useProductMultipleSoftDelete();
    
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
        <Product 
          addRecord={onAddRecord}
          deleteRecord={onDeleteRecord}
          deleteRecords={onMultiDelete}
          editRecord={onEditRecord}
        />
      )
    }
    
    export default ProductContainer;
    