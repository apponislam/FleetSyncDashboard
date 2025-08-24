import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import { useAdminLoginMutation } from "../../../redux/features/auth/authApi";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const [adminLogin] = useAdminLoginMutation();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const result = await adminLogin(data).unwrap();
            console.log("Login successful:", result);

            // Set tokens in localStorage
            localStorage.setItem("accessToken", result.data.accessToken);
            localStorage.setItem("refreshToken", result.data.refreshToken);

            console.log("Tokens stored in localStorage");

            // Redirect using React Router
            navigate("/", { replace: true });
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign In</h2>

                <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
                    {/* Email Field */}
                    <Form.Item label="Email" validateStatus={errors.email ? "error" : ""} help={errors.email?.message} className="mb-4">
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address",
                                },
                            }}
                            render={({ field }) => <Input {...field} size="large" placeholder="Enter your email" prefix={<UserOutlined className="text-gray-400" />} type="email" className="w-full" />}
                        />
                    </Form.Item>

                    {/* Password Field */}
                    <Form.Item label="Password" validateStatus={errors.password ? "error" : ""} help={errors.password?.message} className="mb-6">
                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                            }}
                            render={({ field }) => <Input.Password {...field} size="large" placeholder="Enter your password" prefix={<LockOutlined className="text-gray-400" />} className="w-full" />}
                        />
                    </Form.Item>

                    {/* Submit Button */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" className="w-full !bg-[#121217] hover:!bg-[#121212] !border-none">
                            Sign In
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Login;
