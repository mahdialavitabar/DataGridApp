import {number, object, string} from "yup";
import {VerifyStageType} from "@/components/createDataForm/yup";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import FullWidthTextField from "@/components/input";
import Button from '@mui/material/Button';
import {useDynamicMutation} from "@/hooks/useQuery";
import {useContext, useEffect, useState} from "react";
import {QueryContext} from "../../store/fetchContext";

interface IFormDriverTypeInput {
    fullName: string,
    mobile: string,
    age: string
    email: string
}
export const CreateDataForm = ({cancelOnClick}:any) => {
    const schema = object({
        fullName: string().required(VerifyStageType.required),
        mobile: string().required(VerifyStageType.required),
        age: number().required(VerifyStageType.required).typeError(VerifyStageType.number).min(1, VerifyStageType.minZero),
        email: string().required(VerifyStageType.required),
    }).required();
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        getValues,
        watch,
        formState: {errors},
        control,
    } = useForm<IFormDriverTypeInput>({
        resolver: yupResolver(schema),
    });
    const { refetch } = useContext(QueryContext);

    const {mutate} = useDynamicMutation({
        url: 'https://62bfe35ec134cf51cec58701.mockapi.io/api/crud/users',
        onSuccess: () => {
            refetch();  // Call refetch here
        }
    });
    useEffect(() => {
      const refetchTimeout=  setTimeout(() => {
            refetch();

        },3000)
        return ()=> {
            clearTimeout(refetchTimeout);
        }
    }, [refetch,mutate]);
    const onSubmit: SubmitHandler<IFormDriverTypeInput> = (data:any) => {
        mutate(data)

    };
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <Controller
                    control={control}
                    name="fullName"
                    defaultValue={""}
                    render={({field: {onChange, onBlur, value, ref}}:any) => (
                        <FullWidthTextField error={errors?.fullName?.message ||""} className="border border-black" value={value} onBlur={onBlur} onChange={onChange} title="نام و نام خانوادگی" placeholder="نام و نام خانوادگی شما"/>
                    )}
                />
                <Controller
                    control={control}
                    name="mobile"
                    defaultValue={""}
                    render={({field: {onChange, onBlur, value, ref}}:any) => (
                        <FullWidthTextField error={errors?.mobile?.message ||""} className="border border-black" value={value} onBlur={onBlur} onChange={onChange} title="شماره موبایل" placeholder="شماره موبایل شما"/>

                    )}
                />
                <Controller
                    control={control}
                    name="age"
                    defaultValue={""}
                    render={({field: {onChange, onBlur, value, ref}}:any) => (
                        <FullWidthTextField error={errors?.age?.message ||""} className="border border-black" value={value} onBlur={onBlur} onChange={onChange} title="سن" placeholder="سن شما"/>

                    )}
                />
                <Controller
                    control={control}
                    name="email"
                    defaultValue={""}
                    render={({field: {onChange, onBlur, value, ref}}:any) => (
                        <FullWidthTextField error={errors?.email?.message ||""} className="border border-black" value={value} onBlur={onBlur} onChange={onChange} title="ایمیل" placeholder="ایمیل شما"/>

                    )}
                />
              <div className="flex gap-2 justify-end">
                  <Button type="submit" style={{fontFamily:"iransans"}} className="bg-red-500 hover:bg-red-600 text-white w-20" >ثبت</Button>
                  <Button onClick={cancelOnClick} style={{fontFamily:"iransans",border:"solid",borderColor:"red"}} className="bg-white text-red-500 w-20" >بستن</Button>
              </div>
            </form>
            </>
    );
};
