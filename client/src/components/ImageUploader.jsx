import { useRef } from "react";
import { useTranslation } from "react-i18next";

import Button from "./common/Button.jsx";
import Card from "./common/Card.jsx";

export default function ImageUploader({
  onSelect,
  accept = "image/*",
  capture = "environment",
}) {
  const inputRef = useRef(null);
  const { t } = useTranslation();

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
            {t("imageUploader.step1")}
          </span>

          <h2 className="mt-3 text-2xl font-bold text-slate-900">
            {t("imageUploader.title")}
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            {t("imageUploader.description")}
          </p>
        </div>

        <Button type="button" onClick={handleClick} size="lg">
          {t("imageUploader.cta")}
        </Button>
      </div>
    </Card>
  );
}