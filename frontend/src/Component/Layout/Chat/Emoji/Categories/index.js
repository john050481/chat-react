import React from 'react'
import './style.css'

export default class CategoriesList extends React.Component{
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
/*
        console.log(nextProps.handleClickCategories !== this.props.handleClickCategories)
        console.log(nextProps.categoriesInState === this.props.categoriesInState)
        console.log(nextProps.currentCategory === this.props.currentCategory)
        console.log(nextProps.isLoading === this.props.isLoading)
*/

            if ( (nextProps.handleClickCategories !== this.props.handleClickCategories) &&
            (nextProps.categoriesInState === this.props.categoriesInState) &&
            (nextProps.currentCategory === this.props.currentCategory) &&
            (nextProps.isLoading === this.props.isLoading) )
            return false;

        return true;
    }

    render() {
        console.log('Render Categories');
        return (
            <div className='categoriesBlock'>
                {this.props.categoriesInState.map(item =>
                    <button
                        disabled={this.props.isLoading ? true : false}
                        key={item.slug}
                        title={item.slug}
                        data-category = {item.slug}
                        className={'categoriesItem' + (this.props.currentCategory===item.slug ? ' activeCategory' : '')}
                        onClick={(e) => {this.props.handleClickCategories(e)}}>
                        {item.slug.slice(0, 10) + (item.slug.length>10 ? ' ...' : '')}
                    </button>)}
            </div>
        )
    }
}