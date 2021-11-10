export default {

    props: ['info'],
    template: `
<section class="note-video">
{{info.label}}
<iframe width="130" height="80"
:src="info.url">
</iframe>




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
     
    },
 
}