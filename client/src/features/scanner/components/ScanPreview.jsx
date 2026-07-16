import Button from "../../../components/common/Button";

export default function ScanPreview({
  preview,
  loading,
  onAnalyze,
  onRemove,
}) {
  if (!preview) return null;

  return (
    <div className="mt-6">

      <img
        src={preview}
        alt="Preview"
        className="rounded-xl shadow"
      />

      <div className="mt-4 flex gap-3">

        <Button
          onClick={onAnalyze}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze"}
        </Button>

        <Button
          type="button"
          className="bg-red-500 hover:bg-red-600"
          onClick={onRemove}
        >
          Remove
        </Button>

      </div>

    </div>
  );
}