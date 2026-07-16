import Button from "../../../components/common/Button";

export default function OCRResult({ text }) {
  if (!text) return null;

  const copyText = async () => {
    await navigator.clipboard.writeText(text);
  };

  return (
    <div className="mt-6 rounded-xl border bg-white p-5 shadow">

      <div className="mb-4 flex items-center justify-between">

        <h2 className="text-xl font-semibold">
          Extracted Text
        </h2>

        <Button
          type="button"
          onClick={copyText}
        >
          Copy
        </Button>

      </div>

      <pre className="max-h-80 overflow-auto whitespace-pre-wrap text-sm">
        {text}
      </pre>

    </div>
  );
}