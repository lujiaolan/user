/**
 * Created by Udea-Manager on 2017/4/25.
 */
import { quillEditor } from 'vue-quill-editor';
export default {
    data: function(){
        return {
            content: '<p>Hello BBK</p>',
            editorOption: {
                // something config
            }
        }
    },
    components: {
        quillEditor
    },
    methods: {
        onEditorChange({ editor, html, text }) {
            this.content = html;
        },
        submit(){
            console.log(this.content);
            this.$message.success('提交成功！');
        }
    },
    computed: {
        editor() {
            return this.$refs.myTextEditor.quillEditor;
        }
    }
}
