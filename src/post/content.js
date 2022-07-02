import {Component} from "react";
import {PostForm} from './postForm'
import {PostView} from './postView'

const POSTS = "posts";
const SETTINGS = "settings";
const MODE_VIEW = "view";
const MODE_EDIT = "edit";

export class LeeContent extends Component {

    handleTabClick = (tab) => {
        this.setState({activeTab: tab})
    }

    postsNum = () => {
        return this.state.posts.filter(post => !!post.title).length || 0
    }

    defaultPost = () => {
        return {
            mode: MODE_EDIT,
            fullTxt: "",
            title: "",
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            activeTab: POSTS,
            posts: [this.defaultPost()],
        }
    }


    isActiveSettings() {
        return this.state.activeTab === SETTINGS
    }

    isActivePosts() {
        return this.state.activeTab === POSTS
    }

    handlePostChange = (index, prop, val) => {
        this.setState(preState => {
            if (index > preState.length) return preState;
            preState[index][prop] = val;
            return preState;
        })
    }

    renderData() {
        if (this.isActiveSettings()) {
            return (<div>
                nothing
            </div>)
        } else {
            return (
                <div>
                    {this.state.posts.map((post, index) => {
                        if (post.mode === MODE_EDIT) {
                            return <PostForm
                                key={index}
                                title={post.title}
                                fullTxt={post.fullTxt}
                                idx={index}
                                handleChange={this.handlePostChange}
                            />
                        } else {
                            return <PostView/>
                        }
                    })}
                </div>
            )
        }
    }


    render() {
        return (
            <div>
                <div className="lee-tabs">
                    <div className={`settings ${this.isActiveSettings() ? 'active' : 'unactive'}`}
                         onClick={() => this.handleTabClick(SETTINGS)}>
                        <div className="txt">Settings</div>
                    </div>
                    <div className={`posts ${this.isActivePosts() ? 'active' : 'unactive'}`}
                         onClick={() => this.handleTabClick(POSTS)}>
                        <div className="txt">
                            <span>Posts</span>
                            <span className="num">{this.postsNum()}</span>
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