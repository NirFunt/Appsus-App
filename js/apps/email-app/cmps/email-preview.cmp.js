export default {
    props: ['email'],
    template: `
        <div class="email-preview flex space-between" @click="previewEmail">
            <section class=flex>
                 <button>check</button>
                 <button>star</button>
                 <p>{{email.from}}</p>
            </section>
            <p>{{email.subject}}</p>
            <section>
                 <button>Read/unread</button>
                 <button>Trash</button>
            </section>
        </div>
      
    `,
    data() {
        return {
            isReadModal: false,
            currEmail: this.email
        }
    },
    methods: {
        previewEmail() {
            console.log('mail clicked...');
            this.$emit('openModal', this.isReadModal = true, this.currEmail)
        }
    }
}