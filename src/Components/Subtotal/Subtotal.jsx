import classes from './Subtotal.module.css'
import CurrencyFormat from 'react-currency-format'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Subtotal = () => {
const history = useHistory()
  const totalPrice= useSelector(state=>state.totalPrice)
  const totalQuantity= useSelector(state=>state.totalQuantity)
  return (
    <div className={classes.subtotal}>
      <CurrencyFormat
      renderText={(value)=>(
        <>
        <p>Subtotal ({totalQuantity} items): <strong> {value}
          </strong> </p>
          <small className={classes.subtotal__gift}>
            <input type='checkbox'/>
            This order contains a gift
          </small>
        </>
      )}
      decimalScale={2}
      value={totalPrice}
      displayType={'text'}
      thousandSeparator={true}
      prefix={"$"}
      />
      <button onClick={()=>history.push('/payment')}>Proceed of Checkout</button>
    </div>
  )
}

export default Subtotal
