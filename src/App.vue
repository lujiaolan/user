<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app',
        components: {},
        methods:{
            getApId(){
                const self = this;
                let URL =  document.location.origin;
                const postData = {
                    domain:URL,
                    type:'agent',
                };
                this.$ajax({
                    method: 'post',
                    data:postData,
                    url:'/ap/getApId'
                }).then(function (res) {
                    console.log(res)
                    console.log(res.data.data)
                    self.$store.dispatch('update_domain',res.data.data)

                }).catch(function (err) {
                    console.log(err)
                })
            }
        },
        created(){
            this.getApId();
        },
        watch:{
            $route(to,from){
                // console.log(to);
                if (!to.matched.length) {
                    this.$router.push('/404');
                }
            }
        }
    }
</script>

