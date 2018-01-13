/**
 * Created by Udea-Manager on 2017/12/21.
 */
import myAgentLevelFive from '../page/MyAgentLevelFive.vue'
export default {
    components:{
        myAgentLevelFive
    },
    props:['levelFour'],
    data(){
        return{
            levelFiveInfo:[],
            showFourHead:false,
        }
    },
    methods:{
        expandFiveClick(row){
            console.log(row)
            const postData = {
                apId: this.$store.state.domain.domain.domain.apId,
                userId: row._id,
                agentLevel: row.agentLevel,
                startTime: '',
                endTime: '',
                agentNameLike: ''
            };
            console.log(postData)
            const self = this;
            this.$ajax({
                method:'post',
                url:'/user/noPage/agent',
                data:postData
            }).then(function (res) {
                if(res.data.retCode==0){
                    console.log('levelFour')
                    console.log(res)
                    self.levelFiveInfo = res.data.data;
                }
            }).catch(function (err) {

            })
        }
    },
    mounted(){
        console.log('this.levelFour')
        console.log(this.levelFour)
    }
}
