import React from 'react'
import {
    Button, Col, ControlLabel, FormControl, FormGroup, HelpBlock, Thumbnail,
    Well
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { addNewCategory, deleteCategory, editCategory } from '../../../../Redux/actions/categories-actions';
import { validateFields } from '../../../../common/validator';
import { msgCancel, msgCatExist, msgDeleteCategory, msgSaveCategory } from '../../../../Redux/constants/growlMessages';


class Category extends React.Component {

    constructor( props ) {
        super( props );
        const { name } = this.props;

        this.state = {
            editMode    : !name,
            categoryName: name || '',
            tempText    : name || '',
            catNameValid: true
        }
    }

    saveCategory = () => {
        const { tempText, categoryName } = this.state;
        const { showGrowl, categories, editCategory } = this.props;
        const invalidFields = validateFields( { catName: tempText } );

        if ( invalidFields.length > 0 ) {
            this.setState( { catNameValid: false } )
        } else if ( categories.indexOf( tempText ) !== -1 && tempText !== '' ) {
            showGrowl( msgCatExist )
        } else {
            this.setState( {
                               categoryName: tempText,
                               editMode    : false,
                               catNameValid: true
                           } );
            editCategory( categoryName, tempText );
            showGrowl( msgSaveCategory );
        }
    };


    editCard = () => {
        const { showGrowl } = this.props;

        this.setState( {
                           editMode: true
                       } );
        this.saveCategory();
        showGrowl();
    };

    deleteCategory = ( categoryName ) => {
        const { deleteCategory, showGrowl } = this.props;

        deleteCategory( categoryName );
        showGrowl( msgDeleteCategory );
    };

    changeText = ( event ) => {
        const { showGrowl } = this.props;

        this.setState( {
                           tempText: event.target.value,
                       } );
        showGrowl()
    };

    handleKeyPress = ( target ) => {
        if ( target.charCode === 13 ) {
            this.saveCategory();
        }
    };

    cancelEdit = () => {
        const { categoryName } = this.state;
        const { deleteCategory, showGrowl } = this.props;

        categoryName === '' ? deleteCategory( '' ) : this.setState( { editMode: false } );
        showGrowl( msgCancel );
    };

    EditCategory() {
        const { catNameValid, tempText } = this.state;

        return (
            <section className="editCategory">
                <Col xs={ 4 } md={ 4 }>
                    <Thumbnail>
                        <h3>New Category</h3>
                        <form>
                            <FormGroup controlId="formValidationSuccess1"
                                       validationState={ catNameValid ? null : 'error' }
                            >
                                <ControlLabel>Choose a name for your category</ControlLabel>
                                <FormControl type="text"
                                             placeholder="Category Name"
                                             onKeyPress={ this.handleKeyPress }
                                             value={ tempText }
                                             onChange={ this.changeText }
                                             inputRef={ input => {
                                                 this.catName = input;
                                                 if ( input )
                                                     input.focus();
                                             } }
                                />
                                <HelpBlock>This field is mandatory.</HelpBlock>
                                <Button bsStyle="primary"
                                        onClick={ this.saveCategory }>Apply</Button>&nbsp;
                                <Button bsStyle="danger"
                                        onClick={ this.cancelEdit }>Cancel</Button>
                            </FormGroup>
                        </form>
                    </Thumbnail>
                </Col>
            </section>
        );
    }

    FinishedCategory() {
        const { name } = this.props;
        const { categoryName } = this.state;

        return (
            <section className="finished-category" key={ 'finishedCategory_' + name }>
                <Col xs={ 4 } md={ 4 }>
                    <Thumbnail>
                        <Well><h3>{ categoryName }</h3></Well>
                        <Button bsStyle="primary"
                                onClick={ this.editCard }>Edit</Button>&nbsp;
                        <Button bsStyle="danger"
                                onClick={ () => this.deleteCategory( categoryName ) }>Delete</Button>
                    </Thumbnail>
                </Col>
            </section>
        );
    }

    render() {
        const { name } = this.props;
        const { editMode } = this.state;

        return (
            <section className="category" key={ name }>
                {
                    editMode ? this.EditCategory() : this.FinishedCategory()
                }
            </section>
        )
    }
}

const mapStateToProps = ( state ) => ({
    categories: state.categories.categories
});

export default connect( mapStateToProps, { addNewCategory, editCategory, deleteCategory } )( Category )