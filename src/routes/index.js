import {Navigate}  from 'react-router-dom'
import Admin from '../pages/Admin'
import Login from '../pages/Login'

const routes = [
    {
        path:'/',
        element:<Navigate to="/login"/>
    },
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/admin',
        element:<Admin/>
    }
]

export default routes