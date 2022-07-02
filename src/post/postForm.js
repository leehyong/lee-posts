import {Component} from "react";
import {Input} from 'antd';
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'

// 富文本编辑: https://www.yuque.com/braft-editor/be/gz44tn#bo49ph
const CONTROLS = [
    "fullscreen", "code", 'separator',
    'bold', 'italic', 'underline', 'font-size', 'separator',
    'text-align', 'separator',
    'list-ul', 'list-ol', 'separator',
    'link', 'separator',
    'media',
]

// 文章表单， 用于编辑
export class PostForm extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        this.title = this.props.title;
        this.editor = BraftEditor.createEditorState(this.props.fullTxt)
    }

    handleTitleChange = () => {
        console.log("props " + this.props)
        console.log(this.title)
        this.props.handlePostChange(this.props.idx, "title", this.title)
    }
    handleTxtChange = () => {
        console.log(this.props)
        console.log(this.editor.toHTML())
        this.props.handlePostChange(this.props.idx, "fullTxt", this.editor.toHTML())
    }

    render() {
        return (
            <div className="post-form">
                <Input value={this.title}
                       className="input"
                       placeholder="input post title"
                       onChange={this.handleTitleChange}/>
                <BraftEditor
                    value={this.editor}
                    controls={CONTROLS}
                    textAligns={["left", "center"]}
                    // onChange={this.handleTxtChange}
                    className="editor"
                    placeholder="text..."
                    controlBarClassName="editor-bar"
                    contentClassName = "editor-content"
                />
            </div>

        )
    }
}