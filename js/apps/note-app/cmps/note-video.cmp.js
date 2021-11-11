import noteActions from './note-actions.cmp.js';

export default {
    components: {
       noteActions,
    },
    props: ['info','noteid'],
    template: `
<section class="note-video">
 
<h3>{{info.label}} </h3>
<iframe width="170" height="100":src="info.url"></iframe>
<note-actions :info="info" :noteid="noteid" @removeNote="removeNote" @changeColor="changeColor"
@edit="editNote"
@pinned="pin"/>

            <!-- <div  >
            <input type="text" v-model="updatedUrl" >
            <input type="text" v-model="updatedLabel">
            </div> -->

</section>
    `
    ,
    data() {
        return {
            // updatedUrl : 'New url',
            // updatedLabel : 'New label'
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