export default {

    props: ['info'],
    template: `
<section class="note-todos">
{{info.label}}
<ul> <li v-for="todo in info.todos"> {{todo.txt}} </li>
</ul>


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