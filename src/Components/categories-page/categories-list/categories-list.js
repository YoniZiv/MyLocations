import React from 'react';
import Category from './category/category';
import { Button, Grid, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addNewCategory } from '../../../Redux/actions/categories-actions';
import { Growl } from 'primereact/components/growl/Growl';

class Categories extends React.Component {

    constructor( props ) {
        super( props );
        this.state = {
            messages: []
        }
    }

    showGrowl = ( growlMessage ) => {
        growlMessage ?
            this.setState( {
                               messages: [ growlMessage ]
                           } ) :
            this.setState( {
                               messages: []
                           } )
    };

    NewCategory = () => {
        this.props.addNewCategory( '' );
    };

    render() {
        const { messages } = this.state;
        const { categories } = this.props;

        return (
            <section className="categories">
                <Growl value={ messages }/>
                <Button onClick={ this.NewCategory } className="addBtn"> + </Button>
                <Grid>
                    <Row>
                        { categories.map( ( categoryName ) => {
                            return (
                                <Category key={ 'category_' + categoryName }
                                          name={ categoryName }
                                          showGrowl={ this.showGrowl }
                                />
                            );
                        } ) }
                    </Row>
                </Grid>
            </section>
        );
    }
}

const mapStateToProps = ( state ) => ({
    categories: state.categories.categories
});

export default connect( mapStateToProps, { addNewCategory } )( Categories )