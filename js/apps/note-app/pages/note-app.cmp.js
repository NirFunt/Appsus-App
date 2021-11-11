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

    <section class="pinned-notes">
   <component v-for="(note,index) in pinnedNotes" :key="note.id" :class="note.info.color"
   :is="note.type"
   :info="note.info"
   :noteid="note.id"
  @toggleTodo="toggleTodo($event)" @removeTodo="removeTodo($event)" @removeNote="removeNote"
    @changeColor="changeColor" @pinned="pin">
    </component>
    </section>
    
        <section class="unpinned-notes">
   <component v-for="(note,index) in unpinnedNotes" :key="note.id" :class="note.info.color"
   :is="note.type"
   :info="note.info"
   :noteid="note.id"
  @toggleTodo="toggleTodo($event)" @removeTodo="removeTodo($event)" @removeNote="removeNote"
    @changeColor="changeColor"  @pinned="pin" >
    </component>
    </section>
  
</section>
    `
    ,
    data() {
        return {
            pinnedNotes : [],
            unpinnedNotes: [],
            color: '',
        };
    },
    created() {
      this.query();
    },
    destroyed() {

    },
    methods: {
        query () {
            noteService.query()
            .then(allNotes => {
                this.pinnedNotes = allNotes.filter(note => note.isPinned);
                this.unpinnedNotes = allNotes.filter(note => !note.isPinned);
            });
        },
        removeNote (noteid) {
        //    console.log(noteid)
           noteService.removeNote(noteid)
           .then (()=>this.query())
          },

        toggleTodo(noteIdAndTodoId) {
            noteService.toogleDone(noteIdAndTodoId)
            .then (()=>this.query())
        },
        removeTodo(noteIdAndTodoId) {
            noteService.removeToDo(noteIdAndTodoId)
            .then (()=>this.query())
        },
        changeColor (noteIdColor) {
            noteService.changeNoteColor(noteIdColor.noteId,noteIdColor.color)
            .then (()=>this.query())
        },
        pin(noteId) {
            noteService.changePinned(noteId)
            .then (()=>this.query())
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