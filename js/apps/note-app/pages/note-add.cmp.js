import { noteService } from '../services/note.service.js';

export default {
    components: {
    },

    template: `
    <section class="note-add">

    <router-link to="/noteadd" class="add-new-note222"> <button> Add New Note </button> </router-link>

    <section class="addEditWindow">
        <h1> Add New Note </h1>
            <select v-model="selectedEmptyNote" @change="emptyNoteTypeChosen" value="Text">
                <option>Text</option>
                <option>Image</option>
                <option>Video</option>
                <option>Todos</option>
            </select>

            <div v-if="selectedEmptyNote==='Text'" >
            <label> Enter Title </label>
            <input type="text" v-model="emptyNote.info.title">
            <label> Enter Text </label>
            <input v-model="emptyNote.info.txt"> 
            </div>

            <div v-if="selectedEmptyNote==='Image'" >
            <label> Enter Image Title </label>
            <input type="text" v-model="emptyNote.info.title">
            <label> Enter Image Url </label>
            <input type="text" v-model="emptyNote.info.url" >
            </div>

            <div v-if="selectedEmptyNote==='Video'" >
            <label> Enter Video Title </label>
            <input type="text" v-model="emptyNote.info.label">
            <label> Add Video Code </label>
            <input type="text" v-model="emptyNote.info.url" >
            </div>

            <div v-if="selectedEmptyNote==='Todos'" >
            <label> Enter Label  </label>
            <input type="text" v-model="emptyNote.info.label" >
            <label> Enter New Todo  </label>
            <input type="text" v-model="emptyTodo.txt" >
            <button @click="getEmptyTodo" class="add-edit-todo-btn" > Add Todo </button>
           
            <ul> <li v-for="todo in emptyNote.info.todos" class="todo-list-add"> {{todo.txt}}
            <button @click="removeTempTodo(todo.id)">x</button></li></ul>
            </div>

            <article class="add-edit-buttons">
            <button @click="addNote" v-if="!isEditModal"> Add </button>
            <button @click="updateNote" v-if="isEditModal"> Update </button>
            <button @click="closeAddEditModal"> Go Back </button>
            </article>
    </section>

</section>
    `
    ,
    data() {
        return {
            isNewNoteModal: false,
            selectedEmptyNote: '',
            emptyNote: null,
            emptyTodo: '',
            isEditModal:false,
        };
    },
    created() {
       
    },
    destroyed() {

    },
    methods: {
        showNewNoteModal() {
            this.isNewNoteModal = true;
            this.selectedEmptyNote = "Text";
            this.emptyNote = noteService.getEmptyTxtNote();
        },
        emptyNoteTypeChosen() {
            let newNote = null;
            switch (this.selectedEmptyNote) {
                case 'Text': {
                    newNote = noteService.getEmptyTxtNote();
                    break;
                }
                case 'Image': {
                    newNote = noteService.getEmptyImgNote();
                    break;
                }
                case 'Video': {
                    newNote = noteService.getEmptyVideoNote();
                    break;
                }
                case 'Todos': {
                    newNote = noteService.getEmptyTodosNote();
                    this.emptyTodo = noteService.getEmptyTodo()
                    break;
                }
            }
            this.emptyNote = newNote;
        },
        getEmptyTodo() {
            this.emptyNote.info.todos.push(this.emptyTodo);
            this.emptyTodo = noteService.getEmptyTodo();
        },

        addNote() {
            this.isNewNoteModal = false;
            if (this.emptyNote) noteService.addNote(this.emptyNote)
            this.$router.push('/note');
        },
        removeTempTodo(todoId) {
            console.log(todoId)
            this.emptyNote.info.todos = this.emptyNote.info.todos.filter(todo => todo.id !== todoId);
        },
        editNote(noteId) {
            const note = noteService.getNoteById(noteId)
                .then(note => {
                    console.log(note)
                    this.emptyNote = note;
                    if (note.type === 'note-txt') {
                        this.selectedEmptyNote = 'Text'
                    } else if (note.type === 'note-video') {
                        this.selectedEmptyNote = 'Video'
                    } else if (note.type === 'note-img') {
                        this.selectedEmptyNote = 'Image'
                    } else if (note.type === 'note-todos') {
                        this.selectedEmptyNote = 'Todos'
                        this.emptyTodo = noteService.getEmptyTodo()
                    }
                    this.isEditModal = true;
                    this.isNewNoteModal = true;
                })
        },
        updateNote () {
            this.isEditModal = false;
            this.isNewNoteModal = false;
            noteService.editNote (this.emptyNote)
            noteService.query()
            .then(notes =>this.$router.push('/note'))
            
        },
        closeAddEditModal () {
            this.isNewNoteModal = false;
            this.isEditModal =false;
        },

    },
    watch: {
        '$route.params.noteId': {
            handler() {
                const { noteId } = this.$route.params;
                console.log('no note id')
                if (!noteId) return;
                this.editNote(noteId);
            },
            immediate: true
        }
    },

}
