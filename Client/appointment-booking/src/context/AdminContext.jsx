import { createContext, useState } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AdminContext = createContext();

const AdminProvider= ({children})=> {
    const [serviceOwners, setServiceOwners] = useState([]);
    const [providerError, setProviderError] = useState(null);

    const fetchServiceOwners = async () => {
    try {
        setProviderError(null); // reset error
        const res = await api.get("/admin/serviceOwners");
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
    
    return (
        <AdminContext.Provider value={{ serviceOwners, fetchServiceOwners,setServiceOwners, providerError}}>
            {children}
        </AdminContext.Provider>
    );
};

export default AdminProvider ;