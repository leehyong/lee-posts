import {Component} from "react";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import PropTypes from 'prop-types';

// 文章， 用于显示
export class PostView extends Component {

    renderHeader() {
        // 渲染文章标题
        const post = this.props.post;
        return (
            <div className="header">
                <div className="title bg-box">{post.title}</div>
                <div className="line-box">
                    <div className="line"/>
                </div>
                <div className="op-box">
                    <div className="box">
                        <div className="edit view-op">
                            <div className="inner-edit c-pointer" onClick={() => this.props.editPost(this.props.idx)}>
                                <span className="edit-icon"><EditOutlined/></span>
                                <span>Edit</span>
                            </div>
                        </div>
                        <div className="delete c-pointer view-op" onClick={() => this.props.deletePost(this.props.idx)}>
                            <div className="inner-delete">
                                <DeleteOutlined/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderContent() {
        // 渲染文章内容
        const post = this.props.post;
        return (
            <div className="content-box">
                <div className="content" dangerouslySetInnerHTML={{__html: post.fullTxt}}/>
                <div className="date">{post.updateTime}</div>
            </div>
        )
    }

    render() {
        return (
            <div className="view-box">
                {this.renderHeader()}
                {this.renderContent()}
            </div>
        )
    }
}

PostView.propTypes = {
    editPost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    post: PropTypes.shape({
        title: PropTypes.string.isRequired,
        fullTxt: PropTypes.string.isRequired
    })
}