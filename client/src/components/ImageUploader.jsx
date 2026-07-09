import { useRef } from "react";

export default function ImageUploader({ onSelect }) {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  return (
    <>
      <input
        ref={inputRef}
        hidden
        type="file"
        accept="image/*"
        capture="environment"
        onChange={(e) => {
          const file = e.target.files[0];

          if (file) {
            onSelect(file);
          }
        }}
      />

      <button
        onClick={handleClick}
        className="bg-green-600 text-white px-6 py-3 rounded-lg"
      >
        Capture / Upload Image
      </button>
    </>
  );
}