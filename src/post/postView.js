import {Component} from "react";


// 文章， 用于显示
export class PostView extends Component {
    
    renderHeader(){
        // 渲染文章头
        return (
            <div className="header">
                
            </div>
        )
    }
    
    renderContent(){
        // 渲染文章内容
        return (
            <div className="content">
                
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