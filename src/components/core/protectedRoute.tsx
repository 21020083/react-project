import { Navigate, Outlet } from 'react-router-dom'
interface ProtectedRouteInteface {
  user: any
  redirectPath: string
  children?: React.ReactNode
}
const ProtectedRoute = ({
  user,
  redirectPath,
  children,
}: ProtectedRouteInteface) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />
  }

  return children ? children : <Outlet />
}
export default ProtectedRoute
