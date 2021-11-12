
export default {
    components: {

    },
    props:[],
    template: `
        <section class="note-filter">
        <input type="text" v-model="filterBy.name" @input="filter">
        <!-- <label> Low price
        <input type="range" min="0" max="200" v-model=filterObj.byLowPrice title="low price" @change="filter">
        {{filterObj.byLowPrice}} -->
     
        </section>
    `,

    data() {
        return {
         filterBy : {name : '', lowPrice: 10},
        };
    },
    created() {

    },
    methods: {
        filter () {
          this.$emit('filtered',{... this.filterBy}); // sufficent deep copy because object key are not object
        //   this.$emit('filtered',JSON.parse(JSON.stringify(filterObj))); very deep copy!!!, would copy object key which are object
        }
     
    },
    computed: {
   
    },
};