import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import {
    useSignInWithGoogle,
    useCreateUserWithEmailAndPassword,
    useUpdateProfile,
} from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
    const [signInWithGoogle, guser, loading] = useSignInWithGoogle(auth);
    const [createUserWithEmailAndPassword, euser] =
        useCreateUserWithEmailAndPassword(auth);
    const [updateProfile] = useUpdateProfile(auth);
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: "", email: "", password: "" });
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        await createUserWithEmailAndPassword(user.email, user.password);
        await updateProfile({ displayName: user.name });
    };
    if (loading) {
        return <p className="text-center m-0">Loading......</p>;
    }
    if (guser || euser) {
        toast("Successfully logged in with google");
        navigate("/login");
    }
    const handleGoogle = (e) => {
        signInWithGoogle();
    };
    return (
        <div>
            <Header></Header>
            <div className="container-md py-5">
                <h4 className="text-center mb-4">
                    Didn't have an Account? Please Sign Up
                </h4>
                <div className="w-50 mx-auto">
                    <form className="p-4 border" onClick={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            id=""
                            className="form-control mb-3"
                            placeholder="Enter name"
                            onChange={handleChange}
                        />
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
                                value="Register"
                                className="btn btn-primary mb-2 w-50"
                            />
                        </div>
                        <p className="m-0 text-center">
                            Didn't have an Accout?{" "}
                            <button
                                onClick={() => navigate("/login")}
                                className="bg-transparent border-0 text-danger"
                            >
                                Pleae Login
                            </button>
                        </p>
                    </form>
                    <ToastContainer />
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
            <Footer></Footer>
        </div>
    );
};

export default Signup;
