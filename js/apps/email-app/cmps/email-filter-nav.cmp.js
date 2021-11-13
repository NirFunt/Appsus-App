import { utilService } from '../../../services/util.service.js';

export default {
    props: ['user', 'unreadMsgs'],
    template: `
     <!-- @mouseenter="expandNav" @mouseleave="diminishNav" -->
<section class="filter-nav flex flex-column align-center">
    <button  @click="sendMsgModal=true">+</button>
    <section class="flex relative">
    <button @click="filterInbox">
    <i class="fas fa-inbox"></i>
    <span class="msgs-left" v-if="unreadMsgs!=0">{{unreadMsgs}}</span>
    </button>
    </section>  
    <button @click="filterStarred">
    <i class="far fa-star"></i>
    <!-- <span>iconTxt.starred</span> -->
    </button>
    <button @click="filterSent">
    <i class="fas fa-paper-plane"></i>
    <!-- <span>iconTxt.sent</span> -->
    </button>
    <button @click="filterTrash">
    <i class="fas fa-trash"></i>
    <!-- <span>iconTxt.trash</span> -->
    </button>
    <button @click="filterDrafts">
    <i class="fas fa-file"></i>
    <!-- <span>iconTxt.draft</span> -->
    </button>
<!-- SORRY FOR WET CODE -->

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
            },
            iconTxt: {
                inbox: '',
                starred: '',
                sent: '',
                trash: '',
                draft: ''
            }
            // isHover: false
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
        filterStarred() {
            this.$emit('filter', 'starred')
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
    computed: {
        expandNav() {
            console.log('hovering bro');
            this.iconTxt = {
                inbox: 'Inbox',
                starred: 'Starred',
                sent: 'Sent',
                trash: 'Trash',
                draft: 'Draft'
            }
            return this.iconTxt
        },
        diminishNav() {
            console.log('whats the opposite of hovering bro')
            this.iconTxt = {
                inbox: '',
                starred: '',
                sent: '',
                trash: '',
                draft: ''
            }
            return this.iconTxt
        },
        countUnread() {
            console.log(this.emails);
            // var unreadMsgs = this.emails.map(function (email, count) {
            //     if (email.isRead) count++;
            //     return count
            // }, 0)
            // console.log(unreadMsgs);
            // return unreadMsgs

        }

    },
    components: {
        utilService
    }

}