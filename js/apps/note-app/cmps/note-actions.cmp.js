export default {

    props: ['info', 'noteid'],
    template: `
<section class="note-actions">

<section class="color-picker" v-if="isColorPicker" @mouseleave="changeColor">
<div class="bcg-red circle" @click="sendColor('bcg-red')"> </div>
<div class="bcg-blue circle" @click="sendColor('bcg-blue')"> </div>
<div class="bcg-green circle" @click="sendColor('bcg-green')"> </div>
<div class="bcg-white circle" @click="sendColor('bcg-white')"> </div>
<div class="bcg-black circle" @click="sendColor('bcg-black')"> </div>
</section>

<section class="actions">
<div @click="pin">📌</div>
<div @mouseover="changeColor" >🖌</div>
<div @click="sendAsMail">📩</div>
<div @click="editNote">📝</div>
<div @click="trash">🗑</div>
</section>
</section>
    `
    ,
    data() {
        return {
            isColorPicker : false,
        };
    },
    created() {

    },
    destroyed() {

    },
    methods: {
        pin() {
            this.$emit('pinned',this.noteid)
        },
        changeColor() {
            this.isColorPicker = !this.isColorPicker;
        },
        sendAsMail() {

        },
        editNote() {
            this.$emit('edit', this.noteid)
        },
        trash() {
            this.$emit('removeNote',this.noteid)
        },
        sendColor (color) {
            this.$emit('changeColor', {noteId: this.noteid, color: color})
        }
    },

}