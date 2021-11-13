import noteTxt from '../cmps/note-txt.cmp.js';
import noteImg from '../cmps/note-img.cmp.js';
import noteTodos from '../cmps/note-todos.cmp.js';
import noteVideo from '../cmps/note-video.cmp.js';
import noteFilter from '../cmps/note-filter.cmp.js';

import { noteService } from '../services/note.service.js';

export default {
    components: {
        noteTxt,
        noteImg,
        noteTodos,
        noteVideo,
        noteFilter
    },

    template: `
    <section class="note-app">
    <div class="add-note-filter">
    <note-filter @filtered="setFilter"/> 
    <button @click="showNewNoteModal"> New Note</button>
    </div>

    <h5> PINNED </h5>
    <section class="pinned-notes"  >
   <component v-for="(note,index) in pinnedNotes" :key="note.id" :class="note.info.color"
   :is="note.type"
   :info="note.info"
   :noteid="note.id"
 @removeTodo="removeTodo($event)" @removeNote="removeNote"
    @changeColor="changeColor" @pinned="pin" @toggleTodo="toggleTodo" @edit="editNote" @duplicate="duplicate">
    </component>
    </section>
<hr>
   
    <h5> OTHERS </h5>
        <section class="unpinned-notes" >
   <component v-for="(note,index) in unpinnedNotes" :key="note.id" :class="note.info.color"
   :is="note.type"
   :info="note.info"
   :noteid="note.id"
   @removeTodo="removeTodo($event)" @removeNote="removeNote"
    @changeColor="changeColor"  @pinned="pin" @toggleTodo="toggleTodo" @edit="editNote" @duplicate="duplicate" >
    </component>
    </section>

    <section v-if="isNewNoteModal" class="addEditWindow">
        <h1 v-if=!isEditModal> Add New Note </h1>
            <select v-model="selectedEmptyNote" @change="emptyNoteTypeChosen" v-if="!isEditModal" >
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
            <button @click="closeAddEditModal"> x </button>
            </article>
    </section>

</section>
    `
    ,
    data() {
        return {
            pinnedNotes: [],
            unpinnedNotes: [],
            isNewNoteModal: false,
            selectedEmptyNote: '',
            emptyNote: null,
            emptyTodo: '',
            isEditModal:false,
            filterBy: null,

        };
    },
    created() {
        this.query();
    },
    destroyed() {

    },
    methods: {
        query() {
            noteService.query()
                .then(allNotes => {
                    this.pinnedNotes = allNotes.filter(note => note.isPinned);
                    this.unpinnedNotes = allNotes.filter(note => !note.isPinned);
                });
        },
        removeNote(noteid) {
            noteService.removeNote(noteid)
                .then(() => this.query())
        },
        removeTodo(noteIdAndTodoId) {
            noteService.removeToDo(noteIdAndTodoId)
                .then(() => this.query())
        },
        changeColor(noteIdColor) {
            noteService.changeNoteColor(noteIdColor.noteId, noteIdColor.color)
                .then(() => this.query())
        },
        pin(noteId) {
            noteService.changePinned(noteId)
                .then(() => this.query())
        },
        toggleTodo({ todo, noteid }) {
            noteService.toogleDone(noteid, todo.id)
                .then(() => this.query())
        },

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
                .then(() => this.query())
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
            .then(() => this.query())
        },
        closeAddEditModal () {
            this.isNewNoteModal = false;
            this.isEditModal =false;
        },
        setFilter (filterBy) {
            this.filterBy = filterBy;
            console.log(this.filterBy)
            noteService.query(this.filterBy)
            .then(allNotes => {
                this.pinnedNotes = allNotes.filter(note => note.isPinned);
                this.unpinnedNotes = allNotes.filter(note => !note.isPinned);
            });
        },
        duplicate (noteId) {
            noteService.duplicateNote(noteId)
            .then(() => this.query())
        }
    },

}