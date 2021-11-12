import longText from "../cmps/long-text.cmp.js";
import shortText from "../cmps/short-text.cmp.js";
import reviewAdd from "../cmps/review-add.cmp.js";

import { bookService } from "../services/book.service.js";

export default {
    components: {
        longText,
        shortText,
        reviewAdd,
    },
    template: `
        <section class="book-details" v-if="book">
        <div>  {{detailsToShow}}  | {{oldToShow}}</div>
        <img :src="book.thumbnail" :title=showIfForSell>

        <long-text :description="book.description" v-if="isShowMore"/>
        <short-text :description="book.description" v-if="!isShowMore"/>
        <div>
        <button @click="showMore" v-if="!isShowMore"> Show More </button>
        <button @click="showLess" v-if="isShowMore"> Show Less </button>
        </div>
        
        <review-add :book="book" @reviewFinished="saveReview" />
        
        <div>

        <router-link :to="'/details/'+previousBookId">Previous  </router-link>|
        <router-link :to="'/details/'+nextBookId">Next  </router-link>|
        <router-link to="/book"> Go Back </router-link>
        </div>
        </section>
    `,

    data() {
        return {
            isShowMore: false,
            book: null,
            previousBookId: '',
            nextBookId: ''
        };
    },
    created() {
        // const bookId = this.$route.params.bookId;
        // bookService.getBookById(bookId)
        //     .then (book => {
        //         this.book = book
        //         this.previousBookId = bookService.getPreviousBookId(this.book.id);
        //         this.nextBookId = bookService.getNextBookId(this.book.id);
        //     });
    },
    methods: {
        showMore() {
            this.isShowMore = true;
        },
        showLess() {
            this.isShowMore = false;
        },
        saveReview(book) {
            bookService.putBook(book);
        },
    },

    watch: {
        '$route.params.bookId': {
            handler() {
                const { bookId } = this.$route.params;
                bookService.getBookById(bookId)
                    .then(book => {
                        this.book = book
                        bookService.getPreviousBookId(this.book.id)
                            .then(previousId => this.previousBookId = previousId);
                        bookService.getNextBookId(this.book.id)
                            .then(nextId => this.nextBookId = nextId);
                    });
            },
            immediate: true
        }
    },
    computed: {
        detailsToShow() {
            if (this.book.pageCount >= 500) return 'Long Reading';
            else if (this.book.pageCount >= 200 & this.book.pageCount < 500) return 'Decent Reading';
            else return 'Light Reading';
        },
        oldToShow() {
            var theYear = new Date().getFullYear();
            if (theYear - this.book.publishedDate <= 10) return 'New!';
            if (theYear - this.book.publishedDate > 10) return 'Veteran Book';
        },
        showIfForSell() {
            if (this.book.listPrice.isOnSale) return 'Book For Sale';
            else return 'Out of Order';
        }
    },
};