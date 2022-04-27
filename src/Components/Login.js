import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import {
    useSignInWithGoogle,
    useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const [signInWithGoogle, guser, loading] = useSignInWithGoogle(auth);
    const [signInWithEmailAndPassword, euser] =
        useSignInWithEmailAndPassword(auth);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/";
    const [user, setUser] = useState({ email: "", password: "" });
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(user.email, user.password);
        fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ email: user.email }),
        })
            .then((res) => res.json())
            .then((data) => {
                localStorage.setItem("accessToken", data.accessToken);
            });
    };
    if (loading) {
        return <p className="text-center m-0">Loading......</p>;
    }
    if (guser || euser) {
        toast("Successfully logged in with google");
        navigate(from, { replace: true });
    }
    const handleGoogle = (e) => {
        signInWithGoogle();
    };
    return (
        <div>
            <Header></Header>
            <div className="container-md py-5">
                <h4 className="text-center mb-4">
                    Already have an Account? Please Log In
                </h4>
                <div className="w-50 mx-auto">
                    <form className="p-4 border" onClick={handleSubmit}>
                        <input
                            type="email"
                            name="email"
                            id=""
                            className="form-control mb-3"
                            placeholder="Enter email"
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            id=""
                            className="form-control mb-3"
                            onChange={handleChange}
                        />
                        <div className="text-center">
                            {" "}
                            <input
                                type="submit"
                                value="Login"
                                className="btn btn-primary mb-2 w-50"
                            />
                        </div>
                        <p className="m-0 text-center">
                            Didn't have an Accout?{" "}
                            <button
                                onClick={() => navigate("/signup")}
                                className="bg-transparent border-0 text-danger"
                            >
                                Pleae Signup here
                            </button>
                        </p>
                    </form>
                    <div className="d-flex mt-4 align-items-center">
                        <div className="border-top w-50"></div>
                        <div className="mx-3">OR</div>
                        <div className="border-top w-50"></div>
                    </div>
                    <div>
                        <button
                            onClick={handleGoogle}
                            className="w-100 p-2 mt-4"
                        >
                            Login With Google
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer />
            <Footer></Footer>
        </div>
    );
};

export default Login;
