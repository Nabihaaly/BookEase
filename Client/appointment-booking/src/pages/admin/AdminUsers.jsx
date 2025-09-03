import { useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { toast } from "react-toastify";

// AdminUsers.jsx
export default function AdminUsers() {

  const [users, setUsers] = useState([]);  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteUser = async(id)=>{
      try {
        const confirmDelete =   window.confirm("Are you sure you want to delete this appointment?")
        if(!confirmDelete) return ;
  
          const res= await api.delete(`/admin/user/${id}`);
          if(res.data.status){
            setUsers((prev=> prev.filter(user => user.id !== id) ));
            toast.success("User deleted successfully!");
          }
        } catch (err) {
          toast.error("Something went wrong!");
          if (err.response) {
            console.error("Error while deleting user:", err.response.data);
          } else {
            console.error("Unexpected error while deleting user:", err);
          }
        }
    }

  useEffect(()=>{
    async function fetchUsers(){
      try {
        setLoading(true);
        setError(null);

        const res = await api.get("/admin/users");
        if(res?.data.status){
          setUsers(res.data.data);
        }
      } catch (err) {
          if(err.response){
          toast.error(err.response.data?.statusMessage || "Server error while fetching appointments." );
          }
          else if(err.request){
          toast.error("Network error. Please check your internet connection.");
          }
          else toast.error("Unexpected error occurred.");    
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  },[])

  return (
    <section className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">All Users</h2>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-500">Total: {users.length} users</span>
        </div>
      </div>

      {loading && (
        <div className="p-6 text-center text-gray-500">Loading appointments...</div>
      )}

      {(users && users.length === 0 && !loading) ? (
        <div className="p-6 text-center text-gray-500">
          No appointments found
        </div>):(
          <>
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            {/* Mobile Card View */}
            <div className="sm:hidden">
              <div className="divide-y divide-gray-200">
                {users && users.map((user, index)=>{
                  return(
                  <div key={user.id || index} className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Appointments:</span> {user.appointmentsCount}
                    </div>
                    <button onClick={()=>{ deleteUser(user.id)}} className="text-red-600 hover:text-red-900 text-sm">Delete</button>
                  </div>
                )})}
              </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Appointments
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users && users.map((user, index)=>{
                  return(
                  <tr  key={user.id || index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>                    
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.appointmentsCount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button onClick={()=>{ deleteUser(user.id)}} className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                  )})}
                </tbody>
              </table>
            </div>
          </div>
          </>
      )}
    </section>
  );
}
