import React from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { signOut } from "firebase/auth";

const Header = () => {
    const [user, loading] = useAuthState(auth);
    if (loading) {
        return <p className="text-center m-0">Loading.....</p>;
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid container-md">
                    <Link className="navbar-brand" to="/">
                        Navbar
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/" className="nav-link active">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/manage" className="nav-link">
                                    Manage
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/add" className="nav-link">
                                    Add
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/orders" className="nav-link">
                                    Orders
                                </Link>
                            </li>
                            {user ? (
                                <button
                                    style={{ color: "#cccccc" }}
                                    className="bg-transparent border-0"
                                    onClick={() => signOut(auth)}
                                >
                                    Signout
                                </button>
                            ) : (
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link">
                                        Login
                                    </Link>
                                </li>
                            )}

                            <li className="nav-item">
                                <Link to="/signup" className="nav-link">
                                    Register
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;
