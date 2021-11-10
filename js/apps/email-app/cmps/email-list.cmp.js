import emailPreview from "./email-preview.cmp.js"

export default {
    props: ['emails'],
    template: `
        <section class="email-list flex flex-column" v-if=!isReadModal>
            <!-- <search-bar/> -->
        <ul>
            <li v-for="email in emails" :key="email.id" class="email-preview-container flex flex-column" >
                <email-preview :email="email" @click.native="log"  @openModal="openModal" />
                <!-- <div class="actions">
                    <button @click="remove(car.id)" >X</button>
                    <router-link :to="'/car/'+car.id" >Details</router-link>
                    <router-link :to="'/car/'+car.id + '/edit'" >Edit</router-link>
                </div> -->
            </li>
        </ul>
        </section>
        <div class="email-modal" v-else>
            <section class="modal-header flex space-between">
                <p>{{clickedMail.from}}</p>
                <button @click="isReadModal=false">X</button>
            </section>
            <p>{{clickedMail.body}}</p>

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
        },
        openModal(isRead, email) {
            console.log(isRead);
            this.isReadModal = isRead
            this.clickedMail = email
        }

    },
    components: {
        emailPreview

    }

}