import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import Footer from "./Footer";
import Header from "./Header";

const Orders = () => {
    const [user] = useAuthState(auth);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/order?email=${user.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setOrders(data);
            });
    }, [user]);
    return (
        <div>
            <Header></Header>
            <div className="contianer-md py-5">
                <h2 className="text-center">Your Orders: {orders.length}</h2>
                {orders.length > 0 &&
                    orders.map((order) => (
                        <div
                            className="w-50 mx-auto d-flex align-items-center border-bottom py-3"
                            key={order._id}
                        >
                            <div className="w-50">Name: {order.name}</div>
                            <div className="w-50">Service: {order.service}</div>
                        </div>
                    ))}
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Orders;
