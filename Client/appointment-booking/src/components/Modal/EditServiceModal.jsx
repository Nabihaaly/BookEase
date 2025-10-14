import { useContext, useState, useEffect } from "react";
import { ServiceOwnerContext } from "../../context/ServiceOwnerContext";
import Select from "react-select";

const EditServiceModal = ({ isOpen, service, onClose }) => {
  if (!isOpen) return;

  const { updateService, fileUpload } = useContext(ServiceOwnerContext);

  const [newService, setNewService] = useState(service);
  const [selectedDays, setSelectedDays] = useState(newService.daysOfWeek);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setNewService(service);
    setSelectedDays(service.daysOfWeek || []);
    // Set preview to existing image if available
    if (service.coverImageUrl) {
      setPreviewUrl(service.coverImageUrl);
    }
  }, [service]);

  const dayOptions = [
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
    { value: "Sunday", label: "Sunday" },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!newService.title?.trim()) newErrors.title = "Title is required";
    if (!newService.description?.trim()) newErrors.description = "Description is required";
    if (!newService.durationMinutes) newErrors.durationMinutes = "Duration is required";
    if (!newService.price) newErrors.price = "Price is required";
    if (!newService.maxAppointmentsPerDay) newErrors.maxAppointmentsPerDay = "Max appointments required";
    if (!selectedDays || selectedDays.length === 0) newErrors.daysOfWeek = "Select at least one day";
    if (!newService.startTime) newErrors.startTime = "Start time required";
    if (!newService.endTime) newErrors.endTime = "End time required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return newService.coverImageUrl; // Return existing URL if no new file

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

      const updatedService = {
        ...newService,
        coverImageUrl: uploadedUrl || newService.coverImageUrl
      };

      const result = await updateService(service.id, updatedService);
      console.log(updatedService);
      
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
    setNewService((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDaysOfWeek = (selected) => {
    const days = selected ? selected.map(s => s.value) : [];
    setSelectedDays(days);
    setNewService((prev) => ({
      ...prev,
      daysOfWeek: days
    }));
  };

  const handleReset = () => {
    setNewService(service);
    setSelectedDays(service.daysOfWeek || []);
    setSelectedFile(null);
    setPreviewUrl(service.coverImageUrl || "");
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
              Edit Service
            </h2>
            <button
              onClick={handleReset}
              className="text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              ✕
            </button>
          </div>
          {/* Edit Service Modal */}
          <div className="p-6 max-h-[80vh] overflow-y-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="space-y-5"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Title *
                </label>
                <input
                  name="title"
                  type="text"
                  value={newService.title || ""}
                  placeholder="Enter service title"
                  className={`w-full px-4 py-2 border rounded-lg ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  }`}
                  onChange={(e) => handleFieldsChange(e)}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  rows="3"
                  className={`w-full px-4 py-2 border rounded-lg ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  }`}
                  name="description"
                  value={newService.description || ""}
                  placeholder="Enter service description"
                  onChange={(e) => handleFieldsChange(e)}
                ></textarea>
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (minutes) *
                  </label>
                  <input
                    type="number"
                    className={`w-full px-4 py-2 border rounded-lg ${
                      errors.durationMinutes ? "border-red-500" : "border-gray-300"
                    }`}
                    name="durationMinutes"
                    value={newService.durationMinutes || ""}
                    placeholder="Enter duration in minutes"
                    onChange={(e) => handleFieldsChange(e)}
                  />
                  {errors.durationMinutes && (
                    <p className="text-red-500 text-sm mt-1">{errors.durationMinutes}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price *
                  </label>
                  <input
                    type="number"
                    className={`w-full px-4 py-2 border rounded-lg ${
                      errors.price ? "border-red-500" : "border-gray-300"
                    }`}
                    name="price"
                    value={newService.price || ""}
                    onChange={(e) => handleFieldsChange(e)}
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Appointments Per Day *
                </label>
                <input
                  type="number"
                  className={`w-full px-4 py-2 border rounded-lg ${
                    errors.maxAppointmentsPerDay ? "border-red-500" : "border-gray-300"
                  }`}
                  name="maxAppointmentsPerDay"
                  value={newService.maxAppointmentsPerDay || ""}
                  onChange={(e) => handleFieldsChange(e)}
                />
                {errors.maxAppointmentsPerDay && (
                  <p className="text-red-500 text-sm mt-1">{errors.maxAppointmentsPerDay}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Days of Week *
                </label>
                <Select
                  isMulti
                  options={dayOptions}
                  value={dayOptions.filter(d => selectedDays.includes(d.value))}
                  onChange={(selected) => handleDaysOfWeek(selected)}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
                {errors.daysOfWeek && (
                  <p className="text-red-500 text-sm mt-1">{errors.daysOfWeek}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Time *
                  </label>
                  <input
                    type="time"
                    className={`w-full px-4 py-2 border rounded-lg ${
                      errors.startTime ? "border-red-500" : "border-gray-300"
                    }`}
                    name="startTime"
                    value={newService.startTime || "09:00"}
                    onChange={(e) => handleFieldsChange(e)}
                  />
                  {errors.startTime && (
                    <p className="text-red-500 text-sm mt-1">{errors.startTime}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Time *
                  </label>
                  <input
                    type="time"
                    className={`w-full px-4 py-2 border rounded-lg ${
                      errors.endTime ? "border-red-500" : "border-gray-300"
                    }`}
                    name="endTime"
                    value={newService.endTime || "17:00"}
                    onChange={(e) => handleFieldsChange(e)}
                  />
                  {errors.endTime && (
                    <p className="text-red-500 text-sm mt-1">{errors.endTime}</p>
                  )}
                </div>
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
                    alt="Service Cover"
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

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-purple-600 text-white px-6 py-2.5 rounded-lg hover:bg-purple-700 transition-colors font-medium disabled:opacity-50"
                >
                  {loading ? "Updating..." : "Update Service"}
                </button>
                <button
                  onClick={handleReset}
                  type="button"
                  disabled={loading}
                  className="flex-1 bg-gray-200 text-gray-700 px-6 py-2.5 rounded-lg hover:bg-gray-300 transition-colors font-medium"
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
};

export default EditServiceModal;