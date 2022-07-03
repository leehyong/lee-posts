import {Component} from "react";
import {Input, message} from 'antd';
import BraftEditor from 'braft-editor'
import {MODE_VIEW} from "../consts";
import {nowStr} from "../util";
// 引入编辑器样式
import 'braft-editor/dist/index.css'
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";

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
        this.state = {
            title: this.props.title || "",
            editor: this.createEditorState(this.props.fullTxt),
            isSubmitting: false,
            isCancelling: false
        };
    }

    createEditorState = (content) => BraftEditor.createEditorState(content)

    handleEditorChange = (editorState) => {
        this.setState({editor: editorState})
    }
    handleTitleChange = (e) => {
        this.setState({title: e.target.value})
    }
    clearData = () => {
        // 清空富文本编辑器的内容
        new BraftEditor(this.state.editor).clearEditorContent()
        this.setState({
            title: "",
            editor: this.createEditorState(null),
            isSubmitting: false,
            isCancelling: false
        })
    }

    handleSubmit = () => {
        if (this.state.isSubmitting) {
            // 避免重复提交
            message.error("正在提交中，请稍等...")
            return;
        }
        const {title, editor} = this.state
        if (!title) {
            message.error("请输入文章标题")
            return;
        }
        const {handleForm, idx} = this.props
        this.setState({isSubmitting: true});
        const now = nowStr();
        const data = {
            title,
            fullTxt: editor.toHTML(),
            isNew: false,
            updateTime: now,
            mode: MODE_VIEW
        }
        if (this.props.isNew) {
            data["createTime"] = now;
        }
        handleForm(idx, null, data, this.clearData)
        this.setState({isSubmitting: false});
    }
    handleCancel = () => {
        if (this.state.isCancelling) {
            // 避免重复取消
            message.error("正在取消，请稍等...")
            return;
        }
        const {handleForm, idx} = this.props
        this.setState({isCancelling: true});
        handleForm(idx, "mode", MODE_VIEW)
        this.setState({isCancelling: false});
    }

    renderAction() {
        const actions = []
        let opName = "Post"
        let rightAction;
        if (this.props.isNew) {
            rightAction = (
                <div className="right" key="right"/>
            )
        } else {
            opName = "Save"
            rightAction = (
                <div className="right" key="right">
                    <div className="action" onClick={this.handleCancel}>
                        <CloseOutlined/>
                        <span className="txt">Cancel</span>
                    </div>
                </div>
            )
        }
        actions.push((
            <div className="bg-box left" key="left" onClick={this.handleSubmit}>
                <div className="action">
                    <CheckOutlined className="check-icon"/>
                    <span className="txt">{opName}</span>
                </div>
            </div>
        ))
        actions.push(rightAction);
        return actions
    }

    // 渲染表单
    render() {
        // console.log(this.props)
        const {editor, title} = this.state
        return (
            <div className="post-form">
                <Input value={title}
                       className="input"
                       onChange={this.handleTitleChange}
                       placeholder="input post title"
                />
                <BraftEditor
                    value={editor}
                    controls={CONTROLS}
                    textAligns={["left", "center"]}
                    className="editor"
                    placeholder="text"
                    onChange={this.handleEditorChange}
                    onSave={this.handleSubmit}
                    controlBarClassName="editor-bar"
                    contentClassName="editor-content"
                />
                <div className="action-box">
                    {this.renderAction()}
                </div>
            </div>

        )
    }
}