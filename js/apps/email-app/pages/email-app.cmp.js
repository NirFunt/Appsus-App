import { emailService } from "../services/email-service.js";
import emailFilterNav from "../cmps/email-filter-nav.cmp.js";
import emailList from "../cmps/email-list.cmp.js";

export default {
    template: `    
<section class="email-app flex space-between">
    <email-filter-nav/>
    <email-list :emails="emailsForPreview"/>
</section>
    `
    ,
    data() {
        return {
            emails: null,
            filterBy: null

        };
    },
    created() {
        emailService.query()
            .then(emails => {
                this.emails = emails
                console.log(emails);
            })

    },
    destroyed() {

    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy
        }
    },
    computed: {
        emailsForPreview() {
            if (!this.filterBy) return this.emails
        }
    }
    ,
    components: {
        emailFilterNav,
        emailList,
    }

}