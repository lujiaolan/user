export default {
    data:function () {
        return {
            upLeverAgent: '麻子',
            LeverAgentId: '178653',
            tipInfo: [
                // {info: '111111'},{info: '222222'},{info: '33333333'},{info: '4444444'},{info: '55555'}
                ],

            userId : this.$store.state.user.userinfo._id,

            curMenu: {
                leftMenu: '',
                headerMenu: '',
            }
        }
    },
    mounted() {
        this.getJudgeId();
        this.updateCurMenu();
        this.username();
        this.getBalance();
        this.getVerifyStatus();
        this.getCompanyInfo();
    },
    methods: {
        singOut(){
            const self = this;
            localStorage.removeItem('ms_username');
            this.$ajax({
                method: 'get',
                url: '/logout/' + self.$store.state.user.userinfo._id
            }).then(function () {
                self.$router.push('/login');
            })
        },
        username(){
            let username = localStorage.getItem('ms_username');
            return username ? username : this.name;
        },
        getBalance(){
//                console.log('res.data.data.money');
            let self = this;
            this.$ajax({
                method: 'get',
                url: '/deposit/wallet/' + this.userId
            }).then(function (res) {
                console.log('侧边栏钱包余额');
                console.log(res.data.data);
                const errMsg = {
                    money: '查询钱包错误',
                    lockFlag: false
                };
                if(res.data.retCode === 0){
                    self.$store.dispatch('update_balance',res.data.data);
                }else {
                    self.$store.dispatch('update_balance',errMsg);
                }
                console.log('this.$store.state.balance');
                console.log(self.$store.state.balance.money);
            }).catch(function (err) {
            });
        },

        updateCurMenu(){
            if (this.$route.matched.length) {
                this.curMenu.leftMenu = this.$route.matched[0].path; //sidebarMenu
                this.curMenu.headerMenu = this.$route.path; //headerMenu
            }
            this.$store.dispatch('set_cur_menu',this.curMenu);
        },
        sidebarUpdateCurMenu(route){
            const self = this;
            this.curMenu.leftMenu = route; //sidebarMenu
//                console.log('updateCurMenu',this.$router.options.routes);
            this.$router.options.routes.forEach(function (item) {
                if(route === item.path){
                    self.curMenu.headerMenu = item.children[0].path
                }
            });
            this.$store.dispatch('set_cur_menu',this.curMenu);
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
        },

        getVerifyStatus(){
            const self = this;
            this.$ajax({
                method: 'get',
                url: '/user/' + this.$store.state.user.userinfo._id + '/verifyStatus'
            }).then(function (res) {
                console.log('header getVerifyStatus');
                console.log(res);
                if(res.data.retCode == 0){
                    self.$store.dispatch('update_info_status', {verifyStatus: res.data.data.verifyStatus,});
                    console.log('self.$store.state.myInfoStatus.verifyStatus');
                    console.log(self.$store.state.myInfoStatus.verifyStatus);
                }
            });
        },

        infoStatus(){
            this.$router.push('/accountManagement/myInfo');
            this.curMenu.leftMenu = '/accountManagement';
            this.curMenu.headerMenu = '/accountManagement/myInfo';
            this.$store.dispatch('set_cur_menu',this.curMenu);
        },


        getCompanyInfo(){
            const self = this;
            console.log('self.$store.state.domain.domain.domain.apId',self.$store.state.domain.domain.domain.apId);
            self.$ajax({
                method: 'get',
                url: '/ap/info/' + self.$store.state.domain.domain.domain.apId
            }).then(function (res) {
                console.log(res);
                if(res.data.retCode === 0){
                    console.log('getCompanyInfo',res.data.data);
                    self.$store.dispatch('update_company_info',res.data.data);
                    console.log('self.$store.state.companyInfo',self.$store.state.companyInfo)
                    // if(res.data.data === ''){
                    //     self.infoForm = ''
                    // }else {
                    //     self.infoForm = res.data.data
                    // }
                }else {

                }
            }).catch(function () {
            })
        },
    },
}
