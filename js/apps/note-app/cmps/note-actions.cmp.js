export default {

    props: ['info', 'noteid'],
    template: `
<section class="note-actions">
<div @click="pin">📌</div>
<div @click="changeColor">🖌</div>
<div @click="sendAsMail">📩</div>
<div @click="addNote">📝</div>
<div @click="trash">🗑</div>

</section>
    `
    ,
    data() {
        return {

        };
    },
    created() {

    },
    destroyed() {

    },
    methods: {
        pin() {

        },
        changeColor() {

        },
        sendAsMail() {

        },
        addNote() {

        },
        trash() {
            this.$emit('removeNote',this.noteid)
        },
    },

}