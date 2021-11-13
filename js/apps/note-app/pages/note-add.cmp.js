import noteTxt from '../cmps/note-txt.cmp.js';
import noteImg from '../cmps/note-img.cmp.js';
import noteTodos from '../cmps/note-todos.cmp.js';
import noteVideo from '../cmps/note-video.cmp.js';

import {eventBus} from '../services/event-bus.service.js';

import { noteService } from '../services/note.service.js';

export default {
    components: {
        noteTxt,
        noteImg,
        noteTodos,
        noteVideo,
    },

    template: `
    <section class="note-add">

    <component :class="emptyNote.info.color" v-if="emptyNote"
   :is="emptyNote.type"
   :info="emptyNote.info"
   :noteid="emptyNote.id">
    </component>

    <section class="addEditWindow">
        <h1> Add New Note </h1>
            <select v-model="selectedEmptyNote" @change="emptyNoteTypeChosen" value="Video">
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
            <button @click="goBackToNote"> Go Back </button>
            </article>
    </section>

</section>
    `
    ,
    data() {
        return {
            isNewNoteModal: false,
            selectedEmptyNote: 'Video',
            emptyNote: null,
            emptyTodo: '',
            isEditModal: false,
        };
    },
    created() {
        this.emptyNote = noteService.getEmptyVideoNote();
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
            noteService.query()
                .then(notes =>  {
                    this.$router.push('/note');
                    // eventBus.$emit('showMsg',
                    //     {
                    //         txt: `a new note ${this.emptyNote.title} was added!`
                    //     })
                })
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
        updateNote() {
            this.isEditModal = false;
            this.isNewNoteModal = false;
            noteService.editNote(this.emptyNote)
            noteService.query()
                .then(notes => this.$router.push('/note'))

        },
        goBackToNote() {
            this.$router.push('/note')
        },
        convertEmail(emailParams) {
            this.selectedEmptyNote = 'Text'
            this.emptyNote = noteService.getEmptyTxtNote();
            let queryStrings = emailParams.split('&');
            let title = queryStrings[0].slice(6);
            let text = queryStrings[1].slice(5);
            this.emptyNote.info.title = title;
            this.emptyNote.info.txt = text;
            this.emptyNote.isPinned = true;
            this.addNote();
        }

    },
    watch: {
        '$route.params.noteId': {
            handler() {
                const { noteId } = this.$route.params;
                console.log(this.$route.params)
                if (this.$route.params.emailInfo) this.convertEmail(this.$route.params.emailInfo)
                if (!noteId) return;
                console.log('asdsad')
                this.editNote(noteId);
            },
            immediate: true
        },

    },

}
