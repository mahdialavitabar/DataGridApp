import {useDynamicQuery} from "@/hooks/useQuery";
import * as React from "react";
import IconLabelButtons from "@/components/button";
import styles from "@/app/css/button.module.css";
import DataTable from "@/components/dataTable";
import BasicModal from "@/components/modal";
import {CreateDataForm} from "@/components/createDataForm";
import {QueryContext} from "../../store/fetchContext"
import {EditDataForm} from "@/components/editDataForm";
import {useState} from "react";
import {atom} from "jotai";
export const Main = () => {  const { data,refetch, error, isLoading } = useDynamicQuery({
    url: 'https://62bfe35ec134cf51cec58701.mockapi.io/api/crud/users',
});
    const [openCreate, setCreateOpen] = React.useState(false);
    const [openEdit, setEditOpen] = React.useState(false);
    const [rowData, setRowData] = useState({});
    const handleCreateOpen = () => setCreateOpen(true);
    const handleEditOpen = () => setEditOpen(true);

    const handleCreateClose = () => setCreateOpen(false);
    const handleEditClose = () => setEditOpen(false);
    console.log(rowData)
    return (
        <>
        <QueryContext.Provider value={{ refetch,handleModalOpen:handleEditOpen}}>
            <div className="flex flex-col gap-4">
                <div className="flex  justify-end ml-[10%] ">
                    <IconLabelButtons onClick={handleCreateOpen} className={styles.button} label="ایجاد داده جدید" />
                </div>
                <div>
                    <DataTable  />
                </div>
                <BasicModal title="لطفا فرم زیر را پر کنید" open={openCreate} handleClose={handleCreateClose} handleOpen={handleCreateOpen}><CreateDataForm cancelOnClick={handleCreateClose}/></BasicModal>
                <BasicModal title="ویرایش" open={openEdit} handleClose={handleEditClose} handleOpen={handleEditOpen}><EditDataForm cancelOnClick={handleEditClose}/></BasicModal>

            </div>
   </QueryContext.Provider>/
        </>

);
};
