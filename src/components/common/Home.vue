<template>
    <div class="wrapper">
        <v-sidebar></v-sidebar>
        <div class="content">
            <transition name="move" mode="out-in"><router-view></router-view></transition>
        </div>
    </div>
</template>

<script>
    import vSidebar from './Sidebar.vue';
    export default {
        components:{
             vSidebar
        },
        methods:{
            getJudgeId(){
                const postHerf = location.href.split('?');
                const self = this;
                let postAgent = postHerf[1];
                console.log("postAgent")
                console.log(postAgent   )
                console.log("postHerf")
                console.log(postHerf   )
                if(postAgent==''||postAgent==undefined||postAgent==''){

                }else{
                    self.$ajax({
                        method:'get',
                        url:'/user/'+postAgent
                    }).then(function (res) {
                        if(res.data.retCode===0){
                            self.$store.dispatch('update_userinfo',{userinfo:res.data.data});
//                            self.$router.push('/home')
                        }
                    })
                }
            }
        },
        mounted(){
            this.getJudgeId();
            console.log('home 来接受数据');
            console.log(this.$store.state.user.userinfo._id);
        }

    }

</script>


