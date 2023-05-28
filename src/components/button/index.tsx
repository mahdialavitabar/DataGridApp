import * as React from 'react';
import Button from '@mui/material/Button';

import AddIcon from '@mui/icons-material/Add';
interface IButtonType {
    className?:string;
    label?:string
    onClick?: ()=> void
}
export default function IconLabelButtons ({onClick,className,label}:IButtonType) {
    return (

            <Button onClick={onClick} variant="contained"  className={className} dir="ltr" endIcon={<AddIcon />}>
                {label}
            </Button>

    );
}