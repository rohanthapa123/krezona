import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const Login = () => {
    


    const { isLoggedIn, role, setIsLoggedIn, setRole } = useAuth();

    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    })
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const login = async () => {
        try {
            if (loginData.username.trim() == "") {
                alert("Provide Usename");
                return;
            }
            if (loginData.password == "") {
                alert("Provide Password");
                return;
            }
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`, loginData, {
                withCredentials: true,
            });
            //console.log(response);  

            if (response.status === 403) {
                alert(response.data.message);
            } else {
                localStorage.setItem("data", JSON.stringify(response.data));
                setIsLoggedIn(true);
                setRole(response.data.result.role);
                // console.log(`Redirecting to /${response.data.result.role}`)
                navigate(`/${response.data.result.role}`);

            }
        } catch (error) {

            if (error.response) {

                if (error.response.status === 403) {
                    alert(error.response.data.message); // Handle the 403 status correctly
                }
            } else {
                console.error("Error:", error.message);
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(loginData);
        login();
    }

    useEffect(() => {
        if (isLoggedIn) {
            navigate(`/${role}`)
        }
    }, [isLoggedIn, role, navigate])

    return (
        <div className="flex  justify-center items-center bg-slate-400 h-[100vh]">
            <div className="mx-auto flex w-full flex-col justify-center items-center px-5 pt-0 md:h-[unset] md:max-w-[50%] lg:h-[100vh] min-h-[100vh] lg:max-w-[50%] lg:px-6">
                <div className="my-auto mb-auto mt-8 flex flex-col bg-slate-200 rounded-2xl p-8 md:mt-[70px] w-[400px] max-w-[450px] mx-auto md:max-w-[450px] lg:mt-[130px] lg:max-w-[450px]">
                    <p className="text-[32px] font-bold text-zinc-950 dark:text-black">
                        Sign In
                    </p>
                    <p className="mb-2.5 mt-2.5 font-normal text-zinc-950 dark:text-slate-900">
                        Enter your email and password to sign in!
                    </p>

                    <div>
                        <form noValidate onSubmit={handleSubmit} className="mb-4">
                            <div className="grid gap-2">
                                <div className="grid gap-1">
                                    <label className="text-zinc-950 dark:text-black" htmlFor="uesrname">
                                        Username
                                    </label>
                                    <input
                                        className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-md font-medium text-zinc-950 placeholder:text-zinc-400 focus:outline-0 "
                                        id="username"
                                        placeholder="Your Username"
                                        type="text"
                                        name="username"
                                        onChange={(e) => handleChange(e)}
                                    />
                                    <label
                                        className="text-zinc-950 mt-2 dark:text-black"
                                        htmlFor="password"
                                    >
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        placeholder="Password"
                                        type="password"
                                        className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-md font-medium text-zinc-950 placeholder:text-zinc-400 focus:outline-0 "
                                        name="password"
                                        onChange={(e) => handleChange(e)}

                                    />
                                </div>
                                <button
                                    className="bg-green-400  py-2 px-4 mt-4 w-fit m-auto rounded-xl"
                                    type="submit"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                        <p>
                            <NavLink to={"/register"}>Forgot your password?</NavLink>
                        </p>
                        <p>
                            <NavLink to={"/register"}>Don't have an account? Sign up</NavLink>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
