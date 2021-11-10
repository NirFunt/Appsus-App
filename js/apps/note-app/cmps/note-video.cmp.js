export default {

    props: ['info'],
    template: `
<section class="note-video">
 
<h3>{{info.label}} </h3>
<iframe width="170" height="100":src="info.url"></iframe>


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