import {Component} from "react";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";


// 文章， 用于显示
export class PostView extends Component {

    renderHeader() {
        // 渲染文章标题
        return (
            <div className="header">
                <div className="title bg-box">{this.props.title}</div>
                <div className="line-box">
                    <div className="line"/>
                </div>
                <div className="op-box">
                    <div className="box">
                        <div className="edit view-op">
                            <div className="inner-edit c-pointer">
                                <span className="edit-icon"><EditOutlined/></span>
                                <span>Edit</span>
                            </div>
                        </div>
                        <div className="delete c-pointer view-op">
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
        return (
            <div className="content-box">
                <div className="content" dangerouslySetInnerHTML={{__html: this.props.fullTxt}}/>
                <div className="date">2021-02-03 11:09:08</div>
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