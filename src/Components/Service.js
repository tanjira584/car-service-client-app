import React from "react";
import { useNavigate } from "react-router-dom";

const Service = ({ service }) => {
    const navigate = useNavigate();

    const goSingleService = (id) => {
        navigate(`/service/${id}`);
    };
    return (
        <div className="card">
            <img src={service.img} alt="" className="card-img" />
            <div className="card-body">
                <h4>{service.name}</h4>
                <p>{service.description}</p>
                <h4>{service.price}</h4>
                <button onClick={() => goSingleService(service._id)}>
                    Book: {service.name}
                </button>
            </div>
        </div>
    );
};

export default Service;
