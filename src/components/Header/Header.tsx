import React from 'react';
import "./Header.scss";
import logo from "../../assets/images/logo-4.png"
import avatar from 'assets/images/layer-46.png';
import {connect} from "react-redux";
import {getUser, logout} from "../../redux/auth";

const {
    MDBNavbar, MDBNavbarBrand, MDBNavbarToggler,
    MDBCollapse, MDBContainer, MDBNavItem, MDBNavbarNav, MDBDropdownToggle, MDBDropdown, MDBDropdownMenu,MDBBadge, MDBDropdownItem, MDBBtnGroup, MDBBtn
} = require("mdbreact");

interface State {

}

class Header extends React.Component<any, State> {

    state = {
        isOpen: false
    };
    route = (path: string) => {
        const {history} = this.props;
        history.push(path);
    };
    logout = async () => {
        const {dispatch} = this.props;
        try {
            await dispatch(logout());
            await this.route('/login');
        } catch (e) {

        }

    };
    async componentDidMount() {
        const {dispatch} = this.props;
        await dispatch(getUser());
    }

    toggleCollapse = () => {
        this.setState({isOpen: !this.state.isOpen});
    };

    becomeChef= () =>{
        const {history} = this.props;
        history.push('/signup',{chef:true});
    };

    render() {
        const {user} = this.props;
        const chef = !!user && user.userRole === "chef";
       const login = !!user;

        return (
            <MDBContainer fluid className="header-container">
                <MDBNavbar expand="md" dark>
                    <div className="spacer d-none d-md-block d-lg-none"/>
                    <div className="spacer-xl d-none d-xl-block"/>

                    <MDBNavbarBrand>
                        <img src={logo} className="hc-logo" alt="logo" onClick={() => this.route("/")}/>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={() => this.toggleCollapse()} className="toggler"/>
                    <MDBCollapse isOpen={this.state.isOpen} navbar>

                        {!login && <MDBNavbarNav right>
                          <MDBNavItem className="text-left d-flex justify-content-start">
                            <MDBBtn rounded outline className="become-chef-btn d-none d-sm-block" color="primary" onClick={()=>this.becomeChef()}>BECOME
                              A CHEF</MDBBtn>
                            <MDBBtn rounded outline className="become-chef-btn-xs d-block d-sm-none" color="primary"  onClick={()=>this.becomeChef()}>BECOME
                              A CHEF</MDBBtn>

                            <MDBBtnGroup className="d-block d-sm-none d-flex justify-content-center mt-1 ">
                              <MDBBtn flat className="hc-header-button" href="/login">Login</MDBBtn>
                              <div className="hc-login-divider"/>
                              <MDBBtn flat className="hc-header-button" href="/signup">Sign Up</MDBBtn>
                            </MDBBtnGroup>
                          </MDBNavItem>
                          <MDBNavItem className="spacer d-none d-sm-block">
                            <MDBBtnGroup>
                              <MDBBtn flat className="hc-header-button button-auth mt-1" onClick={()=>this.route("/login")}>Login</MDBBtn>
                              <div className="hc-login-divider mt-3"/>
                              <MDBBtn flat className="hc-header-button button-auth mt-1"  onClick={()=>this.route("/signup")}>Sign Up</MDBBtn>
                            </MDBBtnGroup>
                          </MDBNavItem>
                        </MDBNavbarNav>}
                        {login && chef &&  <MDBNavbarNav left>
                          <MDBNavItem className="d-block d-sm-none ">
                            <div className="text-center">
                              <img
                                  src={avatar}
                                  alt=""
                                  className="rounded-circle"
                              />
                            </div>
                            <MDBBtn className="text-left" flat block onClick={() => this.route("/chef")}>Edit
                              Profile</MDBBtn>
                            <MDBBtn className="text-left" flat block
                                    onClick={() => this.route("/chef/notifications")}>Notification</MDBBtn>
                            <MDBBtn className="text-left" flat block href="#!">Get Help</MDBBtn>
                            <MDBBtn className="text-left" flat block onClick={() => this.route("/chef/dish")}>Add
                              Dish</MDBBtn>
                            <MDBBtn className="text-left" flat block onClick={() => this.route("/chef/dishes")}>Dishes</MDBBtn>
                            <MDBBtn className="text-left" flat block onClick={() => this.route("/chef/orders")}>View
                              Orders</MDBBtn>
                            <MDBBtn className="text-left" flat block href="#!">Order Packaging items</MDBBtn>
                            <MDBBtn className="text-left" flat block onClick={() => this.logout()}>Logout</MDBBtn>
                          </MDBNavItem>
                          <MDBNavItem active className="d-none d-sm-block">
                            <MDBBtn className="hc-header-button" flat onClick={() => this.route("/chef/dish")}>Add
                              Dish</MDBBtn>
                          </MDBNavItem>
                          <MDBNavItem  className="d-none d-sm-block">
                            <MDBBtn className="hc-header-button" flat onClick={() => this.route("/chef/dishes")}>Dishes</MDBBtn>
                          </MDBNavItem>
                          <MDBNavItem className="d-none d-sm-block">
                            <MDBBtn className="hc-header-button" flat onClick={() => this.route("/chef/orders")}>View
                              Orders</MDBBtn>
                          </MDBNavItem>
                          <MDBNavItem className=" d-none d-sm-block">
                            <MDBBtn className="hc-header-button" flat>Order Packaging items</MDBBtn>
                          </MDBNavItem>
                          <MDBNavItem className=" d-none d-sm-block">
                            <MDBBtn className="hc-header-button" flat>Your Earning</MDBBtn>
                          </MDBNavItem>
                        </MDBNavbarNav>}
                        {login && !chef &&  <MDBNavbarNav right>
                          <MDBNavItem  className="d-none d-sm-block">
                            <MDBBtnGroup>
                              <MDBBtn flat className="hc-header-button" href="/">Help</MDBBtn>
                              <div className="hc-login-divider"/>
                              <MDBBtn flat className="hc-header-button" href="/user/order-history">Hi {`${user.firstName}`}</MDBBtn>
                              <div className="hc-login-divider"/>
                              <MDBBtn flat className="hc-header-button" href="/user"><MDBBadge pill color="danger" className="mr-1">0</MDBBadge>Cart</MDBBtn>
                              <div className="hc-login-divider"/>
                              <MDBBtn flat className="hc-header-button" onClick={() => this.logout()}>Logout</MDBBtn>
                            </MDBBtnGroup>
                          </MDBNavItem>
                        </MDBNavbarNav>}
                        {login && chef && <MDBNavbarNav left className=" d-none d-sm-block">
                          <MDBNavItem className="text-center">
                            <MDBDropdown>
                              <MDBDropdownToggle nav>
                                <img
                                    src={!!user && user.profilePic ? user.profilePic : avatar}
                                    alt=""
                                    className="rounded-circle avatar"
                                />
                                <span className="black-text text-capitalize pl-1">{!!user ? `${user.firstName} ${user.lastName}` : ''}</span>

                              </MDBDropdownToggle>
                              <MDBDropdownMenu className="dropdown-default">
                                <MDBDropdownItem onClick={() => this.route("/chef")}>Edit Profile</MDBDropdownItem>
                                <MDBDropdownItem
                                    onClick={() => this.route("/chef/notifications")}>Notification</MDBDropdownItem>
                                <MDBDropdownItem href="#!">Get Help</MDBDropdownItem>
                                <MDBDropdownItem onClick={() => this.logout()}>Logout</MDBDropdownItem>
                              </MDBDropdownMenu>
                            </MDBDropdown>
                          </MDBNavItem>

                        </MDBNavbarNav>}

                    </MDBCollapse>
                    <div className="spacer d-none d-md-block d-lg-none"/>
                    <div className="spacer-xl d-none d-xl-block"/>

                </MDBNavbar>
            </MDBContainer>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        user: state.auth.user
    }
};
export default connect<any, any, any>(mapStateToProps)(Header);
