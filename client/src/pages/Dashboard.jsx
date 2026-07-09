export default function Dashboard(){

return (

<div className="p-6">


<h1 className="text-3xl font-bold">
Welcome to FoodScan AI
</h1>



<div className="
grid
grid-cols-1
md:grid-cols-3
gap-5
mt-8
">


<div className="bg-white p-6 rounded-xl shadow">

<h2 className="font-bold">
Total Scans
</h2>

<p className="text-4xl">
0
</p>

</div>



<div className="bg-white p-6 rounded-xl shadow">

<h2 className="font-bold">
Healthy Foods
</h2>

<p className="text-4xl">
0
</p>

</div>



<div className="bg-white p-6 rounded-xl shadow">

<h2 className="font-bold">
Warnings
</h2>

<p className="text-4xl">
0
</p>

</div>



</div>



<button
className="
mt-10
bg-green-600
text-white
px-8
py-4
rounded-xl
text-lg
"
>

Scan New Product

</button>


</div>

);

}