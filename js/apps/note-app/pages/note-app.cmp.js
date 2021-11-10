import notePreview from '../cmps/note-preview.cmp.js';

import { noteService } from '../services/note.service.js';

export default {
    components: {
       notePreview ,
        
    },
    template: `
    
<section class="note-app">
    {{notes}}
    <h3> Note app </h3>
    <note-preview/>
</section>
    `
    ,
    data() {
        return {
            notes : null,
        };
    },
    created() {
        noteService.query()
        .then (notes => this.notes = notes);
    },
    destroyed() {
      
    },
    methods: {
     
    },
 
}