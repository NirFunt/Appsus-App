import { bookService } from "../services/book.service.js";

export default {
    template: `
<section class="book-add">
     <section class="search-book-header"> 
     <h3> Search For New Books </h3>
     <div>
     <input type="text" v-model="searchedInput" >
     <button @click="goSearch"> Search </button>
    </div>
     </section>

     <ul class="new-book-search-list" v-if="googleBooks"> <li v-for="book in googleBooks"> 
     <p>{{book.volumeInfo.title}} </p>
     <img :src="book.volumeInfo.imageLinks.thumbnail">
     <button @click="addGoogleBook(book)"> Add New Book </button> 
     </li> 
    </ul>

</section>
    `,
    data() {
        return {
            searchedInput: 'funny',
            googleBooks: ''
        };
    },
    created() {
        this.goSearch();
    },
    destroyed() {

    },
    methods: {
        goSearch() {
            console.log(this.searchedInput);
            bookService.getFromAPI(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${this.searchedInput}`,this.searchedInput)
            .then(googleBooks => {
                console.log(googleBooks);
                this.googleBooks = googleBooks.items;
            });
        },
        addGoogleBook (book) {
            console.log(book);
            this.googleBooks = this.googleBooks.filter(googleBook => googleBook.id !== book.id);
            bookService.addGoogleBook(book);
        }
    },

}