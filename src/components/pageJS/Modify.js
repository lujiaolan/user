/**
 * Created by Udea-Manager on 2017/4/25.
 */
export default {
    data: function(){
        return {
            modifyForm: {
                applyAccount: '12345',
                Recommender: '',
                agentLever: 'one'
            }
        }
    },
    methods:{
        onSubmit() {
            console.log('submit!');
        }
    }
}
