import {Component} from "react";
import {PostForm} from './postForm'
import {PostView} from './postView'
import {MODE_EDIT, MODE_VIEW} from "../consts";
import {nowStr} from "../util";
import {Row, Col, message} from "antd";
const POSTS = "posts";
const SETTINGS = "settings";


export class LeeContent extends Component {

    handleTabClick = (tab) => {
        this.setState({activeTab: tab})
    }

    postsNum = () => {
        return this.state.posts.filter(post => !!post.title).length || 0
    }

    defaultPost = () => {
        // 默认文章的属性
        return {
            mode: MODE_EDIT,
            fullTxt: "",
            title: "",
            // 通过isNew， 确定文章是不是新增状态？
            isNew: true,
            // 创建时间
            createTime:null,
            // 更新时间
            updateTime:null,
        }
    }
    viewPost = () => {
        // 默认文章的属性
        const now = nowStr();
        return {
            mode: MODE_VIEW,
            fullTxt: "dadwqeq",
            title: "三大大大大",
            // 通过isNew， 确定文章是不是新增状态？
            isNew: false,
            // 创建时间
            createTime:now,
            // 更新时间
            updateTime:now,
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            activeTab: POSTS,
            posts: [this.defaultPost(), this.viewPost(), this.viewPost()],
        }
        this.handleFormAction = this.handleFormAction.bind(this);
    }


    isActiveSettings() {
        return this.state.activeTab === SETTINGS;
    }

    isActivePosts() {
        return this.state.activeTab === POSTS;
    }

    // 删除index对应的某个文章
    deletePost = (index)=>{
        this.setState(preState =>{
            if (index >= preState.posts.length) return preState;
            preState.posts.splice(index, 1);
            return preState;
        })
    }
    // 删除index对应的某个文章
    cancelPost = (index)=>{
        this.setState(preState =>{
            if (index >= preState.posts.length) return preState;
            preState.posts[index].mode = MODE_VIEW;
            return preState;
        })
    }
    // 编辑index对应的某个文章
    editPost = (index)=>{
        this.setState(preState =>{
            if (index >= preState.posts.length) return preState;
            preState.posts[index].mode = MODE_EDIT;
            return preState;
        })
    }

    // 修改单个文章的信息
    handleFormAction(index, prop, val, clear) {
        this.setState(preState => {
            if (index >= preState.posts.length) return preState;
            // 不用 !val 判定， 避免val 为false的情况
            if (val === null || val === undefined) return preState;
            else if (typeof val === "object" && Object.keys(val).length === 0) return preState;
            // 没传递具体的属性时， 就是修改全部属性
            const isNew = preState.posts[index].isNew
            const isEditMode = preState.posts[index].mode === MODE_EDIT
            if (!prop) {
                preState.posts[index] = val
            } else {
                // 修改具体的某个属性
                preState.posts[index][prop] = val;
            }
            // 编辑完后，如果没有新的默认文章，则需要创建一个
            if (index === 0 && preState.posts[index].isNew === false){
                preState.posts.unshift(this.defaultPost());
                // 需要清空表单数据
                clear && clear();
            }
            if (isEditMode){
                message.info(`${isNew?'新增':'修改'}成功`);
            }
            return preState;
        })
    }

    renderOnePost(post, index) {
        // 渲染单个文章
        let ele;
        if (post.mode === MODE_EDIT) {
            ele = (<PostForm
                title={post.title}
                key={index}
                fullTxt={post.fullTxt}
                idx={index}
                isNew={post.isNew && post.mode === MODE_EDIT}
                handleForm={this.handleFormAction.bind(this)}
                cancelPost={this.cancelPost}
            />)
        } else {
            ele = (<PostView
                key={index}
                idx={index}
                title={post.title}
                fullTxt={post.fullTxt}
                updateTime={post.updateTime}
                deletePost={this.deletePost}
                editPost={this.editPost}
            />)
        }
        return <Row key={index} style={{marginBottom:50}}>
            <Col span={24}>
                {ele}
            </Col>
        </Row>
    }

    renderPosts() {
        // 渲染所有文章
        if (this.isActiveSettings()) {
            return (<div>
                nothing
            </div>)
        } else {
            return (<div>{this.state.posts.map((post, index) => this.renderOnePost(post, index))}</div>)
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
                    {this.renderPosts()}
                </div>
            </div>
        );
    }
}