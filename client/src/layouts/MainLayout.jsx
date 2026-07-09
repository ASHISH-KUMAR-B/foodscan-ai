import Navbar from "../components/Navbar.jsx";
import MobileNav from "../components/MobileNav.jsx";


export default function MainLayout({children}){

return (

<div className="min-h-screen bg-gray-50">


<Navbar/>


<main className="pb-20 md:pb-0">

{children}

</main>


<MobileNav/>


</div>

);

}