import Home from '../pages/home'
import UserList from '../pages/user/index.tsx'
import UserForm from '../pages/user/edit.tsx'
import Login from '../pages/login.js'
import HomeIcon from '@mui/icons-material/Home'
import PersonIcon from '@mui/icons-material/Person'
import LoginIcon from '@mui/icons-material/Login'

import { RouteType } from './config'

const appRoutes: RouteType[] = [
  {
    index: true,
    path: '/',
    element: <Home />,
    state: 'home',
    sidebarProps: {
      displayText: 'Home',
      icon: <HomeIcon />,
    },
  },
  {
    path: '/user',
    element: <UserList />,
    state: 'userlist',
    sidebarProps: {
      displayText: 'user',
      icon: <PersonIcon />,
    },
    child: [
      {
        path: 'user/edit/:id',
        element: <UserForm />,
        state: 'userFormUpdate',
        sidebarProps: {
          displayText: 'update User',
        },
      },
      {
        path: 'user/add',
        element: <UserForm />,
        state: 'userFormAdd',
        sidebarProps: {
          displayText: 'create User',
        },
      },
    ],
  },

  {
    path: 'login',
    element: <Login />,
    state: 'login',
    sidebarProps: {
      displayText: 'Login',
      icon: <LoginIcon />,
    },
  },
]

export default appRoutes
