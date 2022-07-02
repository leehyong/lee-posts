import {Component} from "react";

const POSTS = "posts";
const SETTINGS = "settings";

export class LeeContent extends Component {

    handleTabClick = () => {
        let activeTab;
        switch (this.state.activeTab) {
            case POSTS:
                activeTab = SETTINGS;
                break
            default:
                activeTab = POSTS;
                break
        }
        this.setState({activeTab})
    }

    constructor(props) {
        super(props);
        this.state = {
            activeTab: POSTS,
            posts:[],
        }
    }


    isActiveSettings() {
        return this.state.activeTab === SETTINGS
    }

    isActivePosts() {
        return this.state.activeTab === POSTS
    }

    renderData(){
        if (this.isActiveSettings()){
            return (<div>
                nothing
            </div>)
        }else{
            return (
                <div>
                    posts
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <div className="lee-tabs">
                    <div className={`settings ${this.isActiveSettings() ? 'active' : 'unactive'}`}
                         onClick={this.handleTabClick}>
                        <div className="txt">Settings</div>
                    </div>
                    <div className={`posts ${this.isActivePosts() ? 'active' : 'unactive'}`}
                         onClick={this.handleTabClick}>
                        <div className="txt">
                            <span>Posts</span>
                            <span className="num">{this.state.posts.length || 0}</span>
                        </div>
                    </div>
                </div>
                <div className="content">
                    {this.renderData()}
                </div>
            </div>
        );
    }
}