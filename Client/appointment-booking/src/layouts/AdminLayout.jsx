import Footer from "../components/common/FooterMy";
import Navbar from "../components/common/Navbar";
import AdminAppointments from "../pages/admin/appointmentList";
import AdminUsers from "../pages/admin/userList";
import AdminNavbar from "../components/adminNavbar";

function AdminLayout() {
    return ( 
        <>
            <Navbar/>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
            <AdminAppointments/>
            <AdminUsers/>
            </main>
            <Footer/>
        </>
     );
}

export default AdminLayout;