import React from 'react';
import "./Dish.scss"
import dishImage from 'assets/images/layer-63_2.png';

const {MDBView} = require("mdbreact");

class Dish extends React.Component <any, any> {

    render() {
        const {dish, chefDish} = this.props;
        return (
            <MDBView waves className="dish">
                <div>
                    <img
                        src={!!dish && !!dish.media && !!dish.media.length ? dish.media[0].url : dishImage }
                        className="img-fluid dish-image"
                        alt=""
                    />
                </div>
                <div>
                    {!!dish &&  <p className="name">{ dish.dishName }</p>}
                    { !chefDish && <p className="address">Gandhi Nagar Delhi</p> }
                    { !chefDish && <p className="off">40% off</p> }
                    { chefDish && <p className="address">{ dish.cuisines.join(", ") }</p> }
                    { chefDish && <p className="off">INR { dish.price } /-</p> }

                </div>

            </MDBView>
        )
    }
}

export default Dish;
