import {Navigate}  from 'react-router-dom'
import Admin from '../container/Admin'
import Login from '../container/Login'

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