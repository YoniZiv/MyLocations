import React from 'react'
import {
    Button, Col, ControlLabel, FormControl, FormGroup, HelpBlock, Thumbnail,
    Well
} from "react-bootstrap";
import {connect} from "react-redux";
import {addNewCategory, deleteCategory, editCategory} from "../../Redux/Actions/categoriesActions";
import {validateFields} from "../../common/validator";
import {msgCance, msgCatExist, msgDeleteCategory, msgSaveCategory} from "../../Redux/Constants/growlMessages";


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


    saveCategory = () => {
        const invalidFields = validateFields({catName: this.state.tempText});
        if (invalidFields.length > 0) {
            this.setState({catNameValid: false})
        } else {
            if(this.props.categories.indexOf(this.state.tempText) !== -1 && this.state.tempText !== '')
            {
                this.props.showGrowl(msgCatExist)
            } else {
                this.setState({
                    categoryName: this.state.tempText,
                    editMode: false,
                    catNameValid: true
                });
                this.props.editCategory(this.state.categoryName, this.state.tempText);
                this.props.showGrowl(msgSaveCategory);
            }

        }
    }

    EditCard = () => {
        this.setState({
            editMode: true
        });
        this.props.showGrowl();
    }

    DeleteCategory = (categoryName) => {
        this.props.deleteCategory(categoryName);
        this.props.showGrowl(msgDeleteCategory);
    }

    ChangeText = (event) => {
        this.setState({
            tempText: event.target.value,
        })
        this.props.showGrowl()
    }

    handleKeyPress = (target) => {
        if (target.charCode === 13) {
            this.saveCategory();
        }
    }

    cancelEdit = () => {
        this.state.categoryName === '' ? this.props.deleteCategory('') : this.setState({editMode: false});
        this.props.showGrowl(msgCance);
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
                                             onKeyPress={this.handleKeyPress}
                                             inputRef={input => {
                                                 this.catName = input;
                                                 if (input)
                                                     input.focus();
                                             }}
                                             value={this.state.tempText} onChange={this.ChangeText}/>
                                <HelpBlock>This field is mandatory.</HelpBlock>
                                <Button bsStyle="primary"
                                        onClick={this.saveCategory.bind(this)}>Apply</Button>&nbsp;
                                <Button bsStyle="danger" onClick={() => this.cancelEdit()}>Cancel</Button>
                            </FormGroup>
                        </form>
                    </Thumbnail>
                </Col>
            </section>
        );
    }

    _finishedCategory() {
        return (
            <section className="finished-category" key={"finishedCategory_" + this.props.name}>

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

            < section
                className="category"
                key={this.props.name
                }>
                {
                    this.state.editMode ? this._editCategory() : this._finishedCategory()
                }
            </section>
        )
    }
}

const mapStateToProps = (state) => ({
    categories: state.categories.categories
});

export default connect(mapStateToProps, {addNewCategory, editCategory, deleteCategory})(Category)