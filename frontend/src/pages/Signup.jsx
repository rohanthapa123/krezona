import axios from "axios";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
const SignUp = () => {

    const [registerData, setRegisterData] = useState({
        username : "",
        email : "",
        password : ""
    })
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setRegisterData((prev) => ({
            ...prev,
            [name] : value
        }))
    }

    const register = async () =>{
        try {
            const response = await axios.post("http://localhost:8085/auth/register", registerData, {
                withCredentials: true,
            });
            // console.log(response);  // Log entire response to check the structure
            
            if (response.status === 403) {
                alert(response.data.message); // Ensure that `response.data.message` exists
            } else {
                alert("Account created Succesfully")
                navigate("/login");
            }
        } catch (error) {
            // Handle network errors, or backend sending a status other than 2xx
            if (error.response) {
                // console.log(error.response);  // Log the full error response
                if (error.response.status === 403) {
                    alert(error.response.data.message); // Handle the 403 status correctly
                }
            } else {
                console.error("Error:", error.message);
            }
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        // console.log(registerData);
        register();
    }

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
                                    <label className="text-zinc-950 dark:text-black" htmlFor="username">
                                        Username
                                    </label>
                                    <input
                                        className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-950 placeholder:text-zinc-400 focus:outline-0 dark:border-zinc-800 dark:bg-transparent dark:text-white dark:placeholder:text-zinc-400"
                                        id="username"
                                        placeholder="Your Username"
                                        type="text"
                                        name="username"
                                        onChange={(e) => handleChange(e)}
                                    />
                                    <label className="text-zinc-950 dark:text-black" htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-950 placeholder:text-zinc-400 focus:outline-0 dark:border-zinc-800 dark:bg-transparent dark:text-white dark:placeholder:text-zinc-400"
                                        id="email"
                                        placeholder="Your Email"
                                        type="email"
                                        name="email"
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
                                        className="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-950 placeholder:text-zinc-400 focus:outline-0 dark:border-zinc-800 dark:bg-transparent dark:text-white dark:placeholder:text-zinc-400"
                                        name="password"
                                        onChange={(e) => handleChange(e)}

                                    />
                                </div>
                                <button
                                    className="bg-green-400  py-2 px-4 mt-4 w-fit m-auto rounded-xl"
                                    type="submit"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </form>
                        
                        <p>
                            <NavLink to={"/login"}>Already have an account? Login</NavLink>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
