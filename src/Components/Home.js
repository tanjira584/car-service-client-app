import React from "react";
import useService from "../hooks/useService";
import Footer from "./Footer";
import Header from "./Header";
import Service from "./Service";

const Home = () => {
    const [services] = useService();
    return (
        <div>
            <Header></Header>

            <div className="container-md py-5">
                <h2 className="text-center">Our Services</h2>
                <div className="row g-5">
                    {services.map((service) => (
                        <div className="col-md-4" key={service._id}>
                            <Service service={service}></Service>
                        </div>
                    ))}
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Home;
