import { useRef } from "react";

import Button from "./common/Button.jsx";

export default function ImageUploader({ onSelect }) {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current?.click();
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
          const file = e.target.files?.[0];

          if (file) {
            onSelect(file);
          }
        }}
      />

      <Button type="button" onClick={handleClick}>
        Capture / Upload Image
      </Button>
    </>
  );
}