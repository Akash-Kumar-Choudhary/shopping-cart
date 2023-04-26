import {useContext} from 'react'
import classes from './MealItem.module.css'
import MealItemForm from './MealItemForm'
import CartContext from '../../../Store/CartContext'
const Meal=(props) => {
    const Cartctx=useContext(CartContext)
    const price=`$${props.price.toFixed(2)}`
    const AddtoCartHandler=(amount) => {
        Cartctx.addItem({
            key:props.id,
            id:props.id,
            name:props.name,
            amount:amount,
            price:props.price,
        })
    }
    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
                <div className={classes.form1}><MealItemForm onAddtoCart={AddtoCartHandler} /></div>
            </div>
        </li>
    )
}

export default Meal