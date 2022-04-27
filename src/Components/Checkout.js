import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useSingleService from "../hooks/useSingleService";
import Footer from "./Footer";
import Header from "./Header";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { toast } from "react-toastify";

const Checkout = () => {
    const [user] = useAuthState(auth);
    const { serviceId } = useParams();
    const [service] = useSingleService(serviceId);
    const [buyer, setBuyer] = useState({
        name: user.displayName,
        email: user.email,
        address: "Dhaka",
        phone: "0171111111",
    });

    const handleChange = (e) => {
        setBuyer({ ...buyer, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const order = {
            name: buyer.name,
            email: buyer.email,
            service: service.name,
            addredd: buyer.address,
            phone: buyer.phone,
        };
        fetch("http://localhost:5000/order", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(order),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.acknowledged) {
                    toast("Order successfully placed");
                }
            });
    };
    return (
        <div>
            <Header></Header>
            <div className="container-md py-5">
                <h4 className="text-center mb-4">
                    You are Booking for: {service.name}
                </h4>
                <div className="w-50 mx-auto">
                    <form onSubmit={handleSubmit}>
                        <input
                            className="form-control mb-3"
                            type="text"
                            name="name"
                            id=""
                            value={buyer.name}
                            readOnly
                        />
                        <input
                            className="form-control mb-3"
                            type="text"
                            name="email"
                            id=""
                            value={buyer.email}
                            readOnly
                        />
                        <input
                            className="form-control mb-3"
                            type="text"
                            name="name"
                            id=""
                            value={service.name}
                            readOnly
                        />
                        <input
                            className="form-control mb-3"
                            type="text"
                            name="address"
                            id=""
                            onChange={handleChange}
                            placeholder="Address"
                        />
                        <input
                            className="form-control mb-3"
                            type="text"
                            name="phone"
                            id=""
                            onChange={handleChange}
                            placeholder="Phone"
                        />
                        <input
                            className="btn btn-primary"
                            type="submit"
                            value="Submit"
                        />
                    </form>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Checkout;
