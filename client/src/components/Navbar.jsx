import {Link} from "react-router-dom";


export default function Navbar(){

return (

<nav className="
hidden
md:flex
items-center
justify-between
px-8
py-4
bg-white
shadow
">


<h1 className="text-2xl font-bold text-green-600">

FoodScan AI

</h1>


<div className="flex gap-6">


<Link to="/dashboard">
Dashboard
</Link>


<Link to="/scan">
Scan
</Link>


<Link to="/history">
History
</Link>


<Link to="/profile">
Profile
</Link>


</div>


</nav>

);

}