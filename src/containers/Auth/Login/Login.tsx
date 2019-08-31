import React, {Component} from 'react';
import './Login.scss'
import Validator from "../../../Utill/Validator";
import {login} from "../../../redux/auth";
import {connect} from "react-redux";
import logo from 'assets/images/logo-5.png';
import logoLeft from 'assets/images/house.png';

const {MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow} = require("mdbreact");

class Login extends Component<any, any> {
    validator = new Validator();

    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: {username: '', password: ''}

        }
    }

    validateInput = (input: any, field: any) => {
        let update = {};

        switch (field) {
            case "username":
                update = {username: input};
                break;
            case "password":
                update = {password: input};
                break;
            default:
                update = {...this.state}
        }

        this.setState(update, () => {
            const {username, password} = this.state;
            const payload = {username, password};
            this.validator.loginValidator(payload).then((ee => {
                this.setState({errors: {}})
            })).catch(errors => {
                this.setState({errors})

            })
        });
    };

    login = async () => {
        const {dispatch} = this.props;
        const {username, password} = this.state;
        const payload = {username, password};
        try {
            await dispatch(login(payload));
        } catch (e) {
            console.log("errors", e)
        }
    };
componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
    if(prevProps!==this.props){
        const {error,authError,history} = this.props
        console.log(authError)
        if(authError === 'User not Verified!'){
            history.push("/otp-verification");

        }
        if(!error){
             history.push("/");
        }

    }
}

    render() {
        const {errors} = this.state;
        const {error, authError} = this.props;
        return (
            <MDBContainer fluid>
                <MDBRow>
                    <MDBCol md="6" className="hc-login-left d-none d-sm-block">
                        <MDBContainer fluid className="remove-padding-container">
                            <MDBRow className="login-container-view">
                                <MDBCol md="12" sm="12" xs="12">
                                    <p className="text-center hc-left-title">Enjoy! a variety of cuisines and dishes from talented home chefs near you.</p>
                                    <p className="text-center hc-left-subTitle">Food in India is not just food ,but it's a legacy passed on from one generation to another
                                    .Try different home made delicacies from a variety of home chefs cooking especially for you .Get that home made feeling .Its not just food ,It's
                                    an emotion.</p>
                                </MDBCol>

                            </MDBRow>

                            <MDBRow bottom>
                                <MDBCol md="12" sm="12" xs="12">
                                    <img src={logoLeft} alt="logo" className="logo-house" />
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    </MDBCol>
                    <MDBCol md="6" sm="12" xs="12" className="hc-login">
                        <div>
                            <MDBRow className="d-flex justify-content-center align-middle">
                                <MDBCol size="12" className="text-center">
                                    <img src={logo} alt="logo" className="logo-main" onClick={()=>this.props.history.push("/")}/>

                                </MDBCol>
                                <MDBCol md="12" sm="12" xs="12">
                                    <p className="text-center hc-login-subTitle">Log in to your Food Delivery</p>
                                    {!!error &&
                                    <div><p className="red-text hc-error text-center mb-3">{authError}!</p></div>}

                                </MDBCol>
                                <MDBCol md="6" sm="12" xs="12" className="hc-remove-rt-lt-padding">
                                    <div className="form-group">
                                        <input type="email" placeholder="Email/Mobile"
                                               className="form-control hc-remove-border"
                                               onChange={(evt) => this.validateInput(evt.target.value, "username")}
                                        />
                                        {!!errors && errors.username &&
                                        <div><p className="red-text hc-error">{errors.username}!</p></div>}

                                    </div>
                                    <div className="form-group">
                                        <input type="password" placeholder="password" className="form-control"
                                               onChange={(evt) => this.validateInput(evt.target.value, "password")}
                                        />
                                        {!!errors && errors.password &&
                                        <div><p className="red-text hc-error">{errors.password}!</p></div>}

                                    </div>
                                    <a href="#!">
                                        <p className="text-right hc-forgot-password">Forgot Password.</p>
                                    </a>
                                    <div className="text-center">
                                    <MDBBtn rounded color="primary" className="hc-submit-text"
                                            onClick={() => this.login()}>Submit</MDBBtn>
                                    </div>
                                    <MDBInput labelClass="hc-remember-email" label="Remember email" type="checkbox"
                                              id="checkbox1"/>
                                    <MDBRow center>
                                        <MDBCol size="2" md="3" className="hc-remove-rt-lt-padding">
                                            <span className="border-bottom border-dark d-block hc-line"/>
                                        </MDBCol>
                                        <MDBCol size="6" className="hc-remove-rt-lt-padding">
                                            <p className="text-center hc-connect-with">OR CONNECT WITH</p>
                                        </MDBCol>
                                        <MDBCol size="2" md="3" className="hc-remove-rt-lt-padding">
                                            <span className="border-bottom border-dark d-block hc-line"/>
                                        </MDBCol>
                                    </MDBRow>
                                    <div className="hc-icons-container">
                                        <a href="#!">
                                            <div className="hc-fb-icon">
                                                <MDBIcon fab icon="facebook-f" size="2x" className="white-ic"/>
                                            </div>
                                        </a>
                                        <a href="#!">
                                            <div className="hc-google-icon">
                                                <MDBIcon fab icon="google" size="2x" className="white-ic"/>
                                            </div>
                                        </a>
                                    </div>
                                    <div>
                                        <p className="text-center hc-signup-text"> Create a new account. <a
                                            href="/signup" className="text-reset"><span
                                            className="text-black font-weight-bold">SignUp</span></a></p>
                                    </div>
                                </MDBCol>
                            </MDBRow>
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        login: state.auth.login,
        error: state.auth.error,
        authError: state.auth.authError,
        user: state.auth.user
    }
};

const UserLogin = connect(mapStateToProps)(Login);
export default UserLogin;
