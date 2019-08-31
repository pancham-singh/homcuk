import React from 'react';
import "./Documents.scss"
import {uploadFile} from "../../../redux/uploads";
import {connect} from "react-redux";
import {addDocument, getDocuments, updateDocument} from "../../../redux/documents";
import placeholderImage from 'assets/images/imgPlaceHolder.png';

const {MDBRow, MDBCol, MDBCardBody, MDBBtn, toast, MDBProgress, MDBIcon} = require("mdbreact");

class Documents extends React.Component<any, any> {
    doc: any = {};
    state = {
        docType: 0,
        documentPayload: {url: '', documentType: ''},
        selectedDoc: this.doc,
        update: false
    };

    selectFileToUpload = (docType: number) => {
        const input = document.getElementById("doc-image");
        this.setState({docType});
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


    addNewDocument = async () => {
        const {dispatch} = this.props;
        const {documentPayload:{url, documentType}} = this.state;
        try {
            await dispatch(addDocument({url, documentType}));
            await dispatch(getDocuments());
            await toast.success('Document Added Successfully', {
                position: "top-right",
            });
        } catch (e) {
            toast.error('Something went wrong', {
                position: "top-right",
            });
        }
    };

    updateDocument = async () => {
        const {dispatch} = this.props;
        const {documentPayload: {url, documentType}} = this.state;
        try {
            await dispatch(updateDocument({url, documentType}));
            await dispatch(getDocuments());
            await toast.success('Document Update Successfully', {
                position: "top-right",
            });
        } catch (e) {
            toast.error('Something went wrong', {
                position: "top-right",
            });
        }
    };
    isAdded = (type: string): boolean => {
        const {documents} = this.props;
        if (!documents.length) {
            return false;
        }
        return !!documents.find((doc: any) => (doc.documentType === type))
    };
    selectDocument = (type: string) => {
        const {documents} = this.props;
        if (!!documents.length) {
            const document = documents.find((doc: any) => (doc.documentType === type));
            if (document) {
                this.setState({update: true})
            } else {
                this.setState({update: false})
            }
            this.setState({selectedDoc: document}, () => {
                console.log(this.state.selectedDoc)

            })
        }
    };


    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        if (prevProps !== this.props) {
            const {fileResponse, user: {id: chefId}} = this.props;

            this.selectDocument("adhaar card");

            let {docType, update: updation, selectedDoc} = this.state;

            if (!!fileResponse) {
                const {path: url} = fileResponse;
                let update: any = {chefId};
                if (updation) {
                    update = {id: selectedDoc.id}
                }
                switch (docType) {
                    default:
                        update = {...update, url, documentType: "adhaar card"};
                        break;
                    case 1:
                        update = {...update, url, documentType: "adhaar card"};
                        break;
                    case 2:
                        update = {...update, url, documentType: "driving licence"};
                        break;
                    case 3:
                        update = {...update, url, documentType: "pan"};
                        break;
                    case 4:
                        update = {...update, url, documentType: "passport"};
                        break;
                }
                this.setState({documentPayload: update, selectedDoc: update})
            }
        }
    }

    componentDidMount(): void {
        this.selectDocument("adhaar card");

    }

    render() {
        const {selectedDoc} = this.state;
        const {uploading, loadingDocument,uploadProgress} = this.props;
        return (
            <MDBCardBody>
                {loadingDocument && <MDBProgress color="primary" material preloader/>}
                {uploading && <MDBProgress className="my-2" material value={uploadProgress} color="success"/>}

                <MDBRow center>
                    <MDBCol md="7">
                        <div>
                            <p className="text-center text-bold">
                                You can upload any one documents from
                                the below mentioned list
                            </p>
                        </div>
                    </MDBCol>
                    <MDBCol md="12">
                        <input type="file" id="doc-image" className="file-input"
                               onChange={(evt) => {
                                   this.uploadMedia(evt.target.files);
                               }}/>
                        <MDBRow>
                            <MDBCol md="6">
                                <MDBRow>
                                    <MDBCol size="5" md="6">
                                        <label onClick={() => this.selectDocument("adhaar card")}>
                                            Adhaar Card
                                        </label>
                                    </MDBCol>
                                    <MDBCol size="5" md="5" className="px-1">
                                        <div className="form-group">
                                            <button className="form-control text-wrap"
                                                    onClick={() => this.selectFileToUpload(1)}>Browse File
                                            </button>
                                        </div>
                                    </MDBCol>
                                    <MDBCol size="1" md="1" className="text-center mt-1">
                                        {this.isAdded("adhaar card") &&
                                        <MDBIcon icon="check-circle" className="green-text pr-3"/>}
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol size="5" md="6">
                                        <label onClick={() => this.selectDocument("driving licence")}>
                                            Driving Licence
                                        </label>
                                    </MDBCol>
                                    <MDBCol size="5" md="5" className="px-1">
                                        <div className="form-group">
                                            <button className="form-control text-wrap"
                                                    onClick={() => this.selectFileToUpload(2)}
                                            >Browse File
                                            </button>
                                        </div>
                                    </MDBCol>
                                    <MDBCol size="2" md="1" className="text-center mt-1">
                                        {this.isAdded("driving licence") &&
                                        <MDBIcon icon="check-circle" className="green-text pr-3"/>}
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol size="5" md="6">
                                        <label onClick={() => this.selectDocument("pan")}>
                                            PAN Card
                                        </label>
                                    </MDBCol>
                                    <MDBCol size="5" md="5" className="px-1">
                                        <div className="form-group">
                                            <button className="form-control text-wrap"
                                                    onClick={() => this.selectFileToUpload(3)}
                                            >Browse File
                                            </button>
                                        </div>
                                    </MDBCol>
                                    <MDBCol size="2" md="1" className="text-center mt-1">
                                        {this.isAdded("pan") &&
                                        <MDBIcon icon="check-circle" className="green-text pr-3"/>}
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol size="5" md="6">
                                        <label onClick={() => this.selectDocument("passport")}>
                                            Passport
                                        </label>
                                    </MDBCol>
                                    <MDBCol size="5" md="5" className="px-1">
                                        <div className="form-group">
                                            <button className="form-control text-wrap"
                                                    onClick={() => this.selectFileToUpload(4)}
                                            >Browse File
                                            </button>
                                        </div>
                                    </MDBCol>
                                    <MDBCol size="2" md="1" className="text-center mt-1">
                                        {this.isAdded("passport") &&
                                        <MDBIcon icon="check-circle" className="green-text pr-3"/>}
                                    </MDBCol>
                                </MDBRow>
                            </MDBCol>
                            <MDBCol md="6">
                                <div className="text-center">
                                    <img
                                        src={!!selectedDoc ? selectedDoc.url : placeholderImage}
                                        alt=""
                                        className="doc-image"
                                    />
                                </div>
                            </MDBCol>
                            <MDBCol md="12">
                                <div className="mt-3">
                                    <div className="text-center">
                                        {!this.state.update &&
                                        <MDBBtn rounded color="secondary" onClick={() => this.addNewDocument()}>Submit
                                          Document</MDBBtn>}
                                        {this.state.update &&
                                        <MDBBtn rounded color="secondary" onClick={() => this.updateDocument()}>Update
                                          Document</MDBBtn>}
                                    </div>
                                </div>
                            </MDBCol>
                        </MDBRow>
                    </MDBCol>
                </MDBRow>
            </MDBCardBody>
        )
    }
}

const
    mapStateToProps = (state: any) => {
        return {
            uploading: state.uploads.uploading,
            fileResponse: state.uploads.response,
            uploadProgress: state.uploads.uploadProgress,
            loadingDocument: state.documents.loadingDocument
        }
    };
const
    DocumentsContainer = connect<any, any, any>(mapStateToProps)(Documents);
export default DocumentsContainer;
