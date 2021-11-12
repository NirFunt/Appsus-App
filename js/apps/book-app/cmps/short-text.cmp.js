
export default {
    components: {

    },
    props: ['description'],
    template: `
        <section class="short-text">
        <p> {{showShortDesc}} </p>
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
        showShortDesc () {
            var strArr = this.description.split(' ');
            return strArr.slice(0,9).join(' ');
            // return this.description.slice(1,5);
        }
        },
};