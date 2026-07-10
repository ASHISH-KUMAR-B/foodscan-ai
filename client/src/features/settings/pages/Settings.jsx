export default function Settings() {
	return (
		<div className="p-6">
			<h1 className="text-3xl font-bold">Settings</h1>

			<div className="mt-5 rounded-xl bg-white p-5 shadow">
				<p>Language</p>

				<select className="mt-2 border p-2">
					<option>English</option>
					<option>Hindi</option>
				</select>
			</div>
		</div>
	);
}

