
export default {
    components: {

    },
    props:[],
    template: `
        <section class="note-filter">
        <input type="text" v-model="filterBy.name" @input="filter">

        <input type="checkbox" v-model="filterBy.isNoteText" @input="filter" >
        <label> Text </label>
        <input type="checkbox" v-model="filterBy.isNoteVideo" @input="filter" >
        <label> Video </label>
        <input type="checkbox" v-model="filterBy.isNoteImage" @input="filter" >
        <label> Image </label>
        <input type="checkbox" v-model="filterBy.isNoteTodos" @input="filter" >
        <label> Todos </label>
      
        </section>
    `,

    data() {
        return {
         filterBy : {name : '', isNoteText : true, isNoteVideo : true, isNoteImage : true, isNoteTodos : true},
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