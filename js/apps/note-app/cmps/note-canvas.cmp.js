import noteActions from './note-actions.cmp.js';

export default {
    components: {
        noteActions,
    },
    props: ['info', 'noteid'],
    template: `
<section class="note-canvas">
   <h3> {{info.title}} </h3>
   <section class="canvas-container">
            <canvas class="main-canvas" height="150" width="250" ref="theCanvas"></canvas>
        </section>
   <note-actions :info="info" :noteid="noteid" @removeNote="removeNote" @changeColor="changeColor"
   @pinned="pin" @edit="editNote" @duplicate="duplicate" />

</section>
    `
    ,
    data() {
        return {
            gElCanvas: null,
            gCtx: null,
            gDrawValues: {
                shapeColor: 'black',
                borderColor: 'black',
                shape: 'line',
                isClicked: false
            },
        };
    },
    mounted() {
        this.gElCanvas = this.$refs.theCanvas;
        this.gCtx = this.gElCanvas.getContext('2d');
        // resizeCanvas();
        this.addEventListeners();
    },
    destroyed() {

    },
    methods: {
        removeNote(noteid) {
            this.$emit('removeNote', noteid)
        },
        changeColor(color) {
            this.$emit('changeColor', color)
        },
        pin(noteId) {
            this.$emit('pinned', noteId)
        },
        editNote() {
            this.$emit('edit', this.noteid)
        },
        duplicate(noteId) {
            this.$emit('duplicate', noteId);
        },
        addEventListeners() {
            this.gElCanvas.addEventListener('mousedown', this.onDown);
            this.gElCanvas.addEventListener('mousemove', this.onMove);
            this.gElCanvas.addEventListener('mouseup', this.onUp);

            this.gElCanvas.addEventListener('mouseleave', this.onUp);

            this.gElCanvas.addEventListener('touchstart', this.onDown);
            this.gElCanvas.addEventListener('touchmove', this.onMove);
            this.gElCanvas.addEventListener('touchend', this.onUp);

            // window.addEventListener('resize', () => {
            //     resizeCanvas();
            // });
        },
        onDown({ offsetX, offsetY }) {
            this.gDrawValues.isClicked = true;
            console.log('down')
        },
        onMove(ev) {
            if (this.gDrawValues.isClicked) this.onDraw(ev);
            console.log('move')
        },
        onUp() {
            this.gDrawValues.isClicked = false;
            console.log('up')
        }, onDraw(ev) {
            var { offsetX, offsetY } = ev;
            this.drawLine(offsetX, offsetY);
        }, drawLine(startX, startY) {
            var endX = startX + 1;
            var endY = startY + 1;
            this.gCtx.beginPath();
            this.gCtx.moveTo(startX, startY);
            this.gCtx.lineTo(endX, endY);
            this.gCtx.lineWidth = 4;
            this.gCtx.strokeStyle = this.gDrawValues.borderColor;
            this.gCtx.stroke();
        }



    },

}