import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Dish from "../Dish/Dish";
import "./NewDishes.scss"
const {MDBBtn,MDBRow,MDBCol} = require("mdbreact");

interface Props {
    dishes?: any
}

interface State {
    activeDishIndex?: number

}

class NewDishes extends React.Component<Props, State> {
    state = {
        activeDishIndex: 1
    };

    nextSlide =() =>{
        const {activeDishIndex} = this.state;
        const currentSlide = activeDishIndex +1;
        this.setState({activeDishIndex: currentSlide})
    }
    render() {
        return (
            <div className="new-dishes">
                {/*<MDBBtn flat onClick={this.nextSlide}>Next</MDBBtn>*/}
                <Carousel
                    additionalTransfrom={0}
                    arrows={false}
                    autoPlaySpeed={3000}
                    centerMode={false}
                    containerClass="container"
                    dotListClass=""
                    draggable
                    focusOnSelect={false}
                    infinite={true}
                    itemClass=""
                    keyBoardControl
                    minimumTouchDrag={80}
                    responsive={{
                        desktop: {
                            breakpoint: {
                                max: 3000,
                                min: 1024
                            },
                            items: 6,
                            paritialVisibilityGutter: 40
                        },
                        mobile: {
                            breakpoint: {
                                max: 430,
                                min: 0
                            },
                            items: 2,
                            paritialVisibilityGutter: 30
                        },
                        tablet: {
                            breakpoint: {
                                max: 1024,
                                min: 464
                            },
                            items: 2,
                            paritialVisibilityGutter: 30
                        }
                    }}
                    showDots={false}
                    sliderClass=""
                    slidesToSlide={1}
                    swipeable
                >
                    <Dish/>
                    <Dish/>
                    <Dish/>
                    <Dish/>
                    <Dish/>
                    <Dish/>
                    <Dish/>
                    <Dish/>
                    <Dish/>
                    <Dish/>

                </Carousel>
                <MDBRow center className="view-all-btn mt-5">
                    <MDBCol md="12">
                        <MDBBtn color="primary" outline rounded className="view-btn">View All...</MDBBtn>
                    </MDBCol>
                </MDBRow>
            </div>
        )
    }
}

export default NewDishes;
