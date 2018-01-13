/**
 * Created by Udea-Manager on 2017/4/25.
 */
export default {
    data() {
        return {
            tableData: [{
                date: '2017-02-02',
                name: '小天才',
                address: '东莞市长安镇步步高大道18号',
                tag: '家'
            }, {
                date: '2017-02-04',
                name: '小天才',
                address: '东莞市长安镇步步高大道17号',
                tag: '公司'
            }, {
                date: '2017-02-01',
                name: '小天才',
                address: '东莞市长安镇步步高大道19号',
                tag: '家'
            }, {
                date: '2017-02-03',
                name: '小天才',
                address: '东莞市长安镇步步高大道16号',
                tag: '公司'
            }]
        }
    },
    methods: {
        formatter(row, column) {
            return row.address;
        },
        filterTag(value, row) {
            return row.tag === value;
        },
        handleEdit(index, row) {
            this.$message('编辑第'+(index+1)+'行');
            console.log(row.name);
        },
        handleDelete(index, row) {
            this.$message.error('删除第'+(index+1)+'行');
        }
    }
}
