export default {

    props: ['info'],
    template: `
<section class="note-img">
   <h3> {{info.title}} </h3>
   <img :src="info.url">
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