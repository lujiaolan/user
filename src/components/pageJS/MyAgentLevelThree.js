/**
 * Created by Udea-Manager on 2017/12/21.
 */
import myAgentLevelFour from '../page/MyAgentLevelFour.vue'
export default {
    components:{
        myAgentLevelFour
    },
    props:['levelThree'],
    data(){
        return {
            levelFourInfo:[],
            showHead:false,
        }
    },
    methods:{
        expandFourClick(row){
            console.log('levelFourInfo')
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
            // this.$ajax({
            //     method:'post',
            //     url:'/user/noPage/agent',
            //     data:postData
            // }).then(function (res) {
            //     if(res.data.retCode==0){
            //         console.log('levelFourInfo')
            //         console.log(res)
            //         self.levelFourInfo = res.data.data;
            //     }
            // }).catch(function (err) {
            //
            // })
        },
        getLevelFour(){
            const self = this;
            // this.$ajax({
            //     method:'post',
            //     url:'/user/noPage/agent',
            //     data:self.totalTeam
            // }).then(function (res) {
            //     if(res.data.retCode==0){
            //         console.log('getLevelFour')
            //         console.log(res)
            //         self.tableData5 = res.data.data;
            //     }
            // }).catch(function (err) {
            //
            // })
        }
    },
    mounted(){
        this.getLevelFour();
        // console.log('this.levelThree')
        // console.log(this.levelThree)
        // this.tableData6 = levelThree;
    }
}
