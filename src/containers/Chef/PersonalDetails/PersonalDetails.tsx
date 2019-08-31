import React from 'react';
import "./PersonalDetails.scss";
import Validator from "../../../Utill/Validator";
import {connect} from "react-redux";
import avatar from 'assets/images/layer-46.png';
import {uploadFile} from "../../../redux/uploads";

const {MDBRow, MDBCol, toast, MDBProgress, MDBCardBody, MDBBtn} = require("mdbreact");

interface State {
    emailId: string,
    firstName: string,
    lastName: string,
    mobile: string,
    city: string,
    state: string,
    postalCode: string,
    address: string,
    errors: any
}

class PersonalDetails extends React.Component<any, State> {
    validator = new Validator();

    constructor(props: any) {
        super(props);
        this.state = {
            emailId: '',
            firstName: '',
            lastName: '',
            mobile: '',
            city: '',
            state: '',
            postalCode: '',
            address: '',
            errors: {
                emailId: '',
                firstName: '',
                lastName: '',
                mobile: '',
                city: '',
                state: '',
                postalCode: '',
                address: ''
            }
        }

    }

    componentDidUpdate(prevProps: any): void {
        const {user, userAddress} = this.props;
        if (user) {
            const {
                emailId,
                firstName,
                lastName,
                mobile,
            } = user;
            if (prevProps !== this.props) {
                this.setState({
                    emailId,
                    firstName,
                    lastName,
                    mobile,
                });
                if (userAddress) {
                    const {
                        street1: address,
                        city,
                        state,
                        pinCode: postalCode
                    } = userAddress;
                    this.setState({
                        address,
                        city,
                        state,
                        postalCode
                    })
                }

            }


        }
    }

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
            case "address":
                update = {address: input};
                break;
            case "city":
                update = {city: input};
                break;
            case "state":
                update = {state: input};
                break;
            case "postalCode":
                update = {postalCode: input};
                break;
            default:
                update = {...this.state}

        }

        this.setState(update, () => {
            const {firstName, lastName, mobile, emailId, city, state, postalCode, address} = this.state;
            const payload = {firstName, lastName, mobile, city, state, postalCode, emailId, address};
            this.validator.profileValidator(payload).then((ee => {
                this.setState({errors: {}})
            })).catch(errors => {
                this.setState({errors})

            })
        });
    };


    updateProfile = async () => {
        const {onSubmit, fileResponse} = this.props;
        const {firstName, lastName, mobile, emailId, city, state, postalCode, address} = this.state;
        let payload = {firstName, lastName, mobile, emailId, city, state, postalCode, address};
        if (!!fileResponse) {
            payload = {...payload, ...{profilePic: fileResponse.path}}
        }
        try {
            await onSubmit(payload);
            await toast.success("Details Updated Successfully");
        } catch (e) {
            await toast.error("Something Went Wrong!");

        }
    };
    uploadMedia = async (files: any) => {
        const {dispatch} = this.props;
        try {
            await dispatch(uploadFile(files));
        } catch (e) {
            console.log(e)
        }
    };
    selectFileToUpload = () => {
        const input = document.getElementById("profile-pic");
        if (input) {
            input.click();
        }

    };

    render() {
        const {
            emailId,
            firstName,
            lastName,
            mobile,
            address,
            city,
            state,
            postalCode,
        } = this.state;
        const {loading, fileResponse,user,uploadProgress,uploading} = this.props;
        const profilePic = !!user && !!user.profilePic ? user.profilePic:avatar;
        return (
            <MDBCardBody>
                {loading && <MDBProgress color="primary" material preloader/>}
                {uploading && <MDBProgress className="my-2" material value={uploadProgress} color="success"/>}
                <MDBRow>
                    <input type="file" id="profile-pic" className="file-input"
                           onChange={(evt) => {
                               this.uploadMedia(evt.target.files);
                           }}/>
                    <MDBCol size="12" md="6" className="d-block d-sm-none text-center ">
                        <img
                            src={!!fileResponse ? fileResponse.path : profilePic}
                            alt=""
                            className="rounded-circle profile-image mx-auto"
                            onClick={() => this.selectFileToUpload()}
                        />
                        <div>
                            <p className="font-weight-bold mb-4 chef-name text-center">{`${firstName} ${lastName}`}</p>
                        </div>
                    </MDBCol>
                    <MDBCol size="12" md="6">
                        <div className="mt-3">
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="First Name"
                                    defaultValue={firstName}
                                    onChange={(evt) => this.validateInput(evt.target.value, "firstName")}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Last Name"
                                    defaultValue={lastName}
                                    onChange={(evt) => this.validateInput(evt.target.value, "lastName")}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Email"
                                    defaultValue={emailId}
                                    onChange={(evt) => this.validateInput(evt.target.value, "emailId")}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Mobile"
                                    defaultValue={mobile}
                                    onChange={(evt) => this.validateInput(evt.target.value, "mobile")}
                                />
                            </div>
                            <div className="form-group">
                                          <textarea
                                              className="form-control"
                                              placeholder="Address"
                                              rows={3}
                                              value={address}
                                              onChange={(evt) => this.validateInput(evt.target.value, "address")}
                                          />
                            </div>
                            <div className="text-right d-none d-sm-block">
                                <MDBBtn rounded color="secondary">Locate on Map</MDBBtn>
                            </div>
                            <div className="text-center d-block d-sm-none">
                                <MDBBtn rounded color="secon-dary">Locate on Map</MDBBtn>
                            </div>
                        </div>
                    </MDBCol>
                    <MDBCol md="6" xs="12" sm="12">
                        <div className="text-center">
                            <img
                                src={!!fileResponse ? fileResponse.path : profilePic}
                                alt=""
                                className="rounded-circle profile-image d-none d-sm-block mx-auto"
                                onClick={() => this.selectFileToUpload()}

                            />
                            <div className="d-none d-sm-block">
                                <p className="font-weight-bold mb-4 chef-name text-center mx-auto">{`${firstName} ${lastName}`}</p>
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="City"
                                    defaultValue={city}
                                    onChange={(evt) => this.validateInput(evt.target.value, "city")}

                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="State"
                                    defaultValue={state}
                                    onChange={(evt) => this.validateInput(evt.target.value, "state")}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Postal Code"
                                    defaultValue={postalCode}
                                    onChange={(evt) => this.validateInput(evt.target.value, "postalCode")}
                                />
                            </div>
                        </div>
                        <div className="text-left d-none d-sm-block">
                            <MDBBtn rounded color="primary" onClick={this.updateProfile}>Next Step</MDBBtn>
                        </div>
                        <div className="text-center d-block d-sm-none">
                            <MDBBtn rounded color="primary" onClick={this.updateProfile}>Next Step</MDBBtn>
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBCardBody>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        loading: state.auth.loading,
        uploading: state.uploads.uploading,
        fileResponse: state.uploads.response,
        uploadProgress: state.uploads.uploadProgress,
        loadingDocument: state.documents.loadingDocument,
        user: state.auth.user
    }
};
const UserDetails = connect<any, any, any>(mapStateToProps)(PersonalDetails);

export default UserDetails;
