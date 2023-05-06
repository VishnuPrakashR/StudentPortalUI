import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

const Signout = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        localStorage.clear();
        navigate("/login")
    },[navigate])
    return(
        <>Signing out</>
    )
}
export default Signout