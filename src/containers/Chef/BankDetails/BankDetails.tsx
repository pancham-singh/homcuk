import React from 'react';
import Validator from "../../../Utill/Validator";
import {connect} from "react-redux";
import {addBankDetails, getBankDetails, updateBankDetails} from "../../../redux/payments";

const {MDBRow, MDBCol, MDBCardBody, MDBBtn, toast, MDBProgress} = require("mdbreact");

class BankDetails extends React.Component<any, any> {

    validator = new Validator();
    errorValues = {
        bankName: '',
        bankAccountNumber: '',
        accountHolderName: '',
        ifscCode: '',
    };

    constructor(props: any) {
        super(props);

        this.state = {
            bankName: '',
            bankAccountNumber: null,
            confirmBankAccountNumber: null,
            accountHolderName: '',
            ifscCode: '',
            confirmAccountError: '',
            errors: this.errorValues
        }

    }

    validateInput = (input: any, field: any) => {
        let update = {};

        switch (field) {
            case "bankName":
                update = {bankName: input};
                break;
            case "bankAccountNumber":
                update = {bankAccountNumber: input};
                break;
            case "confirmBankAccountNumber":
                update = {confirmBankAccountNumber: input};
                break;
            case "accountHolderName":
                update = {accountHolderName: input};
                break;
            case "ifscCode":
                update = {ifscCode: input};
                break;
            default:
                update = {...this.state}
        }

        this.setState(update, () => {
            this.validatePayload()
        });
    };

    validatePayload = () => {
        const {bankName, bankAccountNumber, accountHolderName, ifscCode} = this.state;
        const payload = {bankName, bankAccountNumber, accountHolderName, ifscCode};
        this.validator.bankAccountValidator(payload).then((ee => {
            this.setState({errors: this.errorValues, valid: true})
        })).catch(errors => {
            this.setState({errors, valid: false})
        })
    };

    confirmAccount = () => {
        const {bankAccountNumber, confirmBankAccountNumber} = this.state;
        const error = bankAccountNumber === confirmBankAccountNumber ? '' : 'Account Number do not Matched.';
        this.setState({confirmAccountError: error, valid: error.length > 0})
    };

    submitBankAccoutnDetails = async () => {
        const {bankName, bankAccountNumber, accountHolderName, ifscCode, valid, confirmAccountError} = this.state;
        const payload = {bankName, bankAccountNumber, accountHolderName, ifscCode};
        const {dispatch, bankDetails} = this.props;
        await this.validatePayload();
        await this.confirmAccount();

        if (!confirmAccountError.length && valid) {
            try {
                await !!bankDetails && !!bankDetails.length ? dispatch(updateBankDetails({
                    ...payload,
                    acId: bankDetails[0].id
                })) : dispatch(addBankDetails(payload));
                await dispatch(getBankDetails());
                await toast.success(`Bank Details ${!!bankDetails && !!bankDetails.length ? 'Updated' : 'Added'} Successfully`);
            } catch (e) {
                await toast.error("Something went Wrong!");
            }
        }

    };


    componentDidMount(): void {
        const {bankDetails} = this.props;
        if (!!bankDetails && !!bankDetails.length) {
            const {bankName, bankAccountNumber, accountHolderName, ifscCode} = bankDetails[0];
            this.setState({
                bankName,
                bankAccountNumber,
                accountHolderName,
                ifscCode,
                confirmBankAccountNumber: bankAccountNumber
            });
        }
    }


    render() {
        const {errors, confirmAccountError} = this.state;
        const {loadingBankDetails} = this.props;
        const {bankName, bankAccountNumber, accountHolderName, ifscCode, confirmBankAccountNumber} = this.state;
        return (
            <MDBCardBody>
                {loadingBankDetails && <MDBProgress color="primary" material preloader/>}
                <MDBRow center>
                    <MDBCol md="10">
                        <div>
                            <p className="text-center">
                               Please Fill up the bank details below to receive direct payment in your bank account.
                            </p>
                        </div>
                    </MDBCol>
                    <MDBCol md="8">

                        <div className="mt-3">
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Bank Name"
                                    onChange={(evt) => this.validateInput(evt.target.value, "bankName")}
                                    onBlur={() => this.validatePayload()}
                                    defaultValue={bankName}
                                />
                                {!!errors && errors.bankName &&
                                <div><p className="red-text hc-error">{errors.bankName}!</p></div>}
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Account Number"
                                    onChange={(evt) => this.validateInput(evt.target.value, "bankAccountNumber")}
                                    onBlur={() => this.validatePayload()}
                                    defaultValue={bankAccountNumber}

                                />
                                {!!errors && errors.bankAccountNumber &&
                                <div><p className="red-text hc-error">{errors.bankAccountNumber}!</p></div>}
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Confirm Account Number"
                                    onChange={(evt) => this.validateInput(evt.target.value, "confirmBankAccountNumber")}
                                    onBlur={() => this.confirmAccount()}
                                    defaultValue={confirmBankAccountNumber}

                                />
                                {!!confirmAccountError.length &&
                                <div><p className="red-text hc-error">{confirmAccountError}!</p></div>}
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Name on the Bank"
                                    onChange={(evt) => this.validateInput(evt.target.value, "accountHolderName")}
                                    onBlur={() => this.validatePayload()}
                                    defaultValue={accountHolderName}

                                />
                                {!!errors && errors.accountHolderName &&
                                <div><p className="red-text hc-error">{errors.accountHolderName}!</p></div>}
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="IFSC Number"
                                    onChange={(evt) => this.validateInput(evt.target.value, "ifscCode")}
                                    onBlur={() => this.validatePayload()}
                                    defaultValue={ifscCode}

                                />
                                {!!errors && errors.ifscCode &&
                                <div><p className="red-text hc-error">{errors.ifscCode}!</p></div>}
                            </div>
                            <div className="text-center">
                                <MDBBtn rounded color="secondary"
                                        onClick={() => this.submitBankAccoutnDetails()}>Submit</MDBBtn>
                            </div>
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBCardBody>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        user: state.auth.user,
        loading: state.payments.loadingBankDetails
    }
};
const UserBankDetails = connect<any, any, any>(mapStateToProps)(BankDetails);
export default UserBankDetails;
