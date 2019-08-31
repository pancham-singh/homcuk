import React, {Component} from 'react';
import "./OTPVerification.scss";
import logo from 'assets/images/logo-5.png'
import {connect} from "react-redux";
import {getUser, resendOtp, setUser, verifyOtp} from "../../../redux/auth";

const {MDBRow, MDBCol, MDBContainer, MDBBtn, MDBCard, MDBMedia} = require("mdbreact");

class OTPVerification extends Component<any, any> {

    state = {
        countDown: 60,
        otp: ''
    };

    componentDidMount(): void {
        const {dispatch} = this.props;
        dispatch(setUser());
        setInterval(() => {
            if (this.state.countDown >= 1) {
                this.setState({countDown: this.state.countDown - 1})
            }
        }, 1000);

    }

    onChange = (value: string, inputId: number = 0) => {
        const {otp} = this.state;
        const newOtp = `${otp}${value}`;
        this.setState({otp: newOtp});
        if (value.length >= 1) {
            const id = `${inputId + 1}otp`;
            const element = document.getElementById(id);
            if (element) {
                element.focus()
            }
        }

    };

    verify = async () => {
        const {user, dispatch, history} = this.props;
        const {mobile} = user;
        console.log(user);
        const {otp} = this.state;
        try {
            await dispatch(verifyOtp({mobile, otp}));
            await dispatch(getUser());
            await history.push("/");
        } catch (e) {

        }
    };

    resendOtp = async () => {
        const {user, dispatch} = this.props;
        const {mobile} = user;
        try {
            await dispatch(resendOtp({mobile}));
        } catch (e) {

        }
    };

    render() {
        const {countDown} = this.state;
        const {user} = this.props;
        let userMobile =!!user ? user.mobile :'';

        const otpInput = [1, 2, 3, 4, 5, 6].map(inputIndex => {
            return (
                <MDBCol size="2" md="2" key={"opt" + inputIndex} className="otp-input">
                    <div className="form-group">
                        <input
                            type="text"
                            maxLength={1}
                            className="form-control text-center"
                            onChange={(evt) => this.onChange(evt.target.value, inputIndex)}
                            id={inputIndex + "otp"}
                        />
                    </div>
                </MDBCol>
            )
        });
        return (
            <MDBContainer className="otp-container">
                <MDBRow center>
                    <MDBCol md="8">
                        <MDBCard className="card-body text-center">
                            <MDBRow>
                                <MDBCol md="12">
                                    <MDBMedia object src={logo} alt="logo" className="logo-image"/>
                                </MDBCol>

                            </MDBRow>
                            <MDBRow center>
                                <MDBCol md="12">
                                    <p>Please Verify Your Mobile Number</p>
                                    <p>OTP sent on {userMobile}</p>

                                </MDBCol>
                            </MDBRow>
                            <MDBRow center>
                                <MDBCol md="12">
                                    {countDown > 0 && <p>{countDown}</p>}
                                    <MDBBtn flat onClick={() => this.resendOtp()}>Resend If not received</MDBBtn>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow center>
                                {otpInput}
                            </MDBRow>
                            <MDBRow center>
                                <MDBCol md="12">
                                    <MDBBtn rounded color="primary" onClick={() => this.verify()}>Verify</MDBBtn>
                                </MDBCol>
                            </MDBRow>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        user: state.auth.user,
        verified: state.auth.otpVerify
    }
};

const UserOTPVerification = connect(mapStateToProps)(OTPVerification);
export default UserOTPVerification;
