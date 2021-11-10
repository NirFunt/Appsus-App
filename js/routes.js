import homePage from './pages/home-page.cmp.js';
import aboutPage from './pages/about-page.cmp.js';

const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/about',
        component: aboutPage
    },
]

export const router = new VueRouter({ routes });