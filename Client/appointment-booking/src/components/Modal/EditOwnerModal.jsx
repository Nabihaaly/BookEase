import { useContext, useEffect, useState } from "react";
import { ServiceOwnerContext } from "../../context/ServiceOwnerContext";
import { ServicesContext } from "../../context/ServicesContext";

function EditOwnerModal({ isOpen, onClose }) {
  if (!isOpen) return;

  const { serviceOwner, updateOwner, fileUpload } = useContext(ServiceOwnerContext);
  const { fetchCategories, categories, categoryError } = useContext(ServicesContext);

  const [service_Owner, setServiceOwner] = useState(serviceOwner);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setServiceOwner(serviceOwner);
    // Set preview to existing image if available
    if (serviceOwner.coverImageUrl) {
      setPreviewUrl(serviceOwner.coverImageUrl);
    }
  }, [serviceOwner]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!service_Owner.categoryID) newErrors.categoryID = "Category is required";
    if (!service_Owner.name?.trim()) newErrors.name = "Business name is required";
    if (!service_Owner.description?.trim()) newErrors.description = "Description is required";
    if (!service_Owner.location?.trim()) newErrors.location = "Location is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return service_Owner.coverImageUrl; // Return existing URL if no new file

    const form = new FormData();
    form.append("imageFile", selectedFile);

    const res = await fileUpload(form);
    if (res.success) {
      return res.image;
    } else {
      alert("Image Upload Failed");
      return null;
    }
  };

  const handleFileSelect = (event) => {
    const imageFile = event.target.files[0];
    setSelectedFile(imageFile);
    if (imageFile) {
      setPreviewUrl(URL.createObjectURL(imageFile));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Upload new image if selected
      const uploadedUrl = await handleFileUpload();
      if (selectedFile && !uploadedUrl) {
        setLoading(false);
        return; // Stop if upload failed
      }

      const updatedOwner = {
        ...service_Owner,
        coverImageUrl: uploadedUrl || service_Owner.coverImageUrl
      };

      const result = await updateOwner(updatedOwner);
      console.log(updatedOwner);
      
      if (!result.success) {
        console.log(result.message);
      } else {
        onClose();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFieldsChange = (e) => {
    setServiceOwner(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleReset = () => {
    setServiceOwner(serviceOwner);
    setSelectedFile(null);
    setPreviewUrl(serviceOwner.coverImageUrl || "");
    setErrors({});
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4 relative">
          {/* Header */}
          <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              Edit Business Profile
            </h2>
            <button
              onClick={handleReset}
              className="text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              ✕
            </button>
          </div>
          {/* Edit Service Owner Modal */}
          <div className="p-6 max-h-[80vh] overflow-y-auto">
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="categoryID"
                  value={service_Owner.categoryID || ""}
                  onChange={(e) => { handleFieldsChange(e) }}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    errors.categoryID ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                {errors.categoryID && (
                  <p className="text-red-500 text-sm mt-1">{errors.categoryID}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Name *
                </label>
                <input
                  name="name"
                  type="text"
                  className={`w-full px-4 py-2 border rounded-lg ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter business name"
                  value={service_Owner.name || ""}
                  onChange={(e) => handleFieldsChange(e)}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  rows="4"
                  className={`w-full px-4 py-2 border rounded-lg ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Describe your business"
                  value={service_Owner.description || ""}
                  onChange={(e) => handleFieldsChange(e)}
                ></textarea>
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  name="location"
                  type="text"
                  className={`w-full px-4 py-2 border rounded-lg ${
                    errors.location ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Business location"
                  value={service_Owner.location || ""}
                  onChange={(e) => handleFieldsChange(e)}
                />
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                )}
              </div>

              {/* IMAGE PREVIEW */}
              <div className="flex flex-col items-start gap-2">
                <label className="block text-sm font-medium text-gray-700">
                  Current Cover Image
                </label>
                {previewUrl ? (
                  <img
                    width="200"
                    height="200"
                    src={previewUrl}
                    alt="Business Cover"
                    className="rounded-lg object-cover border border-gray-300"
                  />
                ) : (
                  <p className="text-gray-500 text-sm">No image available</p>
                )}
              </div>

              {/* FILE INPUT */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Update Cover Image (Optional)
                </label>
                <input type="file" onChange={handleFileSelect} accept="image/*" />
                <p className="text-gray-500 text-xs mt-1">Leave empty to keep current image</p>
              </div>

              <div className="flex items-center">
                <input
                  name="isSoloProvider"
                  type="checkbox"
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  checked={service_Owner.isSoloProvider || false}
                  onChange={(e) =>
                    setServiceOwner((prev) => ({
                      ...prev,
                      isSoloProvider: e.target.checked,
                    }))
                  }
                />
                <label className="ml-2 text-sm text-gray-700">
                  Solo Provider (Individual service provider)
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-purple-600 text-white px-6 py-2.5 rounded-lg hover:bg-purple-700 transition-colors font-medium disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  disabled={loading}
                  className="flex-1 bg-gray-200 text-gray-700 px-6 py-2.5 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                  onClick={handleReset}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditOwnerModal;