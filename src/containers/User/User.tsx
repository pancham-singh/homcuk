import React, {Component} from "react";
import App from "../App/App";
import "./User.scss";
import {Icon} from 'react-icons-kit';
import {pin} from 'react-icons-kit/entypo/pin';
import {Route} from "react-router";
import OrderHistory from "./OrderHistory";
import Address from "./Address";
import {connect} from "react-redux";
import {getUser, updateUser} from "../../redux/auth";
import placeholderImage from "../../assets/images/layer-46.png";
import EditUserProfile from "../../components/EditUserProfile/EditUserProfile";
import {uploadFile} from "../../redux/uploads";

const {MDBContainer, MDBRow, MDBCol, MDBBtn, MDBModal, MDBModalBody, MDBSpinner, MDBProgress} = require("mdbreact");

class User extends Component<any, any> {
    state = {
        modal: false
    };

    toggleEditProfile = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    async componentDidMount() {
        const {dispatch} = this.props;
        await dispatch(getUser());
    }

    updateProfile = async (payload: any) => {
        const {dispatch} = this.props;
        try {
            await dispatch(updateUser(payload));

        } catch (e) {

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

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        if(prevProps !==this.props){
            const {fileResponse} = this.props;
            if(!!fileResponse){
                this.updateProfile({profilePic: fileResponse.path})
            }

        }
    }

    render() {
        const {match: {url}, history, location: {pathname}, user, loading, authError, uploading, uploadProgress} = this.props;

        return (
            <App  { ...this.props }>
                <div className="user-profile-container">
                    { uploading && <MDBProgress className="my-2" material value={ uploadProgress } color="success"/> }

                    <MDBContainer fluid className="user-profile-head p-1">
                        <MDBRow center>

                            <MDBCol md="2">
                                { !!user && <img src={ !!user && user.profilePic ? user.profilePic : placeholderImage }
                                                 alt="thumbnail" className="user-profile-pic"
                                                 onClick={ () => this.selectFileToUpload() }
                                /> }
                                <input type="file" id="profile-pic" className="d-none"
                                       onChange={ (evt) => {
                                           this.uploadMedia(evt.target.files);
                                       } }/>
                            </MDBCol>
                            <MDBCol md="7" className="p-4 d-flex justify-content-between">
                                <div>
                                    <p className="my-0 user-name">{ !!user ? `${ user.firstName } ${ user.lastName }` : '' }</p>
                                    <p className="my-0 user-details"><span><Icon icon={ pin }/></span> Plot No 123,Near
                                        Mandir Phase 8 ,Mohali</p>
                                    <p className="my-0 user-details"> { !!user ? `${ user.mobile } |  User :${ user.emailId }` : '' }</p>
                                </div>
                                <div>
                                    <MDBBtn flat className="user-edit-button bg-primary white-text"
                                            onClick={ this.toggleEditProfile }>Edit
                                        Profile</MDBBtn>
                                </div>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>

                    <MDBContainer>
                        <MDBRow>
                            <MDBCol md="12" className="px-0">
                                <MDBBtn flat
                                        className={ `user-edit-button ${ pathname === `${ url }/order-history` ? 'bg-primary white-text' : 'bg-light' }  user-profile-button` }
                                        onClick={ () => history.push(`${ url }/order-history`) }>Your Order
                                    History</MDBBtn>
                                <MDBBtn flat
                                        className={ `user-edit-button ${ pathname === `${ url }/address` ? 'bg-primary white-text' : 'bg-light' } user-profile-button` }
                                        onClick={ () => history.push(`${ url }/address`) }>Address</MDBBtn>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol md="12" className="px-0 rgba-white-strong">
                                <Route path={ `${ url }/order-history` } component={ OrderHistory }/>
                                <Route path={ `${ url }/address` } component={ Address }/>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </div>
                <MDBModal isOpen={ this.state.modal } toggle={ this.toggleEditProfile } fullHeight position="right">
                    <MDBModalBody>
                        <div className="text-center">
                            { loading && !authError && <MDBSpinner crazy/> }</div>
                        <p>{ authError }</p>

                        <EditUserProfile onClose={ this.toggleEditProfile } user={ user }
                                         updateProfile={ this.updateProfile }/>
                    </MDBModalBody>

                </MDBModal>
            </App>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        user: state.auth.user,
        loading: state.auth.loading,
        authError: state.auth.error,
        uploading: state.uploads.uploading,
        fileResponse: state.uploads.response,
        uploadProgress: state.uploads.uploadProgress,
    }
};
const UserProfile = connect(mapStateToProps)(User);
export default UserProfile;
