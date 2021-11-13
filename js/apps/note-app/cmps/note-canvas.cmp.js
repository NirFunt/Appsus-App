import noteActions from './note-actions.cmp.js';

export default {
    components: {
        noteActions,
    },
    props: ['info', 'noteid'],
    template: `
<section class="note-canvas">
   <h3> {{info.title}} </h3>
   <div class="canvas-btns"> 
   <input type="color" v-model="gDrawValues.borderColor">
   <select v-model="gDrawValues.shape">
                <option value="line">Line</option>
                <option value="lines">Lines</option>
                <option value="rod">Rod</option>
                <option value="square">Square</option>
            </select>
            <button><a :href="saveUrl" @click="onSave(this)" download="">Save</a></button>
            </div>
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
            saveUrl : '',
            
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
        },  onDraw(ev) {
            var { offsetX, offsetY } = ev;
        
            switch (this.gDrawValues.shape) {
                case 'line':
                    this.drawLine(offsetX, offsetY);
                    break;
                case 'lines':
                    this.drawLines(offsetX, offsetY);
                    break;
                case 'rod':
                    this.drawLinePoles(offsetX, offsetY);
                    break;
                case 'square':
                    this.drawSquare(offsetX, offsetY, 100, 100);
                    break;
            }
        }
        , drawLine(startX, startY) {
            var endX = startX + 1;
            var endY = startY + 1;
            this.gCtx.beginPath();
            this.gCtx.moveTo(startX, startY);
            this.gCtx.lineTo(endX, endY);
            this.gCtx.lineWidth = 4;
            this.gCtx.strokeStyle = this.gDrawValues.borderColor;
            this.gCtx.stroke();
        }, drawLinePoles(startX, startY) {
            var endX = startX + 100;
            var endY = startY + 100;
            this.gCtx.beginPath();
            this.gCtx.moveTo(startX, startY);
            this.gCtx.lineTo(endX, endY);
            this.gCtx.lineWidth = 4;
            this.gCtx.strokeStyle = gDrawValues.borderColor;
            this.gCtx.stroke();
        },
        
         drawSquare(startX, startY, endX, endY) {
            this.gCtx.beginPath();
            this.gCtx.rect(startX, startY, 30, 30);
            this.gCtx.fillStyle = this.gDrawValues.shapeColor;
            this.gCtx.fillRect(startX, startY, 30, 30);
            this.gCtx.strokeStyle = this.gDrawValues.borderColor;
            this.gCtx.lineWidth = 4;
            this.gCtx.stroke();
        }, onSave(elLink) {
            const data = this.gElCanvas.toDataURL();
            this.saveUrl = data;
            elLink.download = 'canvas-download.jpeg';
        },
         drawLines(startX, startY) {
            this.drawLine(startX - 20, startY - 20);
            this.drawLine(startX - 30, startY - 30);
            this.drawLine(startX - 40, startY - 40);
            this.drawLine(startX, startY);
            this.drawLine(startX + 10, startY + 10);
            this.drawLine(startX + 20, startY + 30);
            this.drawLine(startX + 3, startY + 30);
        }, drawLinePoles(startX, startY) {
            var endX = startX + 50;
            var endY = startY + 50;
            this.gCtx.beginPath();
            this.gCtx.moveTo(startX, startY);
            this.gCtx.lineTo(endX, endY);
            this.gCtx.lineWidth = 4;
            this.gCtx.strokeStyle = this.gDrawValues.borderColor;
            this.gCtx.stroke();
        }



    },

}