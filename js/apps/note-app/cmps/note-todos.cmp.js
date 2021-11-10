export default {

    props: ['info','noteid'],
    template: `
<section class="note-todos">
<h3>{{info.label}} </h3>
<ul> <li v-for="todo in info.todos" :key="todo.id" @click="toggleDone(todo.id)" :class="{done:!todo.doneAt, undone:todo.doneAt}">
     {{todo.txt}} <button @click="removeListElement(todo.id)"> x </button>
</li> </ul>

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
        toggleDone(todoId) {
            // console.log(this.info.todos)
            // let todo = this.info.todos.find(todo => todo.id === todoId);
            // if (todo.doneAt = null) todo.doneAt = Date.now();
            // else if(todo.doneAt) todo.doneAt = null;
            this.$emit('toggleTodo', {noteId:this.noteid, todoId:todoId});
        },
        removeListElement(todoId) {
            this.$emit('removeTodo', {noteId:this.noteid, todoId:todoId})
        }
    },
    computed: {
        showTodo() {

        }
    }
}