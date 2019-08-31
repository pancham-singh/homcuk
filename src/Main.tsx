import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Route, Router, Switch} from 'react-router';
import AuthLogin from './containers/Auth/Login';
import AuthSignUP from './containers/Auth/Register';
import Landing from "./containers/Landing/Landing";
import Chef from "./containers/Chef/Chef";
import OTPVerification from "./containers/Auth/OTPVarification/OTPVerification";
import TermsAndConditions from "./containers/Public/TermsAndConditions";
import Cancellation from "./containers/Public/Cancellation";
import User from "./containers/User";
import Search from "./containers/Search";
import ChefDetails from "./containers/Chef/ChefDetails/ChefDetails";
//
// const ProtectedRoute = (props: any) => {
//     let user = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('hc-user'))));
//     const isAuthenticated = !!user;
//     const {component: Component, ...rest} = props;
//     let path = props.path === "/otp-verification" ? '/signup' : '/login';
//
//     return (
//         <Route { ...rest } render={ (props) => (
//             isAuthenticated ?
//                 <Component { ...props } /> : <Redirect to={ {pathname: path, state: {from: props.location}} }/>
//         ) }/>
//     );
// };

const ProtectedLandingRoute = ({...rest}) => {
    let user = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('hc-user'))));
    const isAuthenticated = !!user;
    let path = "/";
    if (isAuthenticated) {
        path = user.userRole === "user" ? '/' : '/chef';
    }
    return (
        <Route { ...rest } render={ (props) => (
            isAuthenticated ?
                <Redirect to={ {pathname: path, state: {from: props.location}} }/>
                : <Landing { ...props } />
        ) }/>
    );
};

class MainComponent extends React.Component<any, any> {

    render() {
        return (<div>
            <Router history={ this.props.history }>
                <div>
                    <Switch>
                        <ProtectedLandingRoute exact path="/" component={ Landing }/>
                        <Route exact path="/login" render={ (props) => <AuthLogin { ...props } /> }/>
                        <Route exact path="/signup" render={ (props) => <AuthSignUP { ...props } /> }/>
                        <Route exact path="/terms-and-conditions"
                               render={ (props) => <TermsAndConditions { ...props } /> }/>
                        <Route exact path="/refunds-and-cancellations"
                               render={ (props) => <Cancellation { ...props } /> }/>
                        <Route exact path="/otp-verification"
                                        render={ (props: any) => <OTPVerification { ...props } /> }/>
                        <ProtectedLandingRoute path="/chef" component={ Chef }/>
                        <ProtectedLandingRoute path="/user" component={ User }/>
                        <Route exact path="/search" render={ (props) => <Search { ...props } /> }/>
                        <Route exact path="/search/chef" render={ (props) => <ChefDetails { ...props } /> }/>

                    </Switch>
                </div>
            </Router>
        </div>);
    }
}

const mapStateToProps = (state: any) => {
    return {
        user: state.auth.user
    };
};

const Main = connect(mapStateToProps)(MainComponent);

export default Main;
