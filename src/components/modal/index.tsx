import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
     fontfamily:"iransans"
};
interface IBasicModal {
    open?:boolean;
    handleClose?:()=> void
    handleOpen?:()=>void
    title?:string;
    children?:any
}
export default function BasicModal({open,handleClose,title,children}:IBasicModal) {


    return (
        <div>
            <Modal
                open={open||false}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <div className="flex justify-between" style={{fontFamily:"iransans"}}>
                        {title}
                        <p className="text-lg cursor-pointer" onClick={handleClose}>X</p>
                    </div>
                    {children}
                </Box>
            </Modal>
        </div>
    );
}