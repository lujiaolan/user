import $ from 'jquery';
export function resetBalance(query) {
    return $.get({
        url: 'http://120.77.55.98:8080/crm/deposit/wallet/' + this.$store.state.user.userinfo._id,
        // url: 'http://manager.crm79.com/static/city.json',
        params: query
    });
}
