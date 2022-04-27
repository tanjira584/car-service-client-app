import { useEffect, useState } from "react";

const useSingleService = (id) => {
    const [service, setService] = useState({});
    useEffect(() => {
        fetch(`http://localhost:5000/service/${id}`)
            .then((res) => res.json())
            .then((data) => setService(data));
    }, [id]);
    return [service, setService];
};
export default useSingleService;
