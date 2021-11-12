export default {

    props: ['info', 'noteid'],
    template: `
<section class="note-actions">
<section :class="showHide">
<div class="bcg-purple circle" @click="sendColor('bcg-purple')"> </div>
<div class="bcg-blue circle" @click="sendColor('bcg-blue')"> </div>
<div class="bcg-turquoise circle" @click="sendColor('bcg-turquoise')"> </div>
<div class="bcg-light-green circle" @click="sendColor('bcg-light-green')"> </div>
<div class="bcg-green circle" @click="sendColor('bcg-green')"> </div>
</section>

<section class="actions">
<div @click="pin">📌</div>
<div @click="changeColor" >🖌</div>
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
    computed : {
        showHide () {
            if (this.isColorPicker) return 'color-picker show';
            if (!this.isColorPicker) return 'color-picker hide';
        }
    }

}