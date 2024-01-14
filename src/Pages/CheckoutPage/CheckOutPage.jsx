import classes from './CheckOut.module.css'
import image from '../../assets/AMZbanner.jpg'
import Subtotal from '../../Components/Subtotal/Subtotal'
import { useSelector } from 'react-redux'
import { FaStar } from "react-icons/fa";
import { v4 } from 'uuid';
import { useDispatch } from 'react-redux';
import {ProductAction} from '../../utils/ProductRedux'

const CheckOutPage = () => {
const Products = useSelector(state=> state.basket)
const dispatch = useDispatch()


const addToCart = (item)=>{
  dispatch(ProductAction.AddToBasket(item))
}
const removeFromCart = (item)=>{
  dispatch(ProductAction.removeFromBasket(item))
}


  return (
    <div className={classes.checkout}>
      <div className={classes.checkout__left}>
       <img src={image} alt="banner" className={classes.checkout__ad} />

       <div>
        <h2 className={classes.checkout__title}>
         Your Shoping Basket
        </h2>

     { Products.length > 0 && Products.map((item) =>( <div key={v4()} className={classes.checkout__store}>
          <img src={item.image} />
          <div className={classes.checkout__details}>
            <h3>{item.title}</h3>
            <div className={classes.checkout__rating}>
            {Array(item.rating).fill().map(()=> <FaStar key={v4()} style={{color:"yellow",fontSize:"16px"}}/>)}
            </div>
            <p>{item.price}<span style={{marginLeft:"5px"}}>$</span></p>
            <div className={classes.checkout__quantity}>
            <p >{item.quantity} <span>items</span> </p>
            <div className={classes.checkout__quantityBtn}>
               <button onClick={()=>addToCart(item)}>+</button>
               <button onClick={()=>removeFromCart(item)}>-</button>
            </div>
            </div>
          </div>
        </div>))}

       </div>

      </div>
       <div className={classes.checkout__right}>
        <Subtotal/>
       </div>
    </div>
  )
}

export default CheckOutPage
