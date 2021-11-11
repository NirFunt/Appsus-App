import noteActions from './note-actions.cmp.js';

export default {
    components: {
       noteActions,
    },
    props: ['info','noteid'],
    template: `
<section class="note-txt">

<p> {{info.txt}} </p>
<note-actions :info="info" :noteid="noteid" @removeNote="removeNote"/>

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
    },
 
}