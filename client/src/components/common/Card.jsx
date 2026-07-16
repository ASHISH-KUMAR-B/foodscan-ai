export default function Card({ children, className = "" }) {
  return (
    <div className={`rounded-[28px] border border-white/70 bg-white/85 shadow-[0_24px_80px_-36px_rgba(15,23,42,0.4)] backdrop-blur ${className}`}>
      {children}
    </div>
  );
}
