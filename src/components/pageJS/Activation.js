/**
 * Created by Udea-Manager on 2017/4/25.
 */
export default {
    data() {
        return {
            countDownTime: '',
            countDownTip:'',
            tipVal: '',
            loginUrl: ''
        }
    },
    methods: {
        activation() {
            const self = this;
            const testUrl = location.href;
            const arr = testUrl.split("=");
            console.log('location.href  arr',arr);
            console.log('location.href',arr[1]);
            this.$ajax.get('/activication/' + arr[1]).then(function (res) {
                console.log('/crm/activication/ res',res);
                if (res.data.retCode === 0) {
                    self.countDownTime = 6;
                    self.tipVal = '恭喜您激活成功！';
                    self.countDownTip = 's之后自动跳转';
                    self.loginUrl = res.data.data;
                    self.setTimer();
                } else {
                    self.tipVal = '很遗憾，激活失败！';
                    self.countDownTime = '';
                    self.countDownTip = '';
                }
            }).catch(function () {
            });
        },
        setTimer() {
            const self = this;
            let countDown = setInterval(function () {
                if (self.countDownTime === 0) {
                    clearInterval(countDown);
                    self.countDownTime = '';
                    window.open(self.loginUrl)
                } else {
                    self.countDownTime--;
                }
            }, 1000);
            countDown;
        }
    },
    mounted() {
        this.activation()
    }
}
