export default function Loader({ label = "Loading..." }) {
  return <div className="animate-pulse text-sm text-slate-500">{label}</div>;
}