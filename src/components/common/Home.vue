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
            getApId(){
                const self = this;
                let URL =  document.location.origin;
                const postData = {
                    domain:URL,
                    type:'agent',
                };
                console.log('agent')
                console.log(postData)
                this.$ajax({
                    method: 'post',
                    data:postData,
                    url:'/other/ap/getApId'
                }).then(function (res) {
                    console.log('getApId res')
                    console.log(res)
                    if(res.data.retCode==0){
                        self.$store.dispatch('update_domain',res.data.data)
                        self.getJudgeId();
                    }else{
                        self.$message({
                            type:'warning',
                            showClose:true,
                            message:'解析域名错误'
                        });
                        self.$router.push('/login')
                    }
                }).catch(function (err) {
                    console.log(err)
                    self.$message({
                        type:'warning',
                        showClose:true,
                        message:'解析域名错误'
                    });
                    self.$router.push('/login')
                })
            },
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
            this.getApId();
            console.log('home 来接受数据');
            console.log(this.$store.state.user.userinfo._id);
            const haveHref = location.href;
            console.log('有无?')
            console.log(/('?')/.test(haveHref))
//            if(/('?')/.test(haveHref)===false){
//                console.log('哈哈哈哈 进来了')
//                if(!this.$store.state.user.userinfo._id){
//                    this.$router.push('/login')
//                }
//            }

        }
    }

</script>


