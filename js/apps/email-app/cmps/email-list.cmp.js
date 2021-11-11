import emailPreview from "./email-preview.cmp.js"

export default {
    props: ['emails'],
    template: `
        <section class="email-list flex flex-column" v-if=!isReadModal :filter="passDown">
            <!-- <search-bar/> -->
        <ul>
            <li v-for="email in emails" :key="email.id" class="email-preview-container flex flex-column" :class={read:email.isRead}>
                <email-preview :email="email" @click.native="openModal(email)"  @openModal="openModal" />
              
                <!-- <div class="actions">
                    <button @click="remove(car.id)" >X</button>
                    <router-link :to="'/car/'+car.id" >Details</router-link>
                    <router-link :to="'/car/'+car.id + '/edit'" >Edit</router-link>
                </div> -->
            </li>
        </ul>
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
        emailPreview

    }

}