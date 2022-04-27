import { Link, useParams } from "react-router-dom";
import useSingleService from "../hooks/useSingleService";
import Footer from "./Footer";
import Header from "./Header";

const ServiceDetails = () => {
    const { serviceId } = useParams();
    const [service] = useSingleService(serviceId);

    return (
        <div>
            <Header></Header>
            <div className="container-md py-5">
                <div className="row">
                    <div className="col-md-3">
                        <div className="img">
                            <img
                                className="img-fluid"
                                src={service.img}
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div>
                            <h2>Service name: {service.name} </h2>
                            <p>{service.description}</p>
                            <h3>${service.price}</h3>
                            <Link to={`/checkout/${service._id}`}>
                                <button>Checkout</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default ServiceDetails;
