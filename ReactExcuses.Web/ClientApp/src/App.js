import React, { Component } from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import { AuthContextComponent } from './AuthContext';
import Home from './pages/Home';
import Signup from './pages/Signup.js';
import Login from './pages/Login';
import Logout from './pages/Logout';
import ViewAll from './pages/ViewAll';

export default class App extends Component {
    render() {
        return (
            <AuthContextComponent>
                <Layout>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/signup' component={Signup} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/logout' component={Logout} />
                    <Route exact path='/viewall' component={ViewAll} />
                </Layout>
            </AuthContextComponent>
        )
    }
}