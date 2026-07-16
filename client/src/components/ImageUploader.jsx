import { useRef } from "react";

import Button from "./common/Button.jsx";

export default function ImageUploader({
  onSelect,
  accept = "image/*",
  capture = "environment",
}) {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      onSelect(file);
    }

    // Allow selecting the same file again after removing it
    e.target.value = "";
  };

  return (
    <>
      <input
        ref={inputRef}
        hidden
        type="file"
        accept={accept}
        capture={capture}
        onChange={handleChange}
      />

      <Button type="button" onClick={handleClick}>
        Capture / Upload Image
      </Button>
    </>
  );
}