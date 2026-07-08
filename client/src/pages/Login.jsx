import {
useState
}
from "react";


import {
loginUser
}
from "../services/authService.js";


import {
useAuth
}
from "../context/AuthContext.jsx";


import {
useNavigate
}
from "react-router-dom";



export default function Login(){


const navigate=useNavigate();

const {
login
}=useAuth();



const [form,setForm]=useState({

email:"",
password:""

});



const handleChange=(e)=>{

setForm({

...form,

[e.target.name]:
e.target.value

});

};



const handleSubmit=async(e)=>{

e.preventDefault();


try{


const data =
await loginUser(form);



login(
data.token
);



navigate(
"/dashboard"
);



}
catch(error){

alert(
error.response.data.message
);

}


};



return (

<div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">


<form

onSubmit={handleSubmit}

className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"


>


<h1 className="text-3xl font-bold mb-6">

Login

</h1>


<input

name="email"

placeholder="Email"

className="border p-3 w-full mb-3 rounded"

onChange={handleChange}

/>


<input

name="password"

type="password"

placeholder="Password"

className="border p-3 w-full mb-3 rounded"

onChange={handleChange}

/>



<button

className="bg-green-600 text-white w-full p-3 rounded"

>

Login

</button>


</form>


</div>

);

}