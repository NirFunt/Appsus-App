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
    <!-- <h3> Note app </h3> -->
   <component v-for="(note,index) in notes" :key="note.id" :class="note.info.color"
   :is="note.type"
   :info="note.info"
   :noteid="note.id"
  @toggleTodo="toggleTodo($event)" @removeTodo="removeTodo($event)" @removeNote="removeNote"
    @changeColor="changeColor" >
    </component>
  
</section>
    `
    ,
    data() {
        return {
            notes: null,
            color: '',
        };
    },
    created() {
        noteService.query()
            .then(notes => this.notes = notes);
    },
    destroyed() {

    },
    methods: {
        removeNote (noteid) {
           console.log(noteid)
           noteService.removeNote(noteid)
           .then (()=>noteService.query()
           .then(notes => this.notes = notes));
          },

        toggleTodo(noteIdAndTodoId) {
            noteService.toogleDone(noteIdAndTodoId)
            .then (()=>noteService.query()
            .then(notes => this.notes = notes));
        },
        removeTodo(noteIdAndTodoId) {
            noteService.removeToDo(noteIdAndTodoId)
            .then (()=>noteService.query()
            .then(notes => this.notes = notes));
        },
        changeColor (noteIdColor) {
            noteService.changeNoteColor(noteIdColor.noteId,noteIdColor.color)
            .then (()=>noteService.query()
            .then(notes => this.notes = notes));
        }
    },

    computed : {
      
    }


}