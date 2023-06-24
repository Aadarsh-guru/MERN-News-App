import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'

const DashboardRoutes = () => {

    const { auth } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('auth'))
        if (!token) {
            navigate('/')
        }
        // eslint-disable-next-line
    }, [auth])
    return (
        <Outlet />
    )
}

export default DashboardRoutes;