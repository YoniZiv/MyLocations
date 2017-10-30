import React from "react";
import Category from "../../Category/category";
import {Button, Grid, Row} from "react-bootstrap";
export class Categories extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            CategoriesList: []
        }
    }

    DeleteCategory = (e) => {

        console.log('before' , this.state.CategoriesList)
        const removeIndex = this.state.CategoriesList.indexOf(e.target);
        const newList = this.state.CategoriesList.splice(removeIndex,1);
        this.setState({
            CategoriesList: newList
        });
        console.log('after' , this.state.CategoriesList);
    }

    NewCategory = () => {
        let CatList = this.state.CategoriesList;
        CatList.push(<Category deleteFunc={ this.DeleteCategory.bind(this) }/>);
        this.setState({
            CategoriesList: CatList
        })
    }

    render() {
        return (
            <section id="Categories">
                <Button onClick={ this.NewCategory}> Add </Button>
                <Grid>
                    <Row>
                        { this.state.CategoriesList }
                    </Row>
                </Grid>
            </section>
        );
    }
}