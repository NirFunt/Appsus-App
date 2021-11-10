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
    <h3> Note app </h3>
    <section class="notes-container">
   <component v-for="(note,index) in notes" :key="note.key"
   :is="note.type"
   :info="note.info"
   @onsomeemit="dosomethinghere($event,index)">
    </component>
    </section>
    
</section>
    `
    ,
    data() {
        return {
            notes: null,
        };
    },
    created() {
        noteService.query()
            .then(notes => this.notes = notes);
    },
    destroyed() {

    },
    methods: {

    },

}