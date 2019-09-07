
<style lang="less" src="./style/custom.less"></style>
<template>
    <div id="app">
        <!-- <div>{{this.time | formatDate}}</div> -->
        <router-view></router-view>

    </div>
</template>

<script>
// import {formatDate} from './services/date.js';
export default {

    name: 'App',
    data() {
        return {
            // time:1223947049600
        };
    },
    methods: {

    },
    mounted() {
        // this.$router.push('/');
    },
    // filters: {
    //     formatDate(time) {
    //         let date = new Date(time);
    //         return formatDate(date, 'yyyy-MM-dd hh:mm');
    //     }
    // }
}
</script>



