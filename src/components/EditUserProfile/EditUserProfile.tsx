import React, {Component} from "react";

const {MDBBtn, MDBCloseIcon} = require("mdbreact");

class EditUserProfile extends Component<any, any> {
    state = {
        updatePhone: false,
        updateEmail: false,
        updatePassword: false,
        email: '',
        mobile: '',
        password: ''
    };

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        if (this.props !== prevProps) {
            const {user} = this.props;
            if(!!user){
                this.setState({
                    email: user.emailId,
                    mobile: user.mobile
                })
            }

        }
    }

    updateProfile = () => {
        const {email:emailId,mobile,password} = this.state;
        const {updateProfile} = this.props;
        let payload = {};
        if(!!emailId){
            payload = {...payload,emailId}
        }
        if(!!mobile){
            payload = {...payload,mobile}
        }
        if(!!password){
            payload = {...payload,password}
        }
        updateProfile(payload);
    };


    render() {
        const {updatePhone, updateEmail, updatePassword} = this.state;
        const {onClose, user} = this.props;
        return (
            <div className="m-4">
                <p><span><MDBCloseIcon className="float-left mr-2" onClick={ onClose }/></span>Edit Profile</p>
                <div>
                    <p>Phone Number</p>
                    { !updatePhone && <div className="d-flex justify-content-between border-bottom pb-3">
                      <span>{ !!user && user.mobile }</span>
                      <MDBBtn flat className="p-0 m-0 orange-text"
                              onClick={ () => this.setState({updatePhone: !updatePhone}) }>Change</MDBBtn>
                    </div> }
                    { updatePhone && <div>
                      <div className="form-group border p-1">
                        <label htmlFor="phone" className="px-2">Phone Number</label>
                        <input type="text" id="phone" className="form-control border-0"
                               defaultValue={ this.state.mobile }
                               onChange={ (evt) => this.setState({mobile: evt.target.value}) }/>
                      </div>
                      <div>
                        <MDBBtn color="secondary" flat className="btn-orange text-white" block onClick={this.updateProfile}>Update</MDBBtn>
                      </div>
                    </div> }
                </div>
                <div>
                    <p>Email</p>
                    { !updateEmail && <div className="d-flex justify-content-between border-bottom pb-3">
                      <span>{ !!user && user.emailId }</span>
                      <MDBBtn flat className="p-0 m-0 orange-text"
                              onClick={ () => this.setState({updateEmail: !updateEmail}) }>Change</MDBBtn>

                    </div> }
                    { updateEmail && <div>
                      <div className="form-group border p-1">
                        <label htmlFor="phone" className="px-2">Email</label>
                        <input type="text" id="phone" className="form-control border-0"
                               onChange={ (evt) => this.setState({email: evt.target.value}) }
                               value={ this.state.email }/>
                      </div>
                      <div>
                        <MDBBtn color="secondary" flat className="btn-orange text-white" block onClick={this.updateProfile}>Update</MDBBtn>
                      </div>
                    </div> }
                </div>
                <div>
                    <p>Password</p>
                    { !updatePassword && <div className="d-flex justify-content-between border-bottom pb-3">
                      <span>*********</span>
                      <MDBBtn flat className="p-0 m-0 orange-text"
                              onClick={ () => this.setState({updatePassword: !updatePassword}) }>Change</MDBBtn>
                    </div> }
                    { updatePassword && <div>
                      <div className="form-group border p-1">
                        <label htmlFor="phone" className="px-2">Password</label>
                        <input type="password" id="phone" className="form-control border-0"
                               onChange={ (evt) => this.setState({password: evt.target.value}) }/>
                      </div>
                      <div>
                        <MDBBtn color="secondary" flat className="btn-orange text-white" block onClick={this.updateProfile}>Update</MDBBtn>
                      </div>
                    </div> }
                </div>
            </div>
        )
    }
}

export default EditUserProfile;
