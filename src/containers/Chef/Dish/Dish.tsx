import React from 'react';
import "./Dish.scss";
import Validator, {Media} from "../../../Utill/Validator";
import {connect} from "react-redux";
import {uploadFile} from "../../../redux/uploads";
import imagePlaceholder from 'assets/images/imgPlaceHolder.png';
import "react-picky/dist/picky.css";
import Picky from "react-picky";
import {addDish, getCuisines, getTimeSlots, getTypes} from "../../../redux/dish";
import ReactChipInput from "react-chip-input/dist";
import {getUser} from "../../../redux/auth";
const moment = require("moment");


const {MDBRow, MDBCol, MDBCard, MDBCardHeader, MDBCardBody, MDBBtn, MDBSwitch, toast, MDBProgress} = require("mdbreact");

class Dish extends React.Component<any, any> {

    validator = new Validator();
    arrayType: any[] = [];
    media: Media[] =[];
    errorType: any = {
        dishName: '',
        description: '',
        ingredients: '',
        serves: '',
        preparationTime: '',
        note: '',
        price: '',
        media: '',
        types: '',
        cuisines: '',
        timeSlotToBeServed: ''
    };
    state = {
        dishName: '',
        description: '',
        ingredients: this.arrayType,
        serves: 0,
        preparationTime: '',
        note: '',
        price: 0,
        media:this.media,
        types: this.arrayType,
        arrayValue: this.arrayType,
        cuisines: this.arrayType,
        isDraft: false,
        isSpeciality: false,
        availableForPreOrder: false,
        alwaysAvialable:false,
        fileIndex: 0,
        value: '',
        timeSlotToBeServed: '',
        slots: [],
        dateToBeServed: 0,
        valid: false,
        errors: this.errorType
    };


    validateInput = (input: any, field: any) => {
        let update = {};
        switch (field) {
            case "dishName":
                update = {dishName: input};
                break;
            case "description":
                update = {description: input};
                break;
            case "ingredients":
                update = {ingredients: input};
                break;
            case "serves":
                update = {serves: input};
                break;
            case "preparationTime":
                update = {preparationTime: input};
                break;
            case "price":
                update = {price: input};
                break;
            case "dateToBeServed":
                update = {dateToBeServed: moment(input).unix()};
                break;
            default:
                update = {...this.state}

        }

        this.setState(update, () => {
            this.validatePayload();
        });
    };

    validatePayload = () => {
        const {
            dishName, description, price,
            isDraft, isSpeciality, cuisines, types, media, serves,
            availableForPreOrder,
        } = this.state;
        const payload = {
            dishName, description, isSpeciality,
            isDraft, price, serves,
            media, types, cuisines, availableForPreOrder
        };
        this.validator.dishValidator(payload).then((ee => {
            this.setState({errors: this.errorType, valid: true})
        })).catch(errors => {
            this.setState({errors, valid: false});
        })
    };
    selectFileToUpload = (index: number) => {
        const input = document.getElementById("dishImage");
        this.setState({fileIndex: index});
        if (input) {
            input.click();
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
    selectCuisines = (value: any) => {
        this.setState({cuisines: value});
    };
    selectSlotToServe = (value: any) => {
        this.setState({slots: value, timeSlotToBeServed: value.id});

    };
    selectTypes = (value: any) => {
        this.setState({types: value});
    };

    async  componentDidMount() {
        const {dispatch} = this.props;
        try {
            await dispatch(getUser());
            await dispatch(getCuisines());
            await dispatch(getTypes());
            await dispatch(getTimeSlots());
        } catch (e) {
            console.log(e);
        }
        const chip = document.getElementsByName("chipInput");
        if (!!chip.length) {
            const input: HTMLInputElement = (chip[0] as HTMLInputElement);
            input.placeholder = "Add Ingredients"

        }
    }


    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        if (prevProps !== this.props) {
            const {fileResponse} = this.props;
            let {media, fileIndex} = this.state;
            if (!!fileResponse) {
                const {path: url, type} = fileResponse;
                // media[fileIndex] = ;
                if(!!media.length){
                    media.splice(fileIndex, 0, {url, type, size: "DISH"});
                }else{
                    media.push({url, type, size: "DISH"})
                }
                this.setState(({media}),()=>{
                    this.validatePayload()
                });
            }

        }
    }

    addChip = (value: any) => {
        const ingredients = this.state.ingredients.slice();
        ingredients.push(value);
        this.setState({ingredients});
    };
    removeChip = (index: number) => {
        const ingredients = this.state.ingredients.slice();
        ingredients.splice(index, 1);
        this.setState({ingredients});
    };


    addNewDish = async () => {
        const {dispatch,history} = this.props;
        const {
            dishName, dateToBeServed,
            isSpeciality,
            availableForPreOrder, timeSlotToBeServed,
            ingredients, cuisines,
            types: type, description, media, serves, valid,price,isDraft
        } = this.state;
        await this.validatePayload();


        if (media.length <= 0) {
            toast.warn("Dish Images Are Missing.");
            return;
        }
        if (cuisines.length <= 0) {
            toast.warn("Cuisines Are Missing.");
            return;
        }
        if (type.length <= 0) {
            toast.warn("Dish Types Are Missing.");
            return;
        }
        if (!valid) {
            toast.warn("Please Enter Dish Details to Add.");
            return
        }
        try {
            let dishPayload = {
                dishName,
                serves,
                ingredients,
                cuisines,
                type,
                description,
                media,
                availableForPreOrder,
                isSpeciality,
                price,
                isDraft
            };
            if(!!dateToBeServed){
                dishPayload={...dishPayload,...{dateToBeServed}}
            }
            if(!!timeSlotToBeServed.length){
                dishPayload={...dishPayload,...{timeSlotToBeServed}}
            }
            await dispatch(addDish(dishPayload));
            await toast.success('Dish Add Success', {position: "top-right"});
            await history.push("/chef/dishes");
        } catch (e) {
            console.log(e)
        }
    };

    render() {
        const {errors, media} = this.state;
        const {uploading, cuisines, types, timeSlots, loadingDish, uploadProgress} = this.props;
        const image1 = !!media.length && media.length >= 1 && !!media[0];
        const image2 = !!media.length && media.length >= 2 && !!media[1];
        const image3 = !!media.length && media.length >= 3 && !!media[2];

        let timeAvailabilty = [];
        if(!!timeSlots.length){
            timeAvailabilty = timeSlots.map((slot:any)=>({...slot,time:`${slot.name} ${slot.start}-${slot.end}`}))
        }

        return (
            <MDBCard>
                <MDBCardHeader color="primary-color" tag="p">
                    Add Dishes
                </MDBCardHeader>
                <MDBCardBody>
                    {loadingDish && <MDBProgress color="primary" material preloader/>}
                    {uploading && <MDBProgress className="my-2" material value={uploadProgress} color="success"/>}
                    <MDBRow>
                        <MDBCol size="12" md="8">
                            <p className="text-center">Time to add dishes to be served for Breakfast, Lunch, Snacks & Diner. choose time and availability
                            for the dishes at your convenience.</p>
                        </MDBCol>
                        <MDBCol size="12" md="9">
                            <MDBRow>
                                <MDBCol size="12" md="6">
                                    <div className="mt-3">
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Dish Name"
                                                onChange={(evt) => this.validateInput(evt.target.value, "dishName")}
                                                onBlur={() => this.validatePayload()}
                                            />
                                            {!!errors && errors.dishName &&
                                            <div><p className="red-text hc-error">{errors.dishName}!</p></div>}
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Dish Price"
                                                onChange={(evt) => this.validateInput(evt.target.value, "price")}
                                                onBlur={() => this.validatePayload()}
                                            />
                                            {!!errors && errors.price &&
                                            <div><p className="red-text hc-error">{errors.price}!</p></div>}
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Serves"
                                                onChange={(evt) => this.validateInput(evt.target.value, "serves")}
                                                onBlur={() => this.validatePayload()}
                                            />
                                            {!!errors && errors.serves &&
                                            <div><p className="red-text hc-error">{errors.serves}!</p></div>}
                                        </div>
                                        <div className="form-group">
                                            <Picky
                                                value={this.state.slots}
                                                options={timeAvailabilty}
                                                onChange={this.selectSlotToServe}
                                                open={false}
                                                keepOpen={false}
                                                valueKey="id"
                                                labelKey="time"
                                                dropdownHeight={150}
                                                placeholder="Time Slot To Be Served"
                                                onClose={()=>this.validatePayload()}
                                            />
                                            {!!errors && errors.timeSlotToBeServed &&
                                            <div><p className="red-text hc-error">{errors.timeSlotToBeServed}!</p>
                                            </div>}
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="date"
                                                className="form-control"
                                                placeholder="Date To Be Served"
                                                onChange={(evt) => this.validateInput(evt.target.value, "dateToBeServed")}
                                                onBlur={() => this.validatePayload()}
                                            />
                                            {!!errors && errors.dateToBeServed &&
                                            <div><p className="red-text hc-error">{errors.dateToBeServed}!</p></div>}
                                        </div>
                                        <div className="form-group">
                                          <textarea
                                              className="form-control"
                                              placeholder="Description"
                                              onChange={(evt) => this.validateInput(evt.target.value, "description")}
                                              rows={3}
                                              onBlur={() => this.validatePayload()}

                                          />
                                            {!!errors && errors.description &&
                                            <div><p className="red-text hc-error">{errors.description}!</p></div>}
                                        </div>

                                        <div className="form-group">
                                            <ReactChipInput
                                                classes="chips"
                                                chips={this.state.ingredients}
                                                onSubmit={(value: any) => this.addChip(value)}
                                                onRemove={(index: number) => this.removeChip(index)}
                                            />
                                            {!!errors && errors.ingredients &&
                                            <div><p className="red-text hc-error">{errors.ingredients}!</p></div>}
                                        </div>
                                    </div>
                                </MDBCol>
                                <MDBCol size="12" md="6">
                                    <MDBRow className="mt-3">
                                        <MDBCol size="12" md="12">
                                            <div className="d-flex justify-content-between">
                                            <div>
                                                <p>Acitve</p>
                                            </div>
                                            <div>
                                                <MDBSwitch
                                                    labelLeft={""}
                                                    labelRight=" "
                                                    checked={this.state.isDraft}
                                                    onChange={() => this.setState({isDraft: !this.state.isDraft})}
                                                />
                                            </div>
                                            </div>
                                        </MDBCol>
                                        <MDBCol md="12">
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                    <p>Always Available</p>
                                                </div>
                                                <div>
                                                    <MDBSwitch
                                                        labelLeft={" "}
                                                        labelRight=" "
                                                        checked={this.state.alwaysAvialable}
                                                        onChange={() => this.setState({alwaysAvialable: !this.state.alwaysAvialable})}
                                                    />
                                                </div>
                                            </div>
                                        </MDBCol>
                                        <MDBCol md="12">
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                    <p>Available For PreOrder</p>
                                                </div>
                                                <div>
                                                    <MDBSwitch
                                                        labelLeft={" "}
                                                        labelRight=" "
                                                        checked={this.state.availableForPreOrder}
                                                        onChange={() => this.setState({availableForPreOrder: !this.state.availableForPreOrder})}
                                                    />
                                                </div>
                                            </div>
                                        </MDBCol>
                                        <MDBCol size="12" md="12">
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                    <p>Speciality</p>
                                                </div>
                                            <div>
                                                <MDBSwitch
                                                    labelLeft={" "}
                                                    labelRight=" "
                                                    checked={this.state.isSpeciality}
                                                    onChange={() => this.setState({isSpeciality: !this.state.isSpeciality})}
                                                />
                                            </div>
                                            </div>
                                        </MDBCol>


                                        <MDBCol md="12">
                                            <p>Upload Images</p>
                                        </MDBCol>
                                        <MDBCol size="12" md="4">
                                            <input type="file" id="dishImage" className="file-input"
                                                   alt="thumb1"
                                                   onChange={async (evt) => {
                                                       await this.uploadMedia(evt.target.files);
                                                   }}/>
                                            <img
                                                src={image1 ? media[0].url : imagePlaceholder}
                                                onClick={() => this.selectFileToUpload(0)}
                                                alt="thumb2"
                                                className="placeholder-image"/>
                                        </MDBCol>
                                        <MDBCol md="4">
                                            <img src={image2 ? media[1].url : imagePlaceholder}
                                                 onClick={() => this.selectFileToUpload(1)}
                                                 alt="thumb3"
                                                 className="placeholder-image"/>
                                        </MDBCol>
                                        <MDBCol md="4">
                                            <img
                                                src={image3 ? media[2].url : imagePlaceholder}
                                                onClick={() => this.selectFileToUpload(2)}
                                                alt="thumb4"
                                                className="placeholder-image"/>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow className="mt-3 text-center">
                                        <MDBCol md="12">
                                            <Picky
                                                value={this.state.cuisines}
                                                options={cuisines}
                                                onChange={this.selectCuisines}
                                                open={false}
                                                valueKey="id"
                                                labelKey="name"
                                                multiple={true}
                                                includeSelectAll={true}
                                                includeFilter={true}
                                                dropdownHeight={150}
                                                placeholder="Select Cuisines"
                                            />
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow className="mt-3 text-center">
                                        <MDBCol md="12">
                                            <Picky
                                                value={this.state.types}
                                                options={types}
                                                onChange={this.selectTypes}
                                                open={false}
                                                keepOpen={false}
                                                multiple={true}
                                                includeSelectAll={true}
                                                includeFilter={true}
                                                dropdownHeight={150}
                                                placeholder="Select Types"
                                            />
                                        </MDBCol>
                                    </MDBRow>
                                    <div className="mt-3 text-center">
                                        <MDBBtn rounded color="secondary" onClick={() => this.addNewDish()}>Submit
                                            Dish</MDBBtn>
                                    </div>
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                </MDBCardBody>
            </MDBCard>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        user: state.auth.user,
        uploading: state.uploads.uploading,
        uploadProgress: state.uploads.uploadProgress,
        fileResponse: state.uploads.response,
        cuisines: state.dish.cuisines,
        types: state.dish.types,
        loadingDish: state.dish.loadingDish,
        timeSlots: state.dish.timeSlots,
        loadingCuisines: state.dish.loadingCuisines,
        loadingTypes: state.dish.loadingTypes,
        loadingTimeSlots: state.dish.loadingTimeSlots
    }
};

const DishContainer = connect<any, any, any>(mapStateToProps)(Dish);
export default DishContainer;
