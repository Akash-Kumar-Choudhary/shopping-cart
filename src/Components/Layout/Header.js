import {Fragment} from 'react'
import ReactImg from '../../assests/meals.jpg'
import classes from './Header.module.css'
import HeaderCartButton from './HeaderCartButton'
const Header=(props) => {
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>ReactMeal</h1>
                <HeaderCartButton onClick={props.onShowCart}>Cart</HeaderCartButton>            
            </header>
            <div className={classes['main-image']}>
                <img src={ReactImg} alt="A food" />
            </div>
        </Fragment>
    )
}

export default Header