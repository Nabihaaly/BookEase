import React, { useContext, useState } from "react";
import { ServiceOwnerContext } from "../../context/ServiceOwnerContext";
import Select from "react-select";

function AddServiceModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const { postService, fileUpload } = useContext(ServiceOwnerContext);

  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [durationMinutes, setDurationMinutes] = useState(0);
  const [price, setPrice] = useState(0);
  const [maxAppointmentsPerDay, setMaxAppointmentsPerDay] = useState(0);
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState("");

  const [previewUrl, setPreviewUrl] = useState("");

  const [errors, setErrors] = useState({});

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

    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!durationMinutes) newErrors.durationMinutes = "Duration is required";
    if (!price) newErrors.price = "Price is required";
    if (!maxAppointmentsPerDay)
      newErrors.maxAppointmentsPerDay = "Max appointments required";
    if (daysOfWeek.length === 0)
      newErrors.daysOfWeek = "Select at least one day";
    if (!startTime) newErrors.startTime = "Start time required";
    if (!endTime) newErrors.endTime = "End time required";
    if (!selectedFile) newErrors.coverImage = "Cover image required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onFormSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!validateForm()) return;
      setLoading(true);

      
      // 🖼 Upload image only now
      var uploaded = await handleFileUpload();
      if (!uploaded) return;

      const service = {
        title: title,
        description: description,
        durationMinutes: Number(durationMinutes),
        price: Number(price),
        maxAppointmentsPerDay: Number(maxAppointmentsPerDay),
        daysOfWeek: daysOfWeek,
        startTime: `${startTime}:00`,
        endTime: `${endTime}:00`,
        coverImageUrl: uploaded
      };
      const result = await postService(service);
      console.log("Submitting service:", service);

      if (result?.success) {
        onClose();
      } else return;
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async () => {
    const form = new FormData();
    form.append("imageFile", selectedFile);
    console.log(form);

    const res = await fileUpload(form);
    console.log(res.image);
    console.log("cover " + coverImageUrl);
    if (res.success) {
      setCoverImageUrl(res.image);
      return res.image;
    } else {
      alert("Image Upload Failed");
      return false;
    }
  };

  // User selects a file (just store it, don’t upload yet)
  const handleFileSelect = async (event) => {
    var imageFile = event.target.files[0];
    setSelectedFile(imageFile);
    if (imageFile) setPreviewUrl(URL.createObjectURL(imageFile)); 
    console.log(previewUrl);
    return;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4 relative">
        <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Add New Service
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        <div className="p-6 max-h-[80vh] overflow-y-auto">
          <form onSubmit={onFormSubmit} className="space-y-5">
            {/* TITLE */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Title *
              </label>
              <input
                name="title"
                type="text"
                className={`w-full px-4 py-2 border rounded-lg ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter Service Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                rows="3"
                className={`w-full px-4 py-2 border rounded-lg ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Describe the service"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            {/* DURATION + PRICE */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (minutes) *
                </label>
                <input
                  name="durationMinutes"
                  type="number"
                  className={`w-full px-4 py-2 border rounded-lg ${
                    errors.durationMinutes
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="60"
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(e.target.value)}
                />
                {errors.durationMinutes && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.durationMinutes}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price *
                </label>
                <input
                  name="price"
                  type="number"
                  className={`w-full px-4 py-2 border rounded-lg ${
                    errors.price ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="3000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
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
                name="maxAppointmentsPerDay"
                type="number"
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent  ${
                  errors.maxAppointmentsPerDay
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="10"
                value={maxAppointmentsPerDay}
                onChange={(e) => setMaxAppointmentsPerDay(e.target.value)}
              />
              {errors.maxAppointmentsPerDay && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.maxAppointmentsPerDay}
                </p>
              )}
            </div>

            {/* Days of week (this is the key part you asked for) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Days of Week *
              </label>
              <Select
                isMulti
                options={dayOptions}
                // value must be array of option objects; we map from selected strings
                value={dayOptions.filter((opt) =>
                  daysOfWeek.includes(opt.value)
                )}
                onChange={(selected) =>
                  setDaysOfWeek(selected ? selected.map((s) => s.value) : [])
                }
                placeholder="Select days..."
                className="basic-multi-select"
                classNamePrefix="select"
              />
              {errors.daysOfWeek && (
                <p className="text-red-500 text-sm mt-1">{errors.daysOfWeek}</p>
              )}
            </div>

            {/* START & END TIME */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Time *
                </label>
                <input
                  type="time"
                  className={`w-full px-4 py-2 border rounded-lg ${
                    errors.startTime || errors.time
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
                {errors.startTime && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.startTime}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Time *
                </label>
                <input
                  type="time"
                  className={`w-full px-4 py-2 border rounded-lg ${
                    errors.endTime || errors.time
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
                {errors.endTime && (
                  <p className="text-red-500 text-sm mt-1">{errors.endTime}</p>
                )}
              </div>
            </div>
            {errors.time && (
              <p className="text-red-500 text-sm">{errors.time}</p>
            )}

            {/* IMAGE PREVIEW */}
            <div className="flex flex-col items-start gap-2">
              {previewUrl ? (
                <img
                  width="200"
                  height="200"
                  src={previewUrl}
                  alt="Service Cover"
                  className="rounded-lg object-cover border border-gray-300"
                />
              ) : (
                <p className="text-gray-500 text-sm">No image selected yet</p>
              )}
            </div>

            {/* FILE INPUT */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cover Image *
              </label>
              <input type="file" onChange={handleFileSelect} />
              {errors.coverImage && (
                <p className="text-red-500 text-sm mt-1">{errors.coverImage}</p>
              )}
            </div>

            {/* SUBMIT BUTTONS */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-purple-600 text-white px-6 py-2.5 rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                {loading ? "Adding..." : "Add Service"}
              </button>
              <button
                onClick={onClose}
                type="button"
                className="flex-1 bg-gray-200 text-gray-700 px-6 py-2.5 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddServiceModal;
