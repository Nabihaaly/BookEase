import { useEffect, useState } from "react";
import api from "../../utils/api";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";

function AdminServiceOwner() {
  const { serviceOwners, fetchServiceOwners,setServiceOwners} = useContext(AdminContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteServiceOwners = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this Service Owner?"
      );
      if (!confirmDelete) return;

    const res = await api.delete(`/admin/serviceOwner/${id}`);
      if (res.data.status) {
        setServiceOwners((prev) =>
          prev.filter((serviceOwner) => serviceOwner.id !== id)
        );
        toast.success("Service Owner deleted successfully!");
      }
    } catch (err) {
      toast.error("Something went wrong!");
      if (err.response) {
        console.error("Error while deleting Service Owner:", err.response.data);
      } else {
        console.error("Unexpected error while deleting Service Owner:", err);
      }
    }
  };

  useEffect(() => {
    async function fetch() {
        setLoading(true);
        setError(null);

        const res = await fetchServiceOwners();
        setLoading(false);
        if(res?.success ===false)
            setError(res.message);
    }
    fetch();
  }, []);

  return (
    <section className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          Service Providers Management
        </h2>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-500">Total: {serviceOwners.length} providers</span>
        </div>
      </div>

      {loading && (
        <div className="p-6 text-center text-gray-500">Loading service owners...</div>
      )}

      {(serviceOwners && serviceOwners.length === 0 && !loading) ? (
        <div className="p-6 text-center text-gray-500">
          No service owners found
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          {/* Mobile Card View */}
          <div className="sm:hidden">
            <div className="divide-y divide-gray-200">
              {serviceOwners && serviceOwners.map((owner, index) => (
                <div key={owner.id || index} className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{owner.name}</div>
                      <div className="text-sm text-gray-500 mt-1">{owner.description}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">Category:</span>
                      <div className="text-gray-900">{owner.categoryName}</div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Email:</span>
                      <div className="text-gray-900">{owner.userEmail}</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span
                      className={`px-2 py-1 text-xs leading-4 font-semibold rounded-full ${
                        owner.isSoloProvider
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {owner.isSoloProvider ? "Solo Provider" : "Team Provider"}
                    </span>
                    <button
                      onClick={() => deleteServiceOwners(owner.id)}
                      className="text-red-600 hover:text-red-900 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Provider Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Services
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Solo Provider
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {serviceOwners && serviceOwners.map((owner, index) => (
                  <tr key={owner.id || index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {owner.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {owner.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {owner.categoryName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {owner.userEmail}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {owner.serviceCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          owner.isSoloProvider
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {owner.isSoloProvider ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => deleteServiceOwners(owner.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}

export default AdminServiceOwner;