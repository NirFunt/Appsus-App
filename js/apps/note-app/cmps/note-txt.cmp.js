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
<note-actions :info="info" :noteid="noteid" @removeNote="removeNote" @changeColor="changeColor"/>

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
        }
    },
 
}