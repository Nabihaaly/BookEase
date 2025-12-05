import { RouterProvider } from "react-router-dom";
import router from "./routes/AppRouter"; // your router setup
import { AuthProvider } from "./context/AuthContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServiceProvider from "./context/ServicesContext.jsx";
import AdminProvider from "./context/AdminContext.jsx";
import AppointmentProvider from "./context/AppointmentsContext.jsx";
import ServiceOwnerProvider from "./context/ServiceOwnerContext.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <ServiceProvider>
          <AdminProvider>
          <AppointmentProvider>
            <ServiceOwnerProvider>
              <RouterProvider router={router} />
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                style={{ zIndex: 9999 }}
              />
            </ServiceOwnerProvider>
          </AppointmentProvider>
          </AdminProvider>
        </ServiceProvider>
      </AuthProvider>
    </>
  );
}

export default App;
