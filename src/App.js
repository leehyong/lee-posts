import './styles/index.css';
import {Component} from "react";
import {LeeHeader} from "./post/header";
import {LeeContent} from "./post/content";

class App extends Component {
    render() {
        return (
            <div className="App">
                <LeeHeader/>
                <LeeContent/>
            </div>
        );
    }
}

export default App;
