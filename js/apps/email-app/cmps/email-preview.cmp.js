import { emailService } from "../services/email-service.js"

export default {
    props: ['email'],
    template: `
        <div class="email-preview flex space-between">
            <section class=flex>
            <input type="checkbox" id="emailCheck" name="emailCheck" @click.stop>
                 <span class="star" @click.stop="markStarred">
                 <i class="far fa-star"></i>
                 </span>
                 <p>{{email.from}}</p>
            </section>
            <section class="email-text flex">
                  <p><strong>{{email.subject}}</strong></p>&#160|&#160
                  <p>{{getLimitedTxt}}</p>
            </section>
            <section class="actions">
                 <button class="read-btn" @click.stop="markAsRead">Read/unread</button>
                 <button class="delete-btn" @click.stop="deleteEmail">
                 <i class="fas fa-trash"></i>
                 </button>
            </section>
           </div>
      
    `,
    data() {
        return {

        }
    },
    computed: {
        getLimitedTxt() {
            let words = this.email.body.split(' ');
            var str = '';
            for (let i = 0; i < 10; i++) {
                str += ' ' + words[i];
            }
            return str
        }
    },
    methods: {
        markAsRead() {
            // console.log(this.email.isRead);
            this.email.isRead = !this.email.isRead;
            console.log(this.email);
            // emailService.save(this.book)
            //     .then(() => {
            //         this.parent.$emit('render')
            //     })
        },
        deleteEmail() {
            emailService.remove(this.email)
                .then(() => {
                    console.log('deleted email//ADD EVENT BUS MSG');
                })
            this.$parent.$emit('filter', this.email.id);

        },
        markStarred() {
            console.log('starred');
        },

    }
}