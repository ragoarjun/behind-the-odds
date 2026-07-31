import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError("");

        try {

            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email,
                    password
                }
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            navigate("/dashboard");

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Login Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">

            <div className="w-full max-w-sm">

                <div className="mb-8">

                    <h1 className="text-white text-5xl font-bold tracking-tight">

                        Behind The Odds

                    </h1>

                    <p className="text-zinc-500 mt-2">

                        Welcome back

                    </p>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        className="
                            w-full
                            bg-[#141414]
                            border
                            border-[#222]
                            rounded-xl
                            px-4
                            py-3
                            text-zinc-300
                            placeholder:text-zinc-500
                            outline-none
                            focus:border-[#fa233b]
                        "
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        className="
                            w-full
                            bg-[#141414]
                            border
                            border-[#222]
                            rounded-xl
                            px-4
                            py-3
                            text-zinc-300
                            placeholder:text-zinc-500
                            outline-none
                            focus:border-[#fa233b]
                        "
                    />

                    {error && (

                        <p className="text-red-500 text-sm">

                            {error}

                        </p>

                    )}

                    <div className="flex justify-end">

                        <Link
                            to="/forgot-password"
                            className="
                                text-sm
                                text-zinc-500
                                hover:text-[#fa233b]
                            "
                        >

                            Forgot Password?

                        </Link>

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            w-full
                            bg-[#fa233b]
                            hover:bg-[#ff3b54]
                            text-white
                            font-medium
                            py-3
                            rounded-xl
                            transition
                            disabled:opacity-50
                        "
                    >

                        {loading
                            ? "Logging In..."
                            : "Login"}

                    </button>

                </form>

                <div className="mt-6 text-center">

                    <p className="text-zinc-500 text-sm">

                        Don't have an account?

                        <Link
                            to="/create-account"
                            className="
                                text-white
                                ml-2
                                hover:text-[#fa233b]
                            "
                        >

                            Sign Up

                        </Link>

                    </p>

                </div>

            </div>

        </div>

    );

}

export default Login;