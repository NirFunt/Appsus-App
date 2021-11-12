import { eventBus } from '../services/event-bus.service.js';

export default {
    template: `
        <div v-if="msg" class="user-msg" :class="msg.type">
            <p>{{msg.txt}} </p>
            <router-link :to="msg.url"> Go To Book </router-link>
        </div>
     
    `,
    data() {
        return {
            msg: null,
        };
    },
    created() {
        eventBus.$on('showMsg', this.showMsg);
    },
    methods: {
        showMsg(msg) {
            this.msg = msg;
            setTimeout(() => {
                this.msg = null;
            }, 5000);
        }
    },
    destroyed() {
        eventBus.$off('showMsg', this.showMsg);
    }

};