import React,{useContext,useEffect,useState} from 'react'
import classes from './HeaderCartButton.module.css'
import CartIcon from '../Cart/CartIcon'
import CartContext from '../../Store/CartContext'
const HeaderCartButton=(props) => {
    const cartCtx=useContext(CartContext)
    const [btnIsBump,setIsBump] = useState(false)
    const { items } = cartCtx
    const numberofcart=items.reduce((cartnumber,item) =>{
        return cartnumber+item.amount
    },0)

    const btnClasses=`${classes.button} ${ btnIsBump ? classes.bump:''}`

    useEffect(() => {
        if(items.length===0){
            return
        }
        setIsBump(true)
        const Timer=setTimeout(()=>{
            setIsBump(false)
        },300)
        return () => {
            clearTimeout(Timer)
        }
    },[items])
    
    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span >
                your Cart
            </span>
            <span className={classes.badge}>
               {numberofcart}
            </span>
        </button>
    )
}

export default HeaderCartButton