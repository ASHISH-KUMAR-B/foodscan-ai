export default function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`rounded-lg bg-green-600 px-4 py-2 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}