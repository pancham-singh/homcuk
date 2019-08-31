    import React from 'react';
import Dish from "components/Dish";
import "./Dishes.scss";
import {connect} from "react-redux";
import {getDishes} from "../../../redux/dish";

const {MDBContainer} = require("mdbreact");

class Dishes extends React.Component<any, any> {
    async componentDidMount() {
       await this.fetchDishes()
    }

    fetchDishes = async () => {
        const {dispatch, user} = this.props;
        if (!!user) {
            const {id: chef} = user;
            try {
                const filters = {
                    filters: {
                        chef: chef
                    },
                    paginated: {
                        limit: 20,
                        next: null,
                        previous: null,
                    },
                    sort: {
                        field: 'createdAt',
                        ascending: false
                    }
                };
                await dispatch(getDishes(filters))
            } catch (e) {
                console.log(e)
            }
        }
    };
    async componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any) {
        if(prevProps!==this.props){
            await this.fetchDishes();
        }
    }

    render() {
        const {dishes} = this.props;
        const dishList = dishes.map((dish: any) => (
            <div key={ dish.id }><Dish dish={ dish } chefDish/></div>
        ));
        return (
            <MDBContainer>
                <div>
                    <p className="dish-heading">Dishes</p>
                </div>
                <div
                    className={ `d-flex ${ dishList.length % 3 === 0 ? 'justify-content-around' : 'justify-content-start' } flex-wrap` }>
                    { dishList }
                </div>
            </MDBContainer>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        user: state.auth.user,
        dishes: state.dish.dishes,
        loading: state.dish.loadingDishes
    }
};

const ChefDishes = connect<any, any, void>(mapStateToProps)(Dishes);
export default ChefDishes;
