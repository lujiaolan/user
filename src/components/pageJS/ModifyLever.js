/**
 * Created by Udea on 2017/7/11.
 */
export default {
    data: function(){
        return {
            modifyLeverForm: {
                MT4_Number: '324534',
                MT4_Lever: '1:100',
            },
            changeLeverForm: {
                MT4_Number: '324534',
                MT4_Lever: '1:100',
            }
        }
    },
    methods:{
        onSubmit() {
            console.log('submit!');
        }
    }
}
