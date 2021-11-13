

export default {
    template: `
<section class="search-bar-nav flex">
    <div class="select-dropdown">
        <input type="checkbox">
       
        <select name="mark" class="fas fa-caret-down" v-model="filter" @change="setFilter">
        <option value="inbox">All</option>
        <option value="starred">Starred</option>
        <option value="unstarred">Unstarred</option>
        <option value="read">Read </option>
        <option value="unread">Unread</option>
        </select>
        </input>

    </div>
    <div class="search-bar">
        <form>
        <input type="text" id="search" type="search" placeholder="Search mail" v-model="msg" @change="filterTxt">
        <button type="submit" @click.stop>Go</button>    
        </form>
    </div>


</section>
    `
    ,
    data() {
        return {
            msg: '',
            filter: ''
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
        },
        setFilter() {
            console.log(this.filter);
            // if (this.filter === 'all') this.filter = 'inbox'
            this.$parent.$emit('selectFilter', this.filter);
        }


    },
    computed: {
    }

}