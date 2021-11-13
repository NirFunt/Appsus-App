
export default {
    components: {

    },
    props:[],
    template: `
        <section class="note-filter">
        <input type="text" v-model="filterBy.name" @input="filter">

        <input type="checkbox" v-model="filterBy.isNoteText" @click="filter" >
         Text 
        <input type="checkbox" v-model="filterBy.isNoteVideo" @click="filter" >
         Video 
        <input type="checkbox" v-model="filterBy.isNoteImage" @click="filter" >
         Image 
        <input type="checkbox" v-model="filterBy.isNoteTodos" @click="filter" >
         Todos 
        <input type="checkbox" v-model="filterBy.isNoteAudio" @click="filter" >
         Audio 
        <input type="checkbox" v-model="filterBy.isNoteCanvas" @click="filter" >
        Canvas 
      
        </section>
    `,

    data() {
        return {
         filterBy : {name : '', isNoteText : true, isNoteVideo : true, isNoteImage : true,
          isNoteTodos : true,isNoteAudio:true, isNoteCanvas: true }
        };
    },
    created() {

    },
    methods: {
        filter () {
            setTimeout ( () => {
                this.$emit('filtered',{... this.filterBy});
            } ,100)

        //   this.$emit('filtered',{... this.filterBy});  sufficent deep copy because object key are not object
        //   this.$emit('filtered',JSON.parse(JSON.stringify(filterObj))); very deep copy!!!, would copy object key which are object
        }
     
    },
    computed: {
   
    },
};