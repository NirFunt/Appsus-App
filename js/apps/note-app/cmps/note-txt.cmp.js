import noteActions from './note-actions.cmp.js';

export default {
    components: {
       noteActions,
    },
    props: ['info','noteid'],
    template: `
<section class="note-txt">
<h4> {{info.title}} </h4>
<p> {{info.txt}} </p>
<note-actions :info="info" :noteid="noteid" @removeNote="removeNote" @changeColor="changeColor"
@pinned="pin" @edit="editNote"/>

<!-- <div>
<input type="text" v-model="updatedTitle">
<input type="text" v-model="updatedTxt">
</div> -->
</section>
    `
    ,
    data() {
        return {
            // updatedTitle : 'new title',
            // updatedTxt : 'new text'
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