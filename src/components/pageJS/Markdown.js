/**
 * Created by Udea-Manager on 2017/4/25.
 */
import { markdownEditor } from 'vue-simplemde';
export default {
    data: function(){
        return {
            content:'',
            configs: {
                status: true,
                initialValue: 'Hello BBK',
                renderingConfig: {
                    codeSyntaxHighlighting: true,
                    highlightingTheme: 'atom-one-light'
                }
            }
        }
    },
    components: {
        markdownEditor
    }
}
