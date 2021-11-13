import { emailService } from "../services/email-service.js"

export default {
    props: ['email'],
    template: `
        <div class="email-preview flex space-between" >
            <section class=flex>
                <label class="checkbox" for="myCheckBox">
                    <input class="checkbox-input" type="checkbox"  id="myCheckBox" name="pageCheckbox" @click.stop>
                </label>
                 <span class="star" @click.stop="markStarred"  @click="check"> 
                 <i class="far fa-star" :class="{yellow:email.isStarred}"></i>
                 </span>
                 <p>{{email.from}}</p>
            </section>
            <section class="email-text flex">
                  <p><strong>{{email.subject}}</strong></p>&#160|&#160
                  <p>{{getLimitedTxt}}</p>
            </section>
            <section class="actions">
                 <button class="read-btn" @click.stop="markAsRead">
                 <i class="fas fa-envelope-open-text" v-if="!email.isRead"></i>
                 <i class="fas fa-envelope" v-else></i>
                 </button>
                 <button class="delete-btn" @click.stop="moveToTrash">
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
            this.$parent.$emit('read', this.email);
            console.log('read');
        },
        moveToTrash() {
            console.log(this.email);
            this.$parent.$emit('trash', this.email);
            console.log('trashed');
        },
        markStarred() {
            console.log('starred');
            this.$parent.$emit('star', this.email);
        },
        // deleteEmail() {
        //     emailService.remove(this.email)
        //         .then(() => {
        //             console.log('deleted email//ADD EVENT BUS MSG');
        //         })
        //     this.$parent.$emit('filter', this.email.id);
        // }
        check() {
            console.log(this.email.isStarred);
        }

    }
}