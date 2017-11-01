import React from "react";
import Category from "../Category/category";
import {Button, Grid, Row} from "react-bootstrap";
import {remove} from 'lodash';
import {connect} from "react-redux";
import {addNewCategory} from "../../Redux/Actions/categoriesActions";
import * as _ from "lodash";

class Categories extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            // CategoriesList: Object.keys(props.places) || []
        }
    }

    // componentWillMount() {
    //     this.props.addNewCategory('yoni')
    // }

    DeleteCategory = (categoryName) => {
        const { CategoriesList } = this.state;
        console.log('before' , categoryName)
        // remove(CategoriesList, (category) =>  )
        // const removeIndex = CategoriesList.indexOf(e.target);
        // const newList = CategoriesList.splice(removeIndex,1);
        // this.setState({
        //     CategoriesList: newList
        // });
        // console.log('after' , CategoriesList);
    }


    NewCategory = () => {
       this.props.addNewCategory('');
    }

    render() {
        return (
            <section id="Categories">
                <Button onClick={ this.NewCategory}> Add </Button>
                <Grid>
                    <Row>
                        { this.props.categories.map( (cat) => {
                            return (
                                <Category name={ cat } />
                            );
                        })}
                    </Row>
                </Grid>
            </section>
        );
    }
}

const mapStateToProps = (state) => ({
    categories: state.categories.categories
});

export default connect(mapStateToProps,{ addNewCategory })(Categories)