import appHeader from "./apps/cmps/app-header.cmp.js"
import appFooter from "./apps/cmps/app-footer.cmp.js"

import {router} from "./routes.js";

const options = {
    el: '#app',
    router,
    components: {
        appHeader,
        appFooter
    },
    template: `
        <section>
            <app-header/>
            <!-- <user-msg/> -->
            <router-view/>
            <app-footer/>
        </section>
    `,

};

new Vue(options);