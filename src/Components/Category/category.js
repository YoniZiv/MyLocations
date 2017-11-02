import React from 'react'
import {
    Button, Col, ControlLabel, FormControl, FormGroup, Grid, HelpBlock, Row, Thumbnail,
    Well
} from "react-bootstrap";
import {connect} from "react-redux";
import {addNewCategory, deleteCategory, editCategory} from "../../Redux/Actions/categoriesActions";
import {validateFields} from "../../common/validator";


class Category extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editMode: this.props.name ? false : true,
            categoryName: this.props.name || '',
            tempText: this.props.name || '',

            catNameValid: true
        }
    }

    saveCategory = (props) => {

        const invalidFields = validateFields({catName: this.state.tempText}, 'category');
        if (invalidFields.length > 0) {
            this.setState({catNameValid: false})
        } else {
            this.setState({
                categoryName: this.state.tempText,
                editMode: false,
                catNameValid: true
            })
            this.props.editCategory(this.state.categoryName, this.state.tempText);
        }
    }

    EditCard = () => {
        this.setState({
            editMode: true
        });
    }

    DeleteCategory = (categoryName) => {
        this.props.deleteCategory(categoryName);
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
                    <Thumbnail>
                        <h3>New Category</h3>
                        <form>
                            <FormGroup controlId="formValidationSuccess1"
                                       validationState={this.state.catNameValid ? null : 'error'}>
                                <ControlLabel>Choose a name for your category</ControlLabel>
                                <FormControl type="text" placeholder="Category Name"
                                             inputRef={input => this.catName = input}
                                             value={this.state.tempText} onChange={this.ChangeText}/>
                                <HelpBlock>This field is mandatory.</HelpBlock>
                                <Button bsStyle="primary"
                                        onClick={this.saveCategory.bind(this)}>Apply</Button>&nbsp;
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
                        <Well><h3>{this.state.categoryName}</h3></Well>
                        <Button bsStyle="primary" onClick={this.EditCard.bind(this)}>Edit</Button>&nbsp;
                        <Button bsStyle="danger"
                                onClick={() => this.DeleteCategory(this.state.categoryName)}>Delete</Button>
                    </Thumbnail>
                </Col>
            </section>
        );
    }


    render() {
        return (
            <section id="category">
                {this.state.editMode ? this._editCategory() : this._finishedCategory()}
            </section>
        )
    }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {addNewCategory, editCategory, deleteCategory})(Category)