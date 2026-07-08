export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-green-50 px-4">
      <h1 className="text-5xl font-bold text-green-700">
        FoodScan AI
      </h1>

      <p className="mt-4 text-center text-gray-700 max-w-xl">
        Scan food ingredient labels using your phone or upload an image
        from your laptop to analyze ingredient safety, health score,
        and country-wise bans.
      </p>

      <button className="mt-8 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
        Scan Product
      </button>
    </div>
  );
}