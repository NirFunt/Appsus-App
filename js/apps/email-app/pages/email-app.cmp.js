import { emailService } from "../services/email-service.js";
import emailFilterNav from "../cmps/email-filter-nav.cmp.js";
import emailList from "../cmps/email-list.cmp.js";

export default {
    template: `    
<section class="email-app flex space-between">
    <email-filter-nav/>
    <email-list :emails="emailsForPreview" @filter="filterSpecific" />
</section>
    `
    ,
    data() {
        return {
            emails: null,
            filterBy: this.criteria,
            criteria: 'inbox'
        }


    },
    created() {
        this.loadEmails();


    },
    destroyed() {

    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy
        },
        loadEmails() {
            emailService.query(this.criteria)
                .then(emails => {
                    console.log(emails);
                    this.emails = emails
                })
        },
        filterSpecific(emailId) {
            console.log('hello filter', emailId);
            this.emails = this.emails.filter(email => email.id !== emailId);
        }
    },
    computed: {
        emailsForPreview() {
            if (!this.filterBy) return this.emails
            return this.emails.filter(email => email.status = this.filterBy)



        }
    }
    ,
    components: {
        emailFilterNav,
        emailList,
    }

}