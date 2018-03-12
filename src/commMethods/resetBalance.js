import $ from 'jquery';
export function resetBalance(query) {
    return $.get({
        url:  this.$store.state.baseUrl + '/crm/deposit/wallet/' + this.$store.state.user.userinfo._id,
        // url: 'http://manager.crm79.com/static/city.json',
        params: query
    });
}
