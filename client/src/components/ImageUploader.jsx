import { useRef } from "react";

import Button from "./common/Button.jsx";
import Card from "./common/Card.jsx";

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
    <Card className="border-dashed border-emerald-200/80 bg-white/75 p-5 sm:p-6">
      <input
        ref={inputRef}
        hidden
        type="file"
        accept={accept}
        capture={capture}
        onChange={handleChange}
      />

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-800">
            Step 1
          </span>

          <h2 className="mt-3 text-2xl font-bold text-slate-900">
            Upload a clear ingredient label
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Capture the nutrition panel or ingredient list in good light.
            The cleaner the image, the better the OCR and ingredient parsing.
          </p>
        </div>

        <Button type="button" onClick={handleClick} size="lg">
          Capture / Upload Image
        </Button>
      </div>
    </Card>
  );
}
