import { emailService } from "../services/email-service.js";
import emailFilterNav from "../cmps/email-filter-nav.cmp.js";
import emailList from "../cmps/email-list.cmp.js";

export default {
    template: `    
<section class="email-app flex space-between">
    <email-filter-nav @filter="setFilter" @send="sendMessage" :user="user"/>
    <email-list :emails="emails" @trash="moveToTrash" v-if="emails" />
    <div v-else>
        <p><strong>{{this.ifEmptyMsg}}</strong></p>
    </div>
</section>
    `
    ,
    data() {
        return {
            emails: null,
            filterBy: 'inbox',
            user: null,
            ifEmptyMsg: ''
            // criteria: null
        }
    },
    created() {
        this.loadEmails();
        this.loadUser();
    },
    destroyed() {

    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy
            console.log(this.filterBy);
        },
        loadEmails() {
            emailService.query(this.filterBy)
                .then(emails => {
                    this.emails = emails
                    if (!emails.length) {
                        console.log('empty arrays');
                        this.showEmptyMsg();
                    }
                })
        },
        loadUser() {
            this.user = emailService.loggedUserQuery()
        },
        showEmptyMsg() {
            this.ifEmptyMsg = 'No ' + this.filterBy + ' mails';
        },
        moveToTrash(email) {
            email.status = 'trash'
            console.log(email)
            emailService.save(email)
                .then(() => {
                    this.loadEmails();
                    // console.log('moved to trash email//ADD EVENT BUS MSG')
                })
        },
        sendMessage(msg) {
            emailService.save(msg)
                .then(() => {
                    this.loadEmails();
                    // console.log('moved to sent email//ADD EVENT BUS MSG')
                })
        }
    },
    watch: {
        filterBy() {
            this.loadEmails()
        }
    },
    computed: {
        // mails() {
        //     if (!this.filterBy) return this.emails
        //     console.log('theres filter');
        //     console.log(this.emails);
        //     return this.emails.filter(email => {
        //         return email.status === this.filterBy
        //     })
        // }
    }
    ,
    components: {
        emailFilterNav,
        emailList,
    }

}