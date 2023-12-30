import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router"


 const UserRoute =()=>{

const {user}=useSelector((store)=>store.user)

    return user===null ? <Outlet/>:<Navigate to='/' replace={true}/>
}
export default UserRoute;


