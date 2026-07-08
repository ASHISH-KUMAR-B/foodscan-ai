import {
useState
}
from "react";

import {
registerUser
}
from "../services/authService.js";


export default function Register(){


const [form,setForm]=useState({

name:"",
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


await registerUser(form);


alert(
"Registration successful"
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
Create Account
</h1>



<input

name="name"

placeholder="Name"

className="border p-3 w-full mb-3 rounded"

onChange={handleChange}

/>



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

Register

</button>


</form>


</div>

);

}