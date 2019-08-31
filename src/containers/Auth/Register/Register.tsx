import React, {Component} from 'react';
import "./Register.scss";
import Validator from "../../../Utill/Validator";
import {connect} from "react-redux";
import {registerUser} from "../../../redux/auth";
import logo from "../../../assets/images/logo-4.png";

const {MDBRow, MDBCol, MDBContainer, MDBBtn, MDBCard, MDBCardBody, MDBCardText, MDBIcon, MDBInput} = require("mdbreact");


class Register extends Component<any, any> {
    validator = new Validator();
    state = {
        userType: 1,
        firstName: '',
        lastName: '',
        mobile: '',
        emailId: '',
        authPassword: '',
        authPasswordConfirm: '',
        gender: 'male',
        isChef: false,
        authPasswordConfirmError: '',
        errors: {firstName: '', lastName: '', mobile: '', emailId: '', authPassword: ''}
    };

    onClick = (nr: any) => () => {
        this.setState({
            userType: nr,
            isChef: nr === 2
        });
    };

    validateInput = (input: any, field: any) => {
        let update = {};

        switch (field) {
            case "firstName":
                update = {firstName: input};
                break;
            case "lastName":
                update = {lastName: input};
                break;
            case "emailId":
                update = {emailId: input};
                break;
            case "mobile":
                update = {mobile: input};
                break;
            case "gender":
                update = {gender: input};
                break;
            case "authPassword":
                update = {authPassword: input};
                break;
            case "authPasswordConfirm":
                update = {authPasswordConfirm: input};
                break;
            default:
                update = {...this.state}

        }

        this.setState(update, () => {
            const {firstName, lastName, mobile, authPassword, authPasswordConfirm,isChef, emailId} = this.state;
            const payload = {firstName, lastName, mobile, authPassword, emailId, isChef};
            if(!!authPasswordConfirm.length){
                this.validatePassword();
            }
            this.validator.registerValidator(payload).then((ee => {
                this.setState({errors: {}})
            })).catch(errors => {
                this.setState({errors})

            })
        });
    };
    validatePassword = (): boolean => {
        const {authPassword, authPasswordConfirm} = this.state;
        const passwordError = authPassword === authPasswordConfirm ? '' : "Password didn't matched";
        this.setState({authPasswordConfirmError: passwordError});
        return !!passwordError.length
    };
    register = async () => {
        const {dispatch, history,authError ,error} = this.props;
        const {firstName, lastName, mobile, authPassword, isChef, emailId, gender} = this.state;
        const payload = {firstName, lastName, mobile, authPassword, isChef, emailId, gender};
        if(this.validatePassword()){
            return
        }
        try {
            await dispatch(registerUser(payload));
            if(!authError && !error){
                await history.push("/");
            }
        } catch (e) {
            console.log(e)
        }

    };
    componentDidMount(): void {
        const { location:{state}} = this.props;
        if(!!state){
            this.setState({userType:2});
        }
    }

    render() {
        const {errors} = this.state;
        const {error, authError} = this.props;

        return (
            <div className="register-container">
                <MDBContainer>
                    <MDBRow center>
                        <MDBCol md="8">
                            <MDBCard className="my-3">
                                <MDBCardBody>
                                    <p className="text-right">Already have an account? <a href="/login"
                                                                                          className="text-reset"><span
                                        className="text-black font-weight-bold">Login</span></a></p>
                                    <div className="text-center">
                                        <img src={logo} alt="logo" className="logo-main" onClick={()=>this.props.history.push("/")}/>

                                    </div>
                                    <MDBCardText className="text-center hc-subtitle">
                                        Create Your New Account
                                    </MDBCardText>
                                    {!!error &&
                                    <div><p className="red-text hc-error text-center mb-3">{authError}!</p></div>}


                                    <MDBRow center>
                                        <MDBCol md="8">
                                            <div className="form-group">
                                                <input type="text"
                                                       className="form-control hc-remove-border hc-register-inputs"
                                                       placeholder="First Name"
                                                       onChange={(evt) => this.validateInput(evt.target.value, "firstName")}
                                                />
                                                {!!errors && errors.firstName &&
                                                <div><p className="red-text hc-error">{errors.firstName}!</p></div>}
                                            </div>

                                            <div className="form-group">
                                                <input type="text"
                                                       className="form-control hc-remove-border hc-register-inputs"
                                                       placeholder="Last Name"
                                                       onChange={(evt) => this.validateInput(evt.target.value, "lastName")}
                                                />
                                                {!!errors && errors.lastName &&
                                                <div><p className="red-text hc-error">{errors.lastName}!</p></div>}
                                            </div>

                                            < div className="form-group">
                                                <input type="email"
                                                       className="form-control hc-remove-border hc-register-inputs"
                                                       placeholder="Email Address"
                                                       onChange={(evt) => this.validateInput(evt.target.value, "emailId")}
                                                />
                                                {!!errors && errors.emailId &&
                                                <div><p className="red-text hc-error">{errors.emailId}!</p></div>}
                                            </div>

                                            < div className="form-group">
                                                <input type="number"
                                                       className="form-control hc-remove-border hc-register-inputs"
                                                       placeholder="Mobile"
                                                       onChange={(evt) => this.validateInput(evt.target.value, "mobile")}
                                                />
                                                    {!!errors && errors.mobile &&
                                                    <div><p className="red-text hc-error">{errors.mobile}!</p></div>}
                                            </div>
                                            <div className="form-group">
                                                <select
                                                    className="browser-default form-control hc-remove-border hc-register-inputs"
                                                    placeholder="Gender"
                                                    onChange={(evt) => this.validateInput(evt.target.value, "gender")}>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                    <option value="not disclosed">Don't Want to Disclose</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <input type="password"
                                                       className="form-control hc-remove-border hc-register-inputs"
                                                       placeholder="Password"
                                                       onChange={(evt) => this.validateInput(evt.target.value, "authPassword")}
                                                />
                                                {!!errors && errors.authPassword &&
                                                <div><p className="red-text hc-error">{errors.authPassword}!</p></div>}
                                            </div>
                                            <div className="form-group">
                                                <input type="password"
                                                       className="form-control hc-remove-border hc-register-inputs"
                                                       placeholder="Confirm Password"
                                                       onChange={(evt) => this.validateInput(evt.target.value, "authPasswordConfirm")}
                                                />
                                                {!!this.state.authPasswordConfirmError &&
                                                <div><p
                                                    className="red-text hc-error">{this.state.authPasswordConfirmError}!</p>
                                                </div>}
                                            </div>
                                        </MDBCol>
                                        <MDBCol md="9">
                                            <div className="hc-user-types">
                                                <MDBInput gap onClick={this.onClick(1)}
                                                          checked={this.state.userType === 1}
                                                          label="Diner" type="radio"
                                                          id="radio1" className="hc-user-type"/>
                                                <MDBInput gap onClick={this.onClick(2)}
                                                          checked={this.state.userType === 2}
                                                          label="Chef" type="radio"
                                                          id="radio2" className="hc-user-type"/>
                                            </div>
                                        </MDBCol>
                                        <MDBCol md="9">
                                            {this.state.userType === 1 &&<p className="hc-description">Register Now to place order delicious home made food and get it delivered at your doorstep.</p>}
                                            {this.state.userType === 2 &&<p className="hc-description">Register Now if you can cook delicious & hygienic food, Start your home cooking service today.</p>}
                                        </MDBCol>
                                        <MDBCol size="12" md="8" className="text-center">
                                            <MDBBtn color="primary" rounded block
                                                    className="hc-register-submit"
                                                    onClick={() => this.register()}>Create Account</MDBBtn>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow center className="hc-bottom-text">
                                        <MDBCol size="3" md="2" className="text-right hc-remove-padding">
                                            <hr className="hc-line"/>
                                        </MDBCol>
                                        <MDBCol size="6" md="4" className="text-center">
                                            <p className="hc-connect-xs mt-1 d-block d-sm-none">OR CONNECT WITH</p>
                                            <p className="hc-connect d-none d-sm-block">OR CONNECT WITH</p>

                                        </MDBCol>
                                        <MDBCol size="3" md="2" className="text-left hc-remove-padding">
                                            <hr className="hc-line"/>
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
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        loading: state.auth.loading,
        user: state.auth.user,
        error: state.auth.error,
        authError: state.auth.authError
    }
};
const RegisterUser = connect(mapStateToProps)(Register)
export default RegisterUser;
