import React from 'react';
import "./Profile.scss";
import PersonalDetails from "../PersonalDetails/PersonalDetails";
import BankDetails from "../BankDetails/BankDetails";
import Documents from "../Documents/Documents";
import {connect} from "react-redux";
import {addAddress, getAddress, getUser, updateAddress, updateUser} from "../../../redux/auth";
import {getDocuments} from "../../../redux/documents";
import {getBankDetails} from "../../../redux/payments";

const {MDBRow, MDBCol, MDBListGroup, MDBListGroupItem, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBCardHeader, MDBCard} = require("mdbreact");

interface State {
    step: number;
}

class Profile extends React.Component<any, State> {
    state = {
        step: 1,
    };

    selectStep = (step: number) => {
        this.setState({
            step
        })
    };

    async componentDidMount() {
        const {dispatch} = this.props;
        await dispatch(getUser());
        await dispatch(getAddress());
        await dispatch(getDocuments());
        await dispatch(getBankDetails());

    }

    updatePersonalDetails = async (userDetails: any) => {
        const {dispatch, userAddress} = this.props;
        const {firstName, lastName, emailId, address: street1, city, state, postalCode: pinCode, profilePic} = userDetails;
        let userPayload = {firstName, lastName, emailId};
        if (!!profilePic) {
            userPayload = {
                ...userPayload, ...{profilePic}
            }
        }
        const addressPayload = {street1, pinCode, city, state, country: "India"};
        try {
            await dispatch(updateUser(userPayload));
            await !!userAddress ? dispatch(updateAddress(addressPayload)) : dispatch(addAddress(addressPayload));
            await dispatch(getAddress());
            await dispatch(getUser());

            await this.selectStep(2);
        } catch (error) {
            console.log(error)
        }
    };

    render() {
        const {step} = this.state;
        const {user, userAddress, documents, bankDetails} = this.props;
        const steps = ["Basic Info", "Proof Upload", "Add Bank Details"];
        const renderSteps = steps.map((name, index) => {
            return (
                <MDBListGroupItem key={index + 'step'} href="#" className={index + 1 === step ? "step-active" : "step"}
                                  onClick={() => this.selectStep(index + 1)}>{name}</MDBListGroupItem>)
        });
        const renderNav = steps.map((name, index) => {
            return (
                <MDBDropdownItem key={index + 'step'} href="#"
                                 className={index + 1 === step ? "step-active" : "step"}
                                 onClick={() => this.selectStep(index + 1)}>{name}</MDBDropdownItem>)
        });
        return (
            <div>
                <MDBRow>
                    <MDBCol md="4" sm="12" xs="12" className="d-none d-sm-block">
                        <MDBListGroup style={{width: "22rem"}}>
                            {renderSteps}
                        </MDBListGroup>
                    </MDBCol>
                    <MDBCol size="12" md="8">
                        <MDBCard>
                            <MDBCardHeader color="primary-color" tag="div">
                                <MDBRow between>
                                    <MDBCol size="8">
                                        {step === 1 && <p>My Profile</p>}
                                        {step === 2 && <p>Upload Your Documents</p>}
                                        {step === 3 && <p>Bank Details</p>}

                                    </MDBCol>
                                    <MDBCol size="4" className="text-right d-block d-sm-none">
                                        <MDBDropdown tag="div">
                                            <MDBDropdownToggle nav>
                                                <MDBIcon icon="bars" className="white-text"/>
                                            </MDBDropdownToggle>
                                            <MDBDropdownMenu className="dropdown-default mr-5">
                                                {renderNav}
                                            </MDBDropdownMenu>
                                        </MDBDropdown>
                                    </MDBCol>
                                </MDBRow>

                            </MDBCardHeader>
                            {step === 1 && <PersonalDetails user={user} userAddress={userAddress} activeStep={step}
                                                            onSubmit={(data: any) => this.updatePersonalDetails(data)}
                            />}
                            {step === 2 && <Documents user={user} documents={documents}/>}
                            {step === 3 && <BankDetails user={user} bankDetails={bankDetails}/>}

                        </MDBCard>
                    </MDBCol>

                </MDBRow>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        user: state.auth.user,
        userAddress: state.auth.userAddress,
        documents: state.documents.documents,
        bankDetails: state.payments.bankDetails
    }
};

const UserProfile = connect<any, any, void>(mapStateToProps)(Profile);
export default UserProfile;
