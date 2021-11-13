import homePage from './pages/home-page.cmp.js';
import aboutPage from './pages/about-page.cmp.js';
import noteApp from './apps/note-app/pages/note-app.cmp.js';
import noteAdd from './apps/note-app/pages/note-add.cmp.js';
import emailApp from './apps/email-app/pages/email-app.cmp.js';


import bookApp from './apps/book-app/pages/book-app.cmp.js';
import bookDetails from './apps/book-app/pages/book-details.cmp.js';
import bookAdd from './apps/book-app/pages/add-book.cmp.js';

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
    },
    {
        path : '/noteadd',
        component :noteAdd
    },
    {
        path: '/noteadd/:noteId',
        component: noteAdd
    },
    {
        path: '/noteadd/convertemail/:emailInfo',
        component: noteAdd
    },
    {
        path: '/email',
        component: emailApp
    },
    {
        path: '/email/convertnote/:noteInfo',
        component: emailApp
    },
    {
        path: '/book',
        component: bookApp
    },
    {
        path: '/details/:bookId',
        component: bookDetails
    },
    {
        path: '/bookadd',
        component: bookAdd
    }




]

export const router = new VueRouter({ routes });