import emailPreview from "./email-preview.cmp.js"
import searchBar from "./search-bar.cmp.js"

export default {
    props: ['emails', 'ifEmptyMsg'],
    template: `
        <section class="email-list flex flex-column" v-if=!isReadModal :filter="passDown">
        <search-bar/>
        <ul v-if=emails>
            <li v-for="email in emails" :key="email.id" class="email-preview-container flex flex-column" :class={read:email.isRead}>
                <email-preview :email="email" @click.native="openModal(email)"  @openModal="openModal" />
            </li>
        </ul>
        
        <div class="empty-msg flex flex-column" v-else>
            <img src="/img/empty.png">
            <p><strong>{{ifEmptyMsg}}</strong></p>
        </div>
        </section>

        <div class="main-screen" v-else @click.self="isReadModal=false">
        <div class="email-modal">
            <section class="modal-header flex space-between">
                <p>{{clickedMail.subject}}</p>
                <button @click="isReadModal=false">X</button>
            </section>
            <div class="from">
                <p>From:{{clickedMail.from}}</p>
            </div>
            <p>{{clickedMail.body}}</p>
        </div>
        </div>
    `
    ,
    data() {
        return {
            isReadModal: false,
            clickedMail: null
        };
    },
    created() {

    },
    destroyed() {

    },
    methods: {
        log() {
            console.log('Logging.....');
            this.isReadModal = true;

        },
        openModal(email) {
            this.isReadModal = true;
            this.clickedMail = email;

        },
        passDown(emailId) {
            console.log(emailId);
        }

    },
    components: {
        emailPreview,
        searchBar

    }

}