import noteActions from './note-actions.cmp.js';

export default {
    components: {
       noteActions,
    },
    props: ['info','noteid'],
    template: `
<section class="note-todos">
<h3>{{info.label}} </h3>
<ul> <li v-for="todo in info.todos" :key="todo.id" @click="toggleDone(todo.id)" :class="{done:!todo.doneAt, undone:todo.doneAt}">
     {{todo.txt}} <button @click.stop="removeListElement(todo.id)"> x </button>
</li> </ul>
<note-actions :info="info" :noteid="noteid" @removeNote="removeNote" @changeColor="changeColor"
@pinned="pin"/>
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
        toggleDone(todoId) {
            // console.log(this.info.todos)
            // let todo = this.info.todos.find(todo => todo.id === todoId);
            // if (todo.doneAt = null) todo.doneAt = Date.now();
            // else if(todo.doneAt) todo.doneAt = null;
            this.$emit('toggleTodo', {noteId:this.noteid, todoId:todoId});
        },
        removeListElement(todoId) {
            this.$emit('removeTodo', {noteId:this.noteid, todoId:todoId})
        },
        changeColor (color) {
            this.$emit('changeColor', color)
        },
        pin (noteId) {
            this.$emit('pinned', noteId)
        },
    },
    computed: {
        showTodo() {

        }
    }
}