import { createContext, useState } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ServiceOwnerContext = createContext();

const ServiceOwnerProvider= ({children})=> {
    const [serviceOwner, setServiceOwner] = useState([]);
    const [ownerError, setOwnerError] = useState(null);
    
    const [services, setServices] = useState([]);
    const [serviceError, setServiceError] = useState(null);
    

    const fetchServiceOwner = async () => {
    try {
        setOwnerError(null); // reset error
        const res = await api.get("/serviceOwner");
        if (res?.data.status) {
        setServiceOwner(res.data.data);
        return { success: true };
        }
    } catch (error) {
        const errorMessage =
        err.response?.data?.statusMessage ||
        err.response.data?.message ||
        "Failed to load Service Owner";
        setOwnerError(errorMessage);
        toast.error(errorMessage);
        return { success: false, message: errorMessage };
    }
    };

    const fetchServices = async () => {
        try {
            setServiceError(null); // reset error
            const res = await api.get("/serviceOwner/services");
            if (res?.data.status) {
            setServices(res.data.data);
            return { success: true };
            }
        } catch (error) {
            console.error("error in fetching services:", error);
            const errorMessage =
            error.response?.data?.statusMessage ||
            error.response?.data?.message ||
            "Failed to load services";

            setServiceError(errorMessage);
            toast.error(errorMessage);
            return { success: false, message: errorMessage };
        }
    };

    return(
        <ServiceOwnerContext.Provider value={{fetchServiceOwner, serviceOwner, ownerError, fetchServices, services, serviceError }}>
            {children}
        </ServiceOwnerContext.Provider>
    );

};

export default ServiceOwnerProvider;
