import React from 'react'
import {
    Button, Col, ControlLabel, FormControl, FormGroup, Grid, HelpBlock, Row, Thumbnail,
    Well
} from "react-bootstrap";


export default class Category extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            editMode: true,
            categoryName: '',
            tempText: ''
        }
    }

    saveCategory = (props) => {
        this.setState({
            categoryName: this.state.tempText,
            editMode: false
        })

    }

    EditCard = () => {
        this.setState({
            editMode: true
        });
    }

    DeleteCategory = (e) => {
             this.props.deleteFunc(e.target);
    }

    ChangeText = (event) => {
        this.setState({
            tempText: event.target.value
        })
    }

    _editCategory() {

        return (
            <section id="EditCategory">
                        <Col xs={4} md={4}>
                            <Thumbnail >
                                <h3>New Category</h3>
                                <form>
                                    <FormGroup controlId="formValidationSuccess1" validationState={null}>
                                        <ControlLabel>Input with success</ControlLabel>
                                        <FormControl type="text" placeholder="Category Name"
                                                     inputRef={input => this.catName = input}
                                                     value={ this.state.tempText } onChange={ this.ChangeText }/>
                                        <HelpBlock>Help text with validation state.</HelpBlock>
                                        <Button bsStyle="primary"
                                                onClick={ this.saveCategory.bind(this) }>Apply</Button>&nbsp;
                                        <Button bsStyle="danger">Cancel</Button>
                                    </FormGroup>
                                </form>
                            </Thumbnail>
                        </Col>
            </section>
        );
    }

    _finishedCategory() {
        return (
            <section id="FinishedCategory">

                <Col xs={4} md={4}>
                    <Thumbnail>
                        <Well><h3>{ this.state.categoryName }</h3></Well>
                        <Button bsStyle="primary" onClick={ this.EditCard.bind(this) }>Edit</Button>&nbsp;
                        <Button bsStyle="danger" onClick={this.DeleteCategory}>Delete</Button>
                    </Thumbnail>
                </Col>
            </section>
        );
    }


    render() {
        return (
            <section id="category">
                        { this.state.editMode ? this._editCategory() : this._finishedCategory() }
            </section>
        )
    }
}

