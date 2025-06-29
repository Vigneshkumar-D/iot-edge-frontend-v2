import { useState } from "react";
import { Mail, LockKeyhole, LogIn, Image } from "lucide-react";
import usePasswordToggle from "./hooks/usePasswordToggle"; // Adjust path if needed

// UI components
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Form } from "./components/ui/form";

const LoginForm = () => {
    const { inputIcon, inputType } = usePasswordToggle();
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };

    return (
        <Form
            onSubmit={handleSubmit}
            className="flex w-full flex-col max-w-sm flex-col items-center justify-center gap-2"
        >

            <img
                className="mx-auto h-24 w-30 my-2"
                src="https://logolook.net/wp-content/uploads/2024/11/Amazon-Logo.png"
                alt="Logo"
            />

            <div className="flex w-full flex-col items-center justify-center gap-2">
                <div className="w-full">
                    <label className="block mb-1 text-sm font-medium text-left">
                        Email<span className="text-destructive">*</span>
                    </label>
                    <Input
                        placeholder="Enter your email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        startContent={<Mail size={16} />}
                    />
                </div>

                <div className="w-full">
                    <label className="block mb-1 text-sm font-medium text-left">
                        Password<span className="text-destructive">*</span>
                    </label>
                    <Input
                        placeholder="Enter your password"
                        name="password"
                        type={inputType}
                        value={formData.password}
                        onChange={handleChange}
                        startContent={<LockKeyhole size={16} />}
                        endContent={inputIcon}
                    />
                </div>

                <a
                    href="/auth/forgot-password"
                    className="text-primary w-full text-end text-xs font-medium md:text-sm"
                >
                    Forgot Password?
                </a>
            </div>

            <div className="flex w-full flex-col items-center justify-center gap-6">
                <Button className="w-36 justify-between bg-black m-6" size="lg" type="submit">
                    Login
                    <LogIn size={16} />
                </Button>

                <span className="text-xs md:text-sm">
                    Don't have an account?{" "}
                    <a
                        className="text-primary  text-xs font-medium md:text-sm"
                        href="/auth/register"
                    >
                        Register now
                    </a>
                </span>
            </div>
        </Form>
    );
};

export default LoginForm;
