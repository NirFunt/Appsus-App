
export default {
    components: {

    },
    props:[],
    template: `
        <section class="book-filter">
        <label> Search book
        <input type="text" v-model="filterObj.byName" @input="filter">
        </label>
        <label> Low price
        <input type="range" min="0" max="200" v-model=filterObj.byLowPrice title="low price" @change="filter">
        {{filterObj.byLowPrice}}
        </label>
        <label>High price
        <input type="range" min="0" max="200" v-model=filterObj.byHighPrice title="high price" @change="filter">
        {{filterObj.byHighPrice}}
        </label>
        </section>
    `,

    data() {
        return {
         filterObj : {byName : '', byLowPrice: 10,byHighPrice: 190},
        };
    },
    created() {

    },
    methods: {
        filter () {
          this.$emit('filtered',{... this.filterObj}); // sufficent deep copy because object key are not object
        //   this.$emit('filtered',JSON.parse(JSON.stringify(filterObj))); very deep copy!!!, would copy object key which are object
        }
     
    },
    computed: {
   
    },
};