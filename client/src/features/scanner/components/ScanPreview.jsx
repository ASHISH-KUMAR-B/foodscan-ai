import Button from "../../../components/common/Button";

export default function ScanPreview({
  preview,
  loading,
  onAnalyze,
  onRemove,
}) {
  if (!preview) return null;

  return (
    <div className="mt-6 rounded-[28px] border border-slate-200/80 bg-slate-950 p-3 shadow-[0_24px_80px_-36px_rgba(15,23,42,0.5)]">
      <div className="overflow-hidden rounded-[22px] border border-white/10 bg-slate-900">
        <img
          src={preview}
          alt="Preview"
          className="max-h-[420px] w-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-3 border-t border-white/10 px-2 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-white">Image ready for scan</p>
          <p className="text-xs text-slate-400">
            Analyze to run OCR, ingredient parsing, and health scoring.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button onClick={onAnalyze} disabled={loading} size="lg">
            {loading ? "Analyzing..." : "Analyze image"}
          </Button>

          <Button
            type="button"
            variant="danger"
            onClick={onRemove}
            size="lg"
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}
