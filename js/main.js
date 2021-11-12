import appHeader from "./cmps/app-header.cmp.js"
import appFooter from "./cmps/app-footer.cmp.js"
import userMsg from "./apps/book-app/cmps/user-msg.cmp.js";
import { router } from "./routes.js";

const options = {
    el: '#app',
    router,
    components: {
        appHeader,
        appFooter,
        userMsg
    },
    template: `
        <section class="main-section">
            <app-header/>
            <user-msg/>
            <router-view/>
            <app-footer/>
        </section>
        
    `,

};

new Vue(options);