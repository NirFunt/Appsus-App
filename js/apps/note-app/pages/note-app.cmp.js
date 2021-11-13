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
    <router-link to="/noteadd" class="add-new-note222"> <button> Add New Note </button> </router-link>
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

    </section>

</section>
    `
    ,
    data() {
        return {
            pinnedNotes: [],
            unpinnedNotes: [],
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
        editNote(noteId) {
            this.$router.push('/noteadd/'+noteId);
        }
        ,setFilter (filterBy) {
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

