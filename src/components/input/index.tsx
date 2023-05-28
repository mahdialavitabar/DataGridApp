import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
interface IInputProps{
    placeholder:string;
    className:string;
    value:any;
    onChange:any;
    onBlur:any;
    title:string;
    error:string;
}
export default function FullWidthTextField({error,placeholder,className,value,onChange,onBlur,title}:IInputProps) {
    return (
        <>
    <Box
            sx={{
                width: 500,
                maxWidth: '100%',
                direction:"rtl",
                fontFamily:"iransans",
                display:"flex",
                flexDirection:"column",
                gap:1,
            }}

        >
        <p className="text-sm mt-4 mb-2 text-gray-500">{title}</p>
        <TextField  style={{fontFamily:"iransans"}} fullWidth onBlur={onBlur} className={className} placeholder={placeholder} value={value} onChange={onChange}  dir="rtl"  id="fullWidth" />
        </Box>
            {error&&<p className="text-red-600" style={{fontFamily:"iransans"}}>{error}</p>}
        </>
    );
}