import { Button, FormControl, FormHelperText, Input, InputLabel } from "@material-ui/core"
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addEmployees } from "../../../store/actions/EmoloyeeAction";

const EmployeeAdd = () => {
    const dispatch = useDispatch();
    const { register, formState: { errors }, handleSubmit, control } = useForm();
    const history = useHistory();

    const onSubmit = (data) => {
        setTimeout(() => {
            dispatch(addEmployees(data)).then(res => history.push("/"));
        }, 2000);
    };

    return (
        <>
            <h1>Thêm nhân viên</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    <FormControl style={{ margin: 12 }} fullWidth error={errors.name?.message && true}>
                        <InputLabel htmlFor="component-simple">Tên nhân viên</InputLabel>
                        <Input
                            id="component-simple"
                            placeholder={"Nhập tên"}
                            {...register("name", {
                                required: "Tên không được để trống",
                                minLength: { value: 6, message: "Tên phải hơn 6 ký tự" }
                            })}
                        />
                        {errors.name?.message &&
                            <FormHelperText id="component-error-text">{errors.name?.message}</FormHelperText>
                        }
                    </FormControl>
                    <FormControl style={{ margin: 12 }} fullWidth error={errors.multipartFile?.message && true}>
                        <InputLabel htmlFor="component-simple">Ảnh đại diện</InputLabel>

                        <Controller
                            name="multipartFile"
                            control={control}
                            rules={{
                                required: "Ảnh không được để trống",
                                validate: value => {
                                    if (value[0].size >= 1048576) {
                                        return "kích thước hình ảnh quả lớn";
                                    }
                                }
                            }}
                            render={({ field: { onChange } }) =>
                                <Input
                                    type="file"
                                    id="component-simple"
                                    onChange={(event) => onChange(event.currentTarget.files)}
                                />
                            }
                        />
                        {errors.multipartFile?.message &&
                            <FormHelperText id="component-error-text">{errors.multipartFile?.message}</FormHelperText>
                        }
                    </FormControl>
                    <Button type="submit" style={{ margin: 12 }} variant="contained" color="primary">
                        Tạo mới
                    </Button>
                </div>
            </form>
        </>
    )
}

export default EmployeeAdd