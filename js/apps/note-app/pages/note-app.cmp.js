import noteTxt from '../cmps/note-txt.cmp.js';
import noteImg from '../cmps/note-img.cmp.js';
import noteTodos from '../cmps/note-todos.cmp.js';
import noteVideo from '../cmps/note-video.cmp.js';

import { noteService } from '../services/note.service.js';

export default {
    components: {
        noteTxt,
        noteImg,
        noteTodos,
        noteVideo
    },

    template: `

    <section class="note-app">
    <button @click="showNewNoteModal"> +</button>

    <h2 v-if="!isNewNoteModal"> Pinned </h2>
    <section class="pinned-notes" v-if="!isNewNoteModal">
   <component v-for="(note,index) in pinnedNotes" :key="note.id" :class="note.info.color"
   :is="note.type"
   :info="note.info"
   :noteid="note.id"
 @removeTodo="removeTodo($event)" @removeNote="removeNote"
    @changeColor="changeColor" @pinned="pin" @toggleTodo="toggleTodo">
    </component>
    </section>

    <h2 v-if="!isNewNoteModal"> Not Pinned </h2>
        <section class="unpinned-notes" v-if="!isNewNoteModal">
   <component v-for="(note,index) in unpinnedNotes" :key="note.id" :class="note.info.color"
   :is="note.type"
   :info="note.info"
   :noteid="note.id"
   @removeTodo="removeTodo($event)" @removeNote="removeNote"
    @changeColor="changeColor"  @pinned="pin" @toggleTodo="toggleTodo" >
    </component>
    </section>

    <section>
        <h1> Add New Note </h1>
            <select v-model="selectedEmptyNote" @change="emptyNoteTypeChosen" >
                <option>Text</option>
                <option>Image</option>
                <option>Video</option>
                <option>Todos</option>
            </select>
            <button> Add </button>

            <div v-if="selectedEmptyNote==='Text'" >
            <input type="text" v-model="emptyNote.info.title">
            <input type="text" v-model="emptyNote.info.txt">
            </div>

            <div v-if="selectedEmptyNote==='Image'" >
                {{emptyNote}}
            <input type="text" v-model="emptyNote.info.url" >
            <input type="text" v-model="emptyNote.info.title">
            </div>
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
            emptyNote : null,

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
            //    console.log(noteid)
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
            this.isNewNoteModal = !this.isNewNoteModal;
        },
        emptyNoteTypeChosen() {
            let newNote = null;
            switch (this.selectedEmptyNote) {
                case 'Text' : {
                    newNote = noteService.getEmptyTxtNote();
                    break;
                }
                case 'Image' : {
                    newNote = noteService.getEmptyImgNote();
                    break;
                }
                case 'Video' : {
                    newNote = noteService.getEmptyVideoNote();
                    break;
                }
                case 'Todos' : {
                    newNote = noteService.getEmptyTodosNote();
                    break;
                }
            }
            this.emptyNote = newNote;
        }


    },



    // watch: {
    //     pinnedNotes: {
    //        handler(val){
    //         console.log(val);
    //        },
    //        deep: true
    //     }
    //   }

    // watch: {
    //     pinnedNotes: {
    //         handler() {
    //             noteService.query()
    //             .then(allNotes => {
    //                 this.pinnedNotes = allNotes.filter(note => note.isPinned);
    //                 this.unpinnedNotes = allNotes.filter(note => !note.isPinned);
    //             });
    //         },
    //         deep: true,
    //         immediate: true
    //     }
    // },



}