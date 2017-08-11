import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
} from 'react-router-dom';
import 'typeface-roboto';
import AppBar from './component/AppBar';
import Home from './container/Home';
import Login from './container/Login';
import IDE from './container/IDE';

class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Router>
                <div className="App">
                    <AppBar />
                    <ul>
                        <li><Link to="/">首页</Link></li>
                        <li><Link to="/login">登录</Link></li>
                        <li><Link to="/ide">编辑</Link></li>
                    </ul>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/ide" component={IDE} />
                </div>
            </Router>
        );
    }
}

export default App;
