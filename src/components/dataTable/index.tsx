// @ts-ignore
//prettier-ignore
'use client';
import * as React from 'react';
import {DataGrid, faIR, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import styles from "../../app/css/table.module.css"
import {useDynamicQuery,useDynamicMutation} from "../../hooks/useQuery"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useContext, useEffect, useState} from "react";
import {QueryContext} from "../../store/fetchContext"
import {atom, createStore, Provider, useAtom} from 'jotai'

export const rowAtom = atom({});
// valueGetter: (params: GridValueGetterParams) =>
//     `${params.row.firstName || ''} ${params.row.lastName || ''}`
export default function DataTable() {
    const [rowData, setRowData] = useAtom(rowAtom);
    const [tableRows, setTableRows] = useState<any>([]);
    const [rowId, setRowId] = useState<any>();

    const { data, error, isLoading } = useDynamicQuery({
        url: 'https://62bfe35ec134cf51cec58701.mockapi.io/api/crud/users',
    });
    const rowDataAtom = atom(null);
    const { refetch } = useContext(QueryContext);
    const {mutate} = useDynamicMutation({
        url: `https://62bfe35ec134cf51cec58701.mockapi.io/api/crud/users/${rowId}`,method:"delete",
        onSuccess: () => {
            refetch();
        }
    });
    useEffect(() => {
        const refetchTimeout=  setTimeout(() => {
            refetch();

        },3000)
        return ()=> {
            clearTimeout(refetchTimeout);
        }
    }, [refetch ,mutate]);

    useEffect(() => {
       const response = data?.data
setTableRows(response)
    }, [data,tableRows]);
    const { handleModalOpen } = useContext(QueryContext);
const handleEditClick = (params:any) => {
    handleModalOpen()
    setRowData(params.row)

}

const handleDeleteRow =(row:any)=>{
setRowId(row.id)
if(rowId){
    mutate(rowId)
}
}
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ردیف', width: 70, align:"right",headerAlign:"right" },
        { field: 'fullName', headerName: 'نام و نام خانوادگی', width: 200, align:"right",headerAlign:"right" },
        { field: 'mobile', headerName: 'شماره موبایل', width: 130, align:"right",headerAlign:"right" },
        {
            field: 'age',
            headerName: 'سن',
            width: 90, align:"right",headerAlign:"right"

        },
        {
            field: 'email',
            headerName: 'ایمیل',
            width: 300,
            align:"right",headerAlign:"right",
        },
        {
            field: 'actions',
            headerName: 'عملیات',
            width: 100,
            renderCell: (params) => {
                return (
                    <div className="flex gap-6">
                        <div onClick={() => handleEditClick(params)}>                    <EditIcon className="cursor-pointer" />
                        </div>
                        <div onClick={()=>handleDeleteRow(params.row)}>                    <DeleteIcon className="text-red-500 cursor-pointer"/>
                        </div>
                    </div>
                );
            }, align:"right",headerAlign:"right"
        }
    ];
    return (
        <>
            <Provider >
        <div style={{ height: 400, width: '80%' ,direction: 'rtl',marginLeft:"auto",marginRight:"auto"}}  className={styles.table}>
            <DataGrid
                loading={isLoading}
                sx={{fontFamily:"iransans"}}
                localeText={faIR    .components.MuiDataGrid.defaultProps.localeText}
                rows={tableRows===undefined?[]:tableRows}
                columns={columns}

            />
        </div>
            </Provider>
        </>
    );
}