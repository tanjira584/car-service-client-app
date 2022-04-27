import "./App.css";
import Home from "./Components/Home";
import { Routes, Route } from "react-router-dom";
import ServiceDetails from "./Components/ServiceDetails";
import Checkout from "./Components/Checkout";
import AddService from "./Components/AddService";
import ManageService from "./Components/ManageService";
import Update from "./Components/Update";
import Login from "./Components/Login";
import Signup from "./Components/signup";
import RequireAuth from "./Components/RequireAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Orders from "./Components/Orders";

function App() {
    return (
        <div className="">
            <Routes>
                <Route path="/" element={<Home></Home>}></Route>
                <Route path="/login" element={<Login></Login>}></Route>
                <Route path="/signup" element={<Signup></Signup>}></Route>
                <Route
                    path="/service/:serviceId"
                    element={
                        <RequireAuth>
                            <ServiceDetails></ServiceDetails>
                        </RequireAuth>
                    }
                ></Route>
                <Route
                    path="/orders"
                    element={
                        <RequireAuth>
                            <Orders></Orders>
                        </RequireAuth>
                    }
                ></Route>
                <Route
                    path="/checkout/:serviceId"
                    element={
                        <RequireAuth>
                            <Checkout></Checkout>
                        </RequireAuth>
                    }
                ></Route>
                <Route path="/add" element={<AddService></AddService>}></Route>
                <Route
                    path="/manage"
                    element={<ManageService></ManageService>}
                ></Route>
                <Route
                    path="/update/:updateId"
                    element={<Update></Update>}
                ></Route>
            </Routes>
            <ToastContainer />
        </div>
    );
}

export default App;
