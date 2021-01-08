import { Home } from './pages/Home.jsx'
import { ToyApp } from './pages/ToyApp.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { ToyUpdate } from './pages/ToyUpdate.jsx'
import { About } from './pages/About.jsx'

export const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/toy',
        component: ToyApp,
    },
    {
        path: '/toy/update/:toyId?',
        component: ToyUpdate,
    },
    {
        path: '/toy/:toyId',
        component: ToyDetails,
    },
    {
        path: '/about',
        component: About,
    }
]