/**
 * Created by Udea-Manager on 2017/12/21.
 */
export default {
    props:['levelFive'],
    data(){
        return {
            showFiveHead:false
        }
    },
    methods:{

    },
    mounted(){
        console.log('this.levelFive')
        console.log(this.levelFive)
    }
}
