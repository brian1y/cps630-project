import { useAuthContext } from "./useAuthContext"
import { redirect } from "react-router-dom";

export const useLogout = () => {

    const {dispatch} = useAuthContext()

    const logout = () => {
        // remove user from local storage
        localStorage.removeItem('user')

        //dispatch logout
        dispatch({type: 'LOGOUT'})

        // redirect to login page
        redirect('http://localhost:3000/login')

    }

    return {logout}
}