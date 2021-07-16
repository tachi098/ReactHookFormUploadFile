import { Button, FormControl, FormHelperText, Input, InputLabel } from "@material-ui/core"
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { updateEmployees } from "../../../store/actions/EmoloyeeAction";

const EmployeeEdit = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();
    const [employee,] = useState(location.state.employee);
    const { formState: { errors }, handleSubmit, control } = useForm({
        defaultValues: employee
    });


    const onSubmit = (data) => {
        data.birthday = new Date(data.birthday.replace(/-/g,"/"));
        dispatch(updateEmployees(data));
        history.push("/");
    };

    return (
        <>
            <h1>Sửa thông tin nhân viên</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {/* <input  {...register("id")} defaultValue={employee.id} hidden/> */}
                    <FormControl style={{ margin: 12 }} fullWidth error={errors.name?.message && true}>
                        <InputLabel htmlFor="component-simple">Tên nhân viên</InputLabel>
                        <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            rules={{ required: "Tên không được để trống", minLength: { value: 6, message: "Tên phải hơn 10 ký tự" } }}
                            render={({ field }) => <Input {...field} />}
                        />
                        {errors.name?.message &&
                            <FormHelperText id="component-error-text">{errors.name?.message}</FormHelperText>
                        }
                    </FormControl>
                    <FormControl style={{ margin: 12 }} fullWidth error={errors.phone?.message && true}>
                        <InputLabel htmlFor="component-simple">Số điện thoại</InputLabel>
                        <Controller
                            name="phone"
                            control={control}
                            defaultValue=""
                            rules={{ required: "Số điện thoại không được để trống", pattern: { value: /[0]{1}[1-9]{1}[0-9]{8}/, message: "Số điện thoại không hợp lệ" } }}
                            render={({ field }) => <Input {...field} />}
                        />
                        {errors.phone?.message &&
                            <FormHelperText id="component-error-text">{errors.phone?.message}</FormHelperText>
                        }
                    </FormControl>
                    <FormControl style={{ margin: 12 }} fullWidth error={errors.email?.message && true}>
                        <InputLabel htmlFor="component-simple">Email</InputLabel>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            rules={{ required: "Email không được để trống", pattern: { value: /\S+@\S+\.\S+/, message: "Email không hợp lệ" } }}
                            render={({ field }) => <Input {...field} />}
                        />
                        {errors.email?.message &&
                            <FormHelperText id="component-error-text">{errors.email?.message}</FormHelperText>
                        }
                    </FormControl>
                    <FormControl style={{ margin: 12 }} fullWidth>
                        <Controller
                            name="birthday"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <Input type="date" {...field} />}
                        />
                    </FormControl>
                    <Button type="submit" style={{ margin: 12 }} variant="contained" color="primary">
                        Cập nhật
                    </Button>
                </div>
            </form>
        </>
    )
}

export default EmployeeEdit