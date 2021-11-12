import noteActions from './note-actions.cmp.js';

export default {
    components: {
       noteActions,
    },
    props: ['info','noteid'],
    template: `
<section class="note-img">
   <h3> {{info.title}} </h3>
   <img :src="info.url">
   <note-actions :info="info" :noteid="noteid" @removeNote="removeNote" @changeColor="changeColor"
   @pinned="pin" @edit="editNote" />

</section>
    `
    ,
    data() {
        return {
           
        };
    },
    created() {
  
    },
    destroyed() {
      
    },
    methods: {
        removeNote (noteid) {
          this.$emit('removeNote',noteid)
        },
        changeColor (color) {
            this.$emit('changeColor', color)
        },
        pin (noteId) {
            this.$emit('pinned', noteId)
        },
        editNote() {
            this.$emit('edit', this.noteid)
        },

    },
 
}