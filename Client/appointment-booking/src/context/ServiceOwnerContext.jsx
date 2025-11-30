import { createContext, useState } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ServiceOwnerContext = createContext();

const ServiceOwnerProvider = ({ children }) => {
  const [serviceOwner, setServiceOwner] = useState([]);
  const [ownerError, setOwnerError] = useState(null);
  const [editOwnerError, setEditOwnerError] = useState(null);

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

  const updateOwner = async (serviceOwner) => {
    try {
      // reset error
      const res = await api.put("/serviceOwner", serviceOwner);
      if (res?.data.status) {
        fetchServiceOwner();
        toast.success("Business Profile Updated successfully!");
        return { success: true };
      }
    } catch (error) {
      console.error("error in updating service owner:", error);
      const errorMessage =
        error.response?.data?.statusMessage ||
        error.response?.data?.message ||
        "Failed to update service owner";

      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    }
  };
  const updateService = async (id, service) => {
    try {
      // reset error
      const res = await api.put(`/serviceOwner/service/${id}`, service);
      if (res?.data.status) {
        fetchServices();
        toast.success("Service Updated successfully!");
        return { success: true };
      }
    } catch (error) {
      console.error("error in updating service:", error);
      const errorMessage =
        error.response?.data?.statusMessage ||
        error.response?.data?.message ||
        "Failed to update service";

      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  const deleteService = async (id) => {
    try {
      const res = await api.delete(`/serviceOwner/service/${id}`);
      if (res?.data.status) {
        fetchServices();
        toast.success("Service Deleted successfully!");
        return { success: true };
      }
    } catch (error) {
      console.error("error in deleting services:", error);
      const errorMessage =
        error.response?.data?.statusMessage ||
        error.response?.data?.message ||
        "Failed to delete service";

      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    }
  };
  const postService = async (service) => {
    try {
      const res = await api.post(`/serviceOwner/service`, service);
      if (res?.data.status) {
        fetchServices();
        toast.success("Service Created successfully!");
        return { success: true };
      }
    } catch (error) {
      console.error("error in creating services:", error);
      const errorMessage =
        error.response?.data?.statusMessage ||
        error.response?.data?.message ||
        "Failed to create service";

      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  const fileUpload = async (form) => {
    try {
      const res = await api.post('/serviceOwner/upload-service-image', form);
      if (res?.data.status) {
        console.log( res?.data.data)
        return { success: true,  image: res?.data.data };
      }
      else{
        const errorMessage =
        error.response?.data?.statusMessage ||
        "Failed to uplaod image";
        toast.error(errorMessage);
      return { success: false, message: errorMessage };
      }
    } catch (error) {
      console.error("error in uploading image:", error);
      const errorMessage =
        error.response?.data?.statusMessage ||
        error.response?.data?.message ||
        "Failed to uplaod image";

      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  const clearServiceOwnerData = () => {
    setServiceOwner([]);
    setServices([]);
  };  


  return (
    <ServiceOwnerContext.Provider
      value={{
        fetchServiceOwner,
        serviceOwner,
        ownerError,
        fetchServices,
        services,
        serviceError,
        updateOwner,
        editOwnerError, 
        updateService,
        postService,
        deleteService,
        fileUpload,
        clearServiceOwnerData
      }}
    >
      {children}
    </ServiceOwnerContext.Provider>
  );
};

export default ServiceOwnerProvider;
