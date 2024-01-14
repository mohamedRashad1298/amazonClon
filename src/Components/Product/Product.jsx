import classes from './Product.module.css'
import { FaStar } from "react-icons/fa";
import { BsCartPlusFill } from "react-icons/bs";
import { v4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { ProductAction } from '../../utils/ProductRedux';

const Product = ({product}) => {
const disptch = useDispatch()

const AddProduct = ()=>{
  disptch(ProductAction.AddToBasket(product))
}


  return (
    <div className={classes.product}>
      <div className={classes.product__info}>
       <p>{product.title}</p>
       <p className={classes.product__price}>
        <small>$</small>
        <strong>{product.price}</strong>
       </p>
       <div className={classes.product__rating}>
   {Array(product.rating).fill().map(()=> <FaStar key={v4()} style={{color:"yellow",fontSize:"16px"}}/>)}
       </div>
      </div>
        <img height={300} src={product.image}/>

        <button className={classes.product__btn} onClick={AddProduct}>
          Add to Cart 
         <BsCartPlusFill style={{paddingLeft:"10px", color:"white"}}/>
        </button>
       
    </div>
  )
}

export default Product
