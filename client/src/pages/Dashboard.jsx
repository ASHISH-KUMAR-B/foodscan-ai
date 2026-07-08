import {
useAuth
}
from "../context/AuthContext.jsx";


export default function Dashboard(){


const {
logout
}=useAuth();



return (

<div className="p-8">


<h1 className="text-4xl font-bold">
FoodScan Dashboard
</h1>


<button

onClick={logout}

className="mt-5 bg-red-500 text-white px-5 py-2 rounded"

>

Logout

</button>


</div>

);

}