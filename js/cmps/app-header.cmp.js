
export default {
    components: {

    },

    template: `
        <section class="app-header">
        <h3 class="logo"> APPKEEPER </h3>
        <nav class="header-nav"> 
        <router-link to="/"> Home </router-link> |
        <router-link to="/book"> Books </router-link> |
        <router-link to="/email"> Email </router-link> |
        <router-link to="/note"> Note </router-link> |
        <router-link to="/about"> About </router-link> 
        </nav>
       
        </section>
    `,

    data() {
        return {

        };
    },
    created() {

    },
    methods: {

    },
    computed: {

    },
};