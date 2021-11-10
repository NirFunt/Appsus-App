import homePage from './pages/home-page.cmp.js';
import aboutPage from './pages/about-page.cmp.js';
import noteApp from './apps/note-app/pages/note-app.cmp.js';

const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/about',
        component: aboutPage
    },
    {
        path: '/note',
        component: noteApp
    }
]

export const router = new VueRouter({ routes });