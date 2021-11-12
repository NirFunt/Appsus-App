

export default {
    template: `
<section class="search-bar-nav flex">
    <div class="select-dropdown">
        <input type="checkbox">
       
        <select name="mark"  class="fas fa-caret-down">
        <option value="all">All</option>
        <option value="starred">Starred</option>
        <option value="unstarred">Unstarred</option>
        <option value="read">Read</option>
        <option value="unread">Unread</option>
        </select>
        </input>

    </div>
    <div class="search-bar">
        <input type="text" placeholder="Search mail" v-model="msg" @change="filterTxt">
    </div>


</section>
    `
    ,
    data() {
        return {
            msg: ''
        };
    },
    created() {

    },
    destroyed() {

    },
    methods: {
        filterTxt() {
            var txtFilter = {
                filterBy: 'txt',
                msg: this.msg
            }
            console.log(txtFilter);
            this.$parent.$emit('filterTxt', txtFilter);
        }

    },
    computed: {
    }

}