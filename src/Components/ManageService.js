import React from "react";
import { Link } from "react-router-dom";
import useService from "../hooks/useService";
import Footer from "./Footer";
import Header from "./Header";

const ManageService = () => {
    const [services, setServices] = useService();
    const handleDelet = (id) => {
        const proceed = window.confirm("Are you sure want to delete?");
        if (proceed) {
            const uri = `http://localhost:5000/service/${id}`;
            fetch(uri, {
                method: "DELETE",
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.deletedCount > 0) {
                        const remaining = services.filter((s) => s._id !== id);
                        setServices(remaining);
                    }
                });
        }
    };
    return (
        <div>
            <Header></Header>
            <div className="container-md py-5">
                <h2 className="text-center">Manage Your services</h2>
                <div className="w-25 mx-auto">
                    {services.map((service) => (
                        <div
                            key={service._id}
                            className="border-bottom py-2 d-flex"
                        >
                            <h5>{service.name}</h5>
                            <Link
                                to={`/update/${service._id}`}
                                className="ms-auto d-inline-block"
                            >
                                <button>Update</button>
                            </Link>
                            <button
                                onClick={() => handleDelet(service._id)}
                                className="ms-2"
                            >
                                X
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default ManageService;
