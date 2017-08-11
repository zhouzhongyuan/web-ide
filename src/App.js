import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
} from 'react-router-dom';
import 'typeface-roboto';
import AppBar from './component/AppBar';
import Home from './container/Home';
import Login from './container/Login';
import IDE from './container/IDE';
import ProjectList from './container/ProjectList';
import Project from './container/Project';
import { connect } from 'react-redux';

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
                        <li><Link to="/project">项目</Link></li>
                    </ul>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <PrivateRoute exact path="/project" component={ProjectList} isAuthenticated={this.props.isAuthenticated} />
                    {/* <PrivateRoute path="/project/:id" component={Project} /> */}
                    {/* <PrivateRoute path="/ide" component={IDE} /> */}
                </div>
            </Router>
        );
    }
}

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
    console.log(isAuthenticated);
    return (
        <Route
            {...rest}
            render={props => (
                isAuthenticated ?
                    <Component {...props} /> :
                    (<Redirect
                        to={{
                            pathname: '/login',
                            state: { from: props.location },
                        }}
                    />)
            )
            }
        />
    );
};

const mapStateToProps = function (state) {
    console.log(state.app.user);
    return {
        isAuthenticated: !!state.app.user.name,
    };
};
const mapDispatchToProps = function (dispatch) {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
