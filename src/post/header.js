import {Component} from "react";
import {Space, Typography} from "antd";
// import {iconColor} from '../consts'
import {
    ArrowLeftOutlined,
    CheckOutlined,
    CopyOutlined
} from '@ant-design/icons';

const {Paragraph} = Typography;

export class LeeHeader extends Component {

    render() {
        return (
            <div className="header">
                <div className="back">
                    <a href="#">
                        <Space>
                            <ArrowLeftOutlined/>
                            <span>back</span>
                        </Space>
                    </a>
                </div>
                <div className="post">
                    <h1>Manage post</h1>
                    <div className="profile">
                        <div className="left">
                            <div className="icon-box">
                                <CheckOutlined className="check-icon"/>
                            </div>
                        </div>
                        <div className="right">
                            <div className="link">link to your profile</div>
                            <Paragraph copyable style={{marginBottom:0}}>
                                    <span className="addr">
                                        <a>https://twitter.com/p/12345</a>
                                </span>
                            </Paragraph>
                            {/*<div>*/}
                                {/*<span className="addr">*/}
                                {/*    /!*<Button type="link"></Button>*!/*/}
                                {/*    <a>https://twitter.com/p/12345</a>*/}
                                {/*</span>*/}
                                {/*<span><CopyOutlined className="copy"/></span>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}