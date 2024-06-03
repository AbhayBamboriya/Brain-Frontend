import { useSelector } from 'react-redux'
import { useLocation , Navigate , Outlet} from 'react-router-dom'
function RequireAuth({ allowedRoles }){
    // use selector is used to take out data from state
    const { isLoggedIn } = useSelector((state)=>state.auth)
    const location = useLocation()
    console.log('reached');
    return isLoggedIn ? (
        <Outlet/>
    ) : isLoggedIn ? ( <Navigate to="/denied" />) : (<Navigate to="/"/>)
}
export default RequireAuth