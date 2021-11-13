import noteActions from './note-actions.cmp.js';
import noteTodoPreview from './note-todo-preview.cmp.js';

export default {
    components: {
        noteActions,
        noteTodoPreview
    },
    props: ['info', 'noteid'],
    template: `
<section class="note-todos">
<h3>{{info.label}} </h3>
<ul> <li v-for="todo in info.todos" :key="todo.id" >
     <note-todo-preview :todo="todo" @toggleTodo="toggleTodo" @removeTodo="removeListElement"/>
</li> </ul>

<note-actions :info="info" :noteid="noteid" @removeNote="removeNote" @changeColor="changeColor"
@pinned="pin" @edit="editNote" @duplicate="duplicate"/>

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
        toggleTodo(todo) {
            this.$emit('toggleTodo', { todo: todo, noteid: this.noteid })
        },
        removeListElement(todoId) {
            this.$emit('removeTodo', { noteId: this.noteid, todoId: todoId })
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
        duplicate (noteId) {
            this.$emit ('duplicate', noteId);
        },
    },
    computed: {
    
    }
}