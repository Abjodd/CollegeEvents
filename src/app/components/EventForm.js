"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EventForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
    latitude: "",
    longitude: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
  });
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewImage(null);
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("latitude", formData.latitude);
    formDataToSend.append("longitude", formData.longitude);
    formDataToSend.append("startDate", formData.startDate);
    formDataToSend.append("startTime", formData.startTime);
    formDataToSend.append("endDate", formData.endDate);
    formDataToSend.append("endTime", formData.endTime);
    formDataToSend.append("image", formData.image);
  
    console.log("Submitting FormData:", [...formDataToSend.entries()]); // Debugging
  
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        body: formDataToSend,
      });
  
      const responseData = await res.json();
      if (res.ok) {
        alert("Event created successfully!");
        router.push("/");
      } else {
        throw new Error(responseData.error || "Failed to create event");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen  flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <h1 className="text-2xl font-bold">Create New Event</h1>
          <p className="opacity-90">Fill in the details for your upcoming event</p>
        </div>

        {/* Scrollable Form */}
        <div className="max-h-[400px] overflow-y-auto p-6 sm:p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-black mb-1">
                Event Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Tech Conference 2023"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300  text-black rounded-lg"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-black mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Describe your event in detail..."
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border  text-black border-gray-300 rounded-lg"
                required
              />
            </div>

            {/* Date & Time Inputs */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-black mb-1">Start Date *</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 text-black rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-1">Start Time *</label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300   text-black rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-1">End Date *</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300  text-black rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-1">End Time *</label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300  text-black rounded-lg"
                  required
                />
              </div>
            </div>

            {/* Location Inputs */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-black mb-1">Latitude *</label>
                <input
                  type="number"
                  name="latitude"
                  placeholder="40.7128"
                  step="0.000001"
                  value={formData.latitude}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300  text-black rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-1">Longitude *</label>
                <input
                  type="number"
                  name="longitude"
                  placeholder="-74.0060"
                  step="0.000001"
                  value={formData.longitude}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300  text-black rounded-lg"
                  required
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-black mb-1">Event Image *</label>
              <div className="mt-1 flex items-center">
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg"
                >
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="h-full w-full object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-gray-500">Click to upload an image</span>
                  )}
                  <input
                    id="image-upload"
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                    required
                  />
                </label>
              </div>
            </div>
          </form>
        </div>

        {/* Fixed Bottom Buttons */}
        <div className="bg-white px-6 py-4 border-t flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {loading ? "Creating..." : "Create Event"}
          </button>
        </div>
      </div>
    </div>
  );
}
