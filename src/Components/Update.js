import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Update = () => {
    const { updateId } = useParams();
    const [service, setService] = useState({});
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [img, setImg] = useState("");
    const handleName = (e) => {
        setName(e.target.value);
    };
    const handleDescription = (e) => {
        setDescription(e.target.value);
    };
    const handlePrice = (e) => {
        setPrice(e.target.value);
    };
    const handleImg = (e) => {
        setImg(e.target.value);
    };
    useEffect(() => {
        const uri = `http://localhost:5000/service/${updateId}`;
        fetch(uri)
            .then((res) => res.json())
            .then((data) => setService(data));
    }, [updateId]);
    const handleSubmit = (e) => {
        e.preventDefault();
        const uri = `http://localhost:5000/service/${updateId}`;
        fetch(uri, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ name, description, price, img }),
        })
            .then((res) => res.json())
            .then((data) => {
                alert("User Updated successfully");
                e.target.reset();
            });
    };
    return (
        <div>
            <Header></Header>
            <div className="container-md py-5">
                <h2 className="text-center">
                    Updating Service : {service.name}
                </h2>
                <div className="w-50 mx-auto">
                    <form onSubmit={handleSubmit}>
                        <input
                            className="form-control mb-3"
                            type="text"
                            name="name"
                            id=""
                            placeholder="Service name"
                            onBlur={handleName}
                        />
                        <textarea
                            name="description"
                            className="form-control mb-3"
                            id=""
                            cols="30"
                            rows="3"
                            placeholder="Service description"
                            onBlur={handleDescription}
                        ></textarea>
                        <input
                            type="number"
                            className="form-control mb-3"
                            name="price"
                            id=""
                            placeholder="Price"
                            onBlur={handlePrice}
                        />
                        <input
                            type="text"
                            className="form-control mb-3"
                            name="img"
                            id=""
                            placeholder="Image url"
                            onBlur={handleImg}
                        />
                        <input type="submit" value="Update Service" />
                    </form>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Update;
