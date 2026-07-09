import { useState } from "react";
import api from "../api/axios";
import ImageUploader from "../components/ImageUploader";

export default function Scan() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleImageSelect = (file) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setMessage("");
  };

  const uploadImage = async () => {
    if (!image) {
      setMessage("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      setLoading(true);

      const response = await api.post("/scan/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Upload failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreview("");
    setMessage("");
  };

  return (
    <div className="max-w-xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Scan Product
      </h1>

      <ImageUploader onSelect={handleImageSelect} />

      {preview && (
        <div className="mt-6">

          <img
            src={preview}
            alt="Preview"
            className="rounded-xl shadow w-full max-h-96 object-cover"
          />

          <div className="flex gap-3 mt-5">

            <button
              onClick={uploadImage}
              disabled={loading}
              className="bg-green-600 text-white px-6 py-3 rounded-lg"
            >
              {loading ? "Uploading..." : "Upload"}
            </button>

            <button
              onClick={removeImage}
              className="bg-red-500 text-white px-6 py-3 rounded-lg"
            >
              Remove
            </button>

          </div>

        </div>
      )}

      {message && (
        <p className="mt-5 text-lg">
          {message}
        </p>
      )}

    </div>
  );
}