import { eventBus } from '../services/event-bus.service.js';

export default {
    components: {

    },
    props: ['book'],
    template: `
        <section class="review-add">
       <form class="review-form" @submit.prevent="saveReview">
        <label> Your name </label>
        <input type="text" placeholder="Full Name" v-model="fullName" ref="nameInput">
        <label> Book rate </label>
        <select v-model="rate">
            <option value="1"> 1 </option>
            <option value="2"> 2 </option>
            <option value="3"> 3 </option>
            <option value="4"> 4 </option>
            <option value="5"> 5 </option>
        </select>
        <label> Pick a date </label>
        <input type="date" v-model="readAt">
        <label> Enter text </label>
        <textarea v-model="txt" class="review-text-box"> </textarea>
        <div> Book Reviews </div>
        <ul v-if="reviews"> <li v-for="review in reviews" @click="loadReview(review.id)" >
             {{review.fullName}} <button type="button" @click.stop="deleteReview(review.id)">x</button> </li>
        </ul>       
        <button>Submit</button> 
        
       </form>
        </section>
    `,

    data() {
        return {
            fullName: 'Books Reader',
            rate: 0,
            readAt: (new Date).toLocaleDateString(),
            txt: '',
            reviews: [],
        };
    },
    created() {
        // console.log(this.book);
        if (this.book.reviews) {
            this.reviews = this.book.reviews;
        }
    },
    mounted() {
        var elNameInput = this.$refs.nameInput;
        elNameInput.style.color = 'red';
    },
    methods: {
        saveReview() {
            var review = { id: Date.now() % 1000, fullName: this.fullName, rate: this.rate, readAt: this.readAt, txt: this.txt }
            if (this.book.reviews) this.book.reviews.push(review);
            else {
                this.book.reviews = [review];
            }
            this.$emit('reviewFinished', this.book);
            // window.location.href = "/index.html#/book";
            this.$router.push('/book');
            eventBus.$emit('showMsg',
                {
                    txt: `review by <span> ${review.fullName} </span> was added to the book <span> ${this.book.title} </span>!`,
                    type: 'success', url: `/details/${this.book.id}`
                })
        },

        loadReview(reviewId) {
            var review = this.book.reviews.find(review => review.id === reviewId);
            this.fullName = review.fullName;
            this.rate = review.rate;
            this.readAt = review.readAt;
            this.txt = review.txt;
        },
        deleteReview(reviewId) {
            var index = this.book.reviews.findIndex(review => review.id === reviewId);
            this.book.reviews.splice(index, 1);
            this.$emit('reviewFinished', this.book)
        }
    },

    watch: {
        'book': {
            handler() {
                if (this.book.reviews) {
                    this.reviews = this.book.reviews;
                }
            },
            immediate: true
        }
    },
    computed: {
        showReadAt() {

        }
    },
};