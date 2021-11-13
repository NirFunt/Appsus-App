import noteActions from './note-actions.cmp.js';

export default {
    components: {
        noteActions,
    },
    props: ['info', 'noteid'],
    template: `
<section class="note-audio">
   <h3> {{info.title}} </h3>
   <audio controls >
  <source :src="info.url" type="audio/mpeg">
  </audio>
   <note-actions :info="info" :noteid="noteid" @removeNote="removeNote" @changeColor="changeColor"
   @pinned="pin" @edit="editNote" @duplicate="duplicate" />

 

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
        removeNote(noteid) {
            this.$emit('removeNote', noteid)
        },
        changeColor(color) {
            this.$emit('changeColor', color)
        },
        pin(noteId) {
            this.$emit('pinned', noteId)
        },
        editNote() {
            this.$emit('edit', this.noteid)
        },
        duplicate(noteId) {
            this.$emit('duplicate', noteId);
        },

    },

}