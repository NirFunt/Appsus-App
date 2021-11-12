import bookPreview from "./book-preview.cmp.js"
 
export default {
    components: {
        bookPreview,
    },
    props: ['books'],
    template: `
        <section class="book-list">
            <ul>  
                <li v-for="book in books" :key ="book.id"> 
                    <book-preview :book="book" @remove="removeBook"/>
                </li>
            </ul>
        </section>
    `,

    data() {
        return {

        };
    },
    created() {

    },
    methods: {
        onBookClicked(bookId) {
            this.$emit('selected',bookId);
        },
        removeBook (bookId) {
            this.$emit('remove',bookId);
        }

    },
    computed: {

    },
};

