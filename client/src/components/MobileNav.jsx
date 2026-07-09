import {Link} from "react-router-dom";


export default function MobileNav(){

return (

<div
className="
fixed
bottom-0
left-0
right-0
md:hidden
bg-white
border-t
flex
justify-around
py-3
"
>


<Link to="/dashboard">
🏠
</Link>


<Link to="/scan">
📷
</Link>


<Link to="/history">
📜
</Link>


<Link to="/profile">
👤
</Link>


</div>

);

}