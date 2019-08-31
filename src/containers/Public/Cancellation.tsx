import React, {Component} from "react";
import App from 'containers/App';
import "./Public.scss";

const {MDBContainer} = require("mdbreact");

class Cancellation extends Component {
    render() {
        return (
            <App  { ...this.props }>
                <MDBContainer>
                    <p className="public-heading text-center text-decoration-underline mt-5">Cancellations and
                        Refunds</p>
                    <ol type="1">
                        <li>
                            Cancellation
                            <ol type="i">
                                <li> As a general rule you shall not be entitled to cancel your order once you have
                                    received confirmation of the same. If you cancel your order after it has been
                                    confirmed, HomCuk shall have a right to charge you cancellation fee of a minimum INR
                                    75 upto the order value, with a right to either not to refund the order value or
                                    recover from your subsequent order, the complete/ deficit cancellation fee, as
                                    applicable, to compensate our restaurant and delivery partners. HomCuk shall also
                                    have right to charge you cancellation fee for the orders cancelled by HomCuk for the
                                    reasons specified under clause 1(iii) of this cancellation and refunds policy. In
                                    case of cancellations for the reasons attributable to HomCuk or its Merchants and
                                    delivery partners, HomCuk shall not charge you any cancellation fee.
                                </li>
                                <li>
                                    However, in the unlikely event of an item on your order being unavailable, we
                                    will contact you on the phone number provided to us at the time of placing the order
                                    and inform you of such unavailability. In such an event you will be entitled to
                                    cancel the entire order and shall be entitled to a refund in accordance with our
                                    refund policy.
                                </li>
                                <li>
                                    We reserve the sole right to cancel your order in the following circumstance:
                                    <ol type="a">
                                        <li>
                                            In the event of the designated address falls outside the delivery zone
                                            offered by us;
                                        </li>
                                        <li>
                                            Failure to contact you by phone or email at the time of confirming the
                                            order booking;
                                        </li>
                                        <li>
                                            Failure to deliver your order due to lack of information, direction or
                                            authorization from you at the time of delivery; or
                                        </li>
                                        <li>
                                            Unavailability of all the items ordered by you at the time of booking the
                                            order; or
                                        </li>
                                        <li>Unavailability of all the items ordered by you at the time of booking the
                                            order; or
                                        </li>
                                    </ol>
                                </li>
                            </ol>
                        </li>
                        <li>
                            Refunds
                            <ol type="i">
                                <li>
                                    You shall be entitled to a refund only if you pre-pay for your order at
                                    the time of placing your order on the Platform and only in the event of any
                                    of the following circumstances:
                                    <ol type="a">
                                        <li>
                                            Your order packaging has been tampered or damaged at the time of
                                            delivery;
                                        </li>
                                        <li>
                                            Us cancelling your order due to (A) your delivery location
                                            following outside our designated delivery zones; (B) failure to
                                            contact you by phone or email at the time of confirming the order
                                            booking; or (C) failure to contact you by phone or email at the time
                                            of confirming the order booking; or
                                        </li>
                                        <li>

                                            You cancelling the order at the time of confirmation due to
                                            unavailability of the items you ordered for at the time of booking.
                                        </li>
                                    </ol>
                                </li>
                                <li>
                                    ii. Our decision on refunds shall be at our sole discretion and shall be
                                    final and binding.
                                </li>
                                <li>
                                    All refund amounts shall be credited to your account within 3-4 business
                                    days in accordance with the terms that may be stipulated by the bank which
                                    has issued the credit / debit card.

                                </li>
                            </ol>
                        </li>

                        <li>


                            In case of payment at the time of delivery, you will not be required to pay for:
                            <ol type="i">
                                <li>
                                    Orders where the packaging has been tampered or damaged by us;
                                </li>
                                <li>
                                    Wrong order being delivered; or
                                </li>
                                <li>
                                     Items missing from your order at the time of delivery.
                                </li>
                            </ol>
                        </li>
                    </ol>
                </MDBContainer>
            </App>
        );
    }

}

export default Cancellation;
