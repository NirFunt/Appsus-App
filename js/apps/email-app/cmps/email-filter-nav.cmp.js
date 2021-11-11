import { utilService } from '../../../services/util.service.js';

export default {
    props: ['user'],
    template: `
    
<section class="filter-nav flex flex-column">
    <button @click="sendMsgModal=true">+</button>
    <button @click="filterInbox">inbox</button>
    <button>starred</button>
    <button @click="filterSent">sent</button>
    <button @click="filterTrash">trash</button>
    <button @click="filterDrafts">drafts</button>

    <div class="main-screen" v-if="sendMsgModal" @click.self="closeIfEmpty">
        <div class="email-modal">
            <section class="modal-header flex space-between">
                <p>New message</p>
                <button @click="closeIfEmpty">X</button>
            </section>
            <section class="send-modal-body flex flex-column">
                 <input type="text" placeholder="To" v-model="newMsg.to">
                 <input type="text" placeholder="Subject" v-model="newMsg.subject">
                 <textarea rows="4" cols="50" v-model="newMsg.body"></textarea>
                 <div class="send-btns flex space-between"> 
                     <button class="send-btn" @click="send">Send</button>
                     <button class="discard-btn">discard</button>
                  </div>
            </section>
        </div>
    </div>
    <div class="main-screen" v-if="draftModal" @click.self="closeWithoutSaving">
        <div class="draft-modal flex flex-column align-center justify-center">
            <p><strong>Save draft?</strong></p>
            <div class="draft-modal-actions">
                <button @click="closeWithSaving">Yes</button>
                <button @click="closeWithoutSaving">No</button>
            </div>
        </div>
    </div>

</section>
    `
    ,
    data() {
        return {
            filterBy: '',
            sendMsgModal: false,
            draftModal: false,
            newMsg: {
                id: utilService.makeId(),
                to: '',
                subject: '',
                body: '',
                status: ''
            }
        };
    },
    created() {

    },
    destroyed() {

    },
    methods: {
        filterTrash() {
            console.log('trashed');
            this.$emit('filter', 'trash');

        },
        filterInbox() {
            this.$emit('filter', 'inbox');
        },
        filterSent() {
            this.$emit('filter', 'sent')
        },
        filterDrafts() {
            this.$emit('filter', 'draft')

        },
        closeIfEmpty() {
            console.log(this.newMsg.to);
            if (this.newMsg.to || this.newMsg.subject || this.newMsg.body) {
                this.draftModal = true;

            } else this.sendMsgModal = false;
            this.clearMsg();



        },
        send() {
            this.newMsg.status = 'sent';
            console.log('sending....');
            this.$emit('send', this.newMsg)
            this.clearMsg();

        },
        closeWithoutSaving() {
            this.sendMsgModal = false;
            this.draftModal = false;
            this.clearMsg();

        },
        closeWithSaving() {
            this.newMsg.status = 'draft'
            this.$emit('send', this.newMsg);
            this.closeWithoutSaving();
            this.clearMsg();
        },
        clearMsg() {
            this.newMsg.to = '';
            this.newMsg.subject = '';
            this.newMsg.body = '';
        }


    },
    components: {
        utilService
    }

}