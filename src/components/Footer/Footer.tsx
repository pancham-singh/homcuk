import React from 'react';
import "./Footer.scss"
import footerLogo from 'assets/images/logo-5.png';
const {MDBFooter,MDBContainer,MDBRow,MDBCol} = require("mdbreact");
class Footer extends React.Component{
    render(){
        return(
            <MDBFooter className="footer-container">
                <MDBContainer>
                    <MDBRow center>
                        <MDBCol size="12" md="3" className="mx-auto mt-3 logo-container text-center">
                        <img src={footerLogo} alt="footer-log" className="footer-logo"/>
                        </MDBCol>
                        <hr className="w-100 clearfix d-md-none" />
                        <MDBCol size="12" md="6" className="mx-auto mt-3">
                            <p className="titles">Site Links</p>
                         <MDBRow end>
                             <MDBCol size="12" md="6" >
                            <p>
                                <a href="/" className="links">Home</a>
                            </p>
                            <p>
                                <a href="#!" className="links">Deliveries</a>
                            </p>
                            <p>
                                <a href="#!" className="links">Testimonials</a>
                            </p>
                            <p>
                                <a href="/refunds-and-cancellations"className="links">Refunds and Cancellations</a>
                            </p>
                             </MDBCol>
                             <MDBCol size="12" md="6">
                                 <p>
                                     <a href="#!" className="links">About</a>
                                 </p>
                                 <p>
                                     <a href="#!" className="links">Sitemap</a>
                                 </p>
                                 <p>
                                     <a href="#!" className="links">Contact</a>
                                 </p>
                                 <p>
                                     <a href="/terms-and-conditions" className="links">Terms & Conditions</a>
                                 </p>
                             </MDBCol>
                         </MDBRow>
                        </MDBCol>
                        <MDBCol size="12" md="3">
                            <p className="links">
                                 Phase 8B ,Block E-253 Mohali,Punjab(India)
                                Call Us 24/7
                            </p>
                            <p className="links">
                                <i className="fa fa-phone mr-3 phone-icon" />+91 7982242871
                            </p>
                            <a href="#!" className="btn-floating btn-sm  mx-1">
                                <i className="fab fa-twitter black-text" />
                            </a>
                            <a href="#!" className="btn-floating btn-sm  mx-1">
                                <i className="fab fa-facebook-f black-text" />
                            </a>
                            <a href="#!" className="btn-floating btn-sm  mx-1">
                                <i className="fab fa-instagram black-text" />
                            </a>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </MDBFooter>
        )
    }
}
export default Footer;
