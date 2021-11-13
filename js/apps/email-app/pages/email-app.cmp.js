import { emailService } from "../services/email-service.js";
import emailFilterNav from "../cmps/email-filter-nav.cmp.js";
import emailList from "../cmps/email-list.cmp.js";

export default {
    template: `    
<section class="email-app flex space-between">

    <email-filter-nav
        @filter="setFilter" @send="sendMessage"
        @filterStarred="setFilter" :user="user"
        :unreadMsgs="unreadMsgs"/>

    <email-list 
        :emails="emails" @trash="moveToTrash" 
        @star="moveToStarred" @read="setRead" @filterTxt="setFilter"
        v-if="emails" @selectFilter="setFilter"/>

    <div class="empty-msg flex flex-column" v-else>
        <img src="/img/empty.png">
        <p><strong>{{ifEmptyMsg}}</strong></p>
    </div>

</section>
    `
    ,
    data() {
        return {
            emails: null,
            filterBy: 'inbox',
            user: null,
            ifEmptyMsg: '',
            unreadMsgs: null
            // criteria: null
        }
    },
    created() {
        this.loadEmails()
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
                    this.countUnread();
                })
        },
        countUnread() {
            this.unreadMsgs = this.emails.reduce(function (count, email) {
                if (email.isRead) count++
                return count
            }, 0)
        },
        loadUser() {
            this.user = emailService.loggedUserQuery()
        },
        showEmptyMsg() {
            this.ifEmptyMsg = this.filterBy.charAt(0).toUpperCase() + this.filterBy.slice(1, this.filterBy.length) + ' folder is empty'
            console.log(this.ifEmptyMsg);
        },
        moveToTrash(email) {
            email.status = 'trash'
            console.log(email)
            emailService.save(email)
                .then(() => {
                    this.loadEmails();
                    // console.log('moved to trash email//ADD EVENT BUS MSG')
                })
        }, moveToStarred(email) {
            email.isStarred = !email.isStarred;
            console.log('email', email);
            emailService.save(email)
                .then(() => {
                    this.loadEmails();
                    // console.log('moved to trash email//ADD EVENT BUS MSG')
                })
        },
        setRead(email) {
            email.isRead = !email.isRead;
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
        },
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