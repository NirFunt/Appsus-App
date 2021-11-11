export default {

    props: ['todo'],
    template: `
<section class="note-todo-preview" :class="showTodoDone" @click="toggleTodo">
    {{todo.txt}}   <button @click.stop="removeListElement"> x </button>
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
        toggleTodo() {
            this.$emit('toggleTodo', this.todo);
        },
        removeListElement() {
            this.$emit('removeTodo', this.todo.id);
        }
    },

    computed: {
        showTodoDone() {
            if (this.todo.doneAt) return 'undone';
            if (!this.todo.doneAt) return 'done';
        }
    }

}