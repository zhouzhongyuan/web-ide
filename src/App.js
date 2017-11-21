import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Route,
    Link,
    Switch,
    withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import 'typeface-roboto';
import AppBar from './component/AppBar';
import Footer from './component/Footer';
import Home from './container/Home';
import Login from './container/Login';
import ProjectList from './container/ProjectList';
import TaskList from './container/TaskList';
import ProjectNew from './container/ProjectNew';
import TaskNew from './container/TaskNew';
import IDE from './container/IDE';
import PrivateRoute from './component/PrivateRoute';
import Divider from 'material-ui/Divider';

class App extends Component {
    static defaultProps = {
        isAuthenticated: false,
    }
    render() {
        return (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    overflowX: 'hidden',
                    overflowY: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                }}

            >
                <AppBar />
                {/*<ul>*/}
                    {/*<li><Link to="/">首页</Link></li>*/}
                    {/*<li><Link to="/project">项目</Link></li>*/}
                    {/*<li><Link to="/ide">编辑器</Link></li>*/}
                {/*</ul>*/}
                <Divider />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    {/* <Route exact path="/project" component={ProjectList} /> */}
                    <PrivateRoute exact path="/project" {...this.props} component={ProjectList} isAuthenticated={this.props.isAuthenticated} />
                    <PrivateRoute exact path="/project/new" {...this.props} component={ProjectNew} isAuthenticated={this.props.isAuthenticated} />
                    <PrivateRoute exact path="/task" {...this.props} component={TaskList} isAuthenticated={this.props.isAuthenticated} />
                    <PrivateRoute exact path="/task/new" {...this.props} component={TaskNew} isAuthenticated={this.props.isAuthenticated} />
                    <PrivateRoute exact path="/ide" {...this.props} component={IDE} isAuthenticated={this.props.isAuthenticated} />
                     {/* <PrivateRoute path="/project/:id" component={Project} /> */}
                </Switch>
                <Divider />
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    let isAuthenticated = false;
    try {
        isAuthenticated = !!state.get('app').user.name;
    } catch (e) {
        console.log(e); // eslint-disable-line
    }
    return ({
    isAuthenticated,
    // location: state.router.location,

});
};
App.propTypes = {
    isAuthenticated: PropTypes.bool,
};
export default withRouter(connect(mapStateToProps)(App));
