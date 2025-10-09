import { createContext, useState } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ServicesContext = createContext();

const ServiceProvider= ({children})=> {
    const [categories, setCategories] = useState([]);
    const [serviceOwners, setServiceOwners] = useState([]);
    const [services, setServices] = useState([]);
    const [providerError, setProviderError] = useState(null);
    const [serviceError, setServiceError] = useState(null);
    const [categoryError, setCategoryError] = useState(null);


    const fetchCategories = async () => {
    try {
        setCategoryError(null); // reset error
        const res = await api.get("/user/serviceCategories");
        if (res?.data.status) {
        setCategories(res.data.data);
        return { success: true };
        }
    } catch (error) {
        console.error("error in fetching categories:", error);
        const errorMessage =
        error.response?.data?.statusMessage ||
        error.response?.data?.message ||
        "Failed to load categories";

        setCategoryError(errorMessage); // set error here
        toast.error(errorMessage);
        return { success: false, message: errorMessage };
    }
    };

    const fetchServiceOwners = async () => {
    try {
        setProviderError(null); // reset error
        const res = await api.get("/user/serviceOwners");
        if (res?.data.status) {
        setServiceOwners(res.data.data);
        return { success: true };
        }
    } catch (error) {
        console.error("error in fetching owners:", error);
        const errorMessage =
        error.response?.data?.statusMessage ||
        error.response?.data?.message ||
        "Failed to load providers";

        setProviderError(errorMessage); // set error here
        toast.error(errorMessage);
        return { success: false, message: errorMessage };
    }
    };

    // fetch service Owners for specific category
    const fetchServiceOwnersById = async (id) => {
    try {
        setProviderError(null); // reset error
        const res = await api.get(`/user/serviceOwnersOfCategory/${id}/owners`);
        if (res?.data.status) {
        setServiceOwners(res.data.data);
        return { success: true };
        }
    } catch (error) {
        console.error("error in fetching owners:", error);
        const errorMessage =
        error.response?.data?.statusMessage ||
        error.response?.data?.message ||
        "Failed to load providers";

        setProviderError(errorMessage); // set error here
        toast.error(errorMessage);
        return { success: false, message: errorMessage };
    }
    };

    // fetch services for specific owner
    const fetchServicesByOwnerId = async (id) => {
        try {
            setServiceError(null); // reset error
            const res = await api.get(`/user/servicesOfOwner/${id}/services`);
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
    const fetchServices = async () => {
        try {
            setServiceError(null); // reset error
            const res = await api.get("/user/services");
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

    return (
        <ServicesContext.Provider value={{ fetchCategories, categories, categoryError, fetchServiceOwners, serviceOwners, setServiceOwners,fetchServiceOwnersById, providerError, services, fetchServices,fetchServicesByOwnerId, serviceError }}>
            {children}
        </ServicesContext.Provider>
    );
};

export default ServiceProvider ;