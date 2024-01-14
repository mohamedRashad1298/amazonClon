import classes from "./Payment.module.css";
import { useSelector, useDispatch } from "react-redux";
import { ProductAction } from "../../utils/ProductRedux";
import { FaStar } from "react-icons/fa";
import { v4 } from "uuid";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import axios from "../../utils/axios";
import {notifySuccess , ToastContainerComp} from "../../utils/toastfy"

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeed, setSucceed] = useState(false);
  const [processing, setProcessing] = useState("");
  const [clientSecret, setClientSecret] = useState('');

  const user = useSelector((state) => state.user);

  const Products = useSelector((state) => state.basket);
  const totalQuantity = useSelector((state) => state.totalQuantity);
  const totalPrice = useSelector((state) => state.totalPrice);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const getClienSecret = async () => {
      const respons = await axios({
        method: "POST",
        url: `/payments/create?total=${totalPrice * 100}`,
      });
      setClientSecret(respons.data.clientSecret);
    };
    console.log(clientSecret)
    getClienSecret();
  }, [totalPrice]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
try {
  

  await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      setSucceed(true);
      setError(null);
      setProcessing(false);
      dispatch(ProductAction.emaptyBasket());
      history.replace("/orders");
    } catch (error) {
  console.log(error.message)
    }
    notifySuccess("your order will send to you soon")
    history.replace('/home')
dispatch(ProductAction.emaptyBasket());
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  const addToCart = (item) => {
    dispatch(ProductAction.AddToBasket(item));
  };
  const removeFromCart = (item) => {
    dispatch(ProductAction.removeFromBasket(item));
  };

  return (
    <div className={classes.payment}>
      <div className={classes.payment__container}>
        <h1>
          CheckOut (<Link>{totalQuantity} items</Link>)
        </h1>

        <div className={classes.payment__section}>
          <div className={classes.payment__title}>
            <h3>Delivary Adress</h3>
          </div>
          <div className={classes.payment__adress}>
            {user && <p>{user?.email}</p>}
            <p>El bagalat</p>
            <p>Mansoura , EG</p>
          </div>
        </div>

        <div className={classes.payment__section}>
          <div className={classes.payment__title}>
            <h3>Review Items And delivary</h3>
          </div>
          <div className={classes.payment__items}>
            {Products.length > 0 &&
              Products.map((item) => (
                <div key={v4()} className={classes.checkout__store}>
                  <img className={classes.payment__image} src={item.image} />
                  <div className={classes.checkout__details}>
                    <h3>{item.title}</h3>
                    <div className={classes.checkout__rating}>
                      {Array(item.rating)
                        .fill()
                        .map(() => (
                          <FaStar
                            key={v4()}
                            style={{ color: "yellow", fontSize: "16px" }}
                          />
                        ))}
                    </div>
                    <p>
                      {item.price}
                      <span style={{ marginLeft: "5px" }}>$</span>
                    </p>
                    <div className={classes.checkout__quantity}>
                      <p>
                        {item.quantity} <span>items</span>{" "}
                      </p>
                      <div className={classes.checkout__quantityBtn}>
                        <button onClick={() => addToCart(item)}>+</button>
                        <button onClick={() => removeFromCart(item)}>-</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className={classes.payment__section}>
          <div className={classes.payment__title}>
            <h3>Payment Method</h3>
          </div>
          <div className={classes.payment__method}>
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className={classes.payment__priceContainer}>
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <h3>Order Total : {value}</h3>
                    </>
                  )}
                  decimalScale={2}
                  value={totalPrice}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeed}>
                  <span>{processing ? <p>Processing</p> : "Buy now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
      <ToastContainerComp/>
    </div>
  );
};

export default Payment;
