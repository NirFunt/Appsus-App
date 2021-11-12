import { bookService } from "../services/book.service.js";

import bookFilter from "../cmps/book-filter.cmp.js";
import bookList from "../cmps/book-list.cmp.js";


export default {
    components: {
        bookFilter,
        bookList,
    },
    template: `
        <section class="book-app">
        <router-link to="/bookadd" class="add-new-book"> <button> Add New Book </button> </router-link> 
        <book-filter @filtered="setFilter" v-if="showBooks"/> 
        <book-list :books="booksToShow" @selected="selectBook" @remove="removeBook" v-if="showBooks"/>
        </section>
    `,

    data() {
        return {
            books: [],
            filterBy: null,
            selectedBook: null,
            showBooks: true,
        };
    },
    created() {
        bookService.query()
        .then (booksList => this.books = booksList)
    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
        selectBook(bookId) {
            this.selectedBook = this.books.find(book => bookId === book.id);
            this.showBooks = false;
        },
        closeDetails() {
            this.showBooks = true;
        },
        removeBook(bookId) {
            bookService.removeBook(bookId)
            .then(()=> bookService.query()
            .then (booksList => this.books = booksList))

            // we must do .then after removing the book, and inside this .then do the query with its .this,
            //  the reason is that removebook returns promise, therefore it wait for resolve or reject, so the code
            // after the removeBook is contining progressing without waiting for removeBook to complelte becuase 
            // the JS engine knows that removeBook will return a promose will we deal with later when its ready on .this
            // therefore it continue the code without waiting and go with the code flow.
        }
    },
    computed: {
        booksToShow() {
            if(!this.filterBy) return this.books;
            var SearchedStr = this.filterBy.byName.toLowerCase();
            return this.books.filter(book => book.title.toLowerCase().includes(SearchedStr) &&
            book.listPrice.amount > this.filterBy.byLowPrice &&  book.listPrice.amount < this.filterBy.byHighPrice );
        
        }
    },

};

