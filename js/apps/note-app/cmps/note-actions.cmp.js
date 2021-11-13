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
<div @click="pin" title="Pin">📌</div>
<div @click="changeColor" title="Color" >🖌</div>
<div @click="sendAsMail" title="Email">📩</div>
<div @click="editNote" title="Edit">📝</div>
<div @click="trash" title="Trash">🗑</div>
<div @click="duplicateNote" title="Duplicate"> 🧬 </div>
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
        },
        duplicateNote () {
            this.$emit('duplicate', this.noteid)
        }
    },
    computed : {
        showHide () {
            if (this.isColorPicker) return 'color-picker show';
            if (!this.isColorPicker) return 'color-picker hide';
        }
    }

}