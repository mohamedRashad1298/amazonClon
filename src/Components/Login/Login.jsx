import classes from "./Login.module.css";
import { Link } from "react-router-dom";
import logo from "../../assets/amazonLogo.png";
import { useState } from "react";
import {notifySuccess , notifyFail , ToastContainerComp} from '../../utils/toastfy';
import { createUserWithEmailAndPassword , signInWithEmailAndPassword  } from "firebase/auth";
import { Auth } from "../../Config/fireBaseConfig";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Spinner from "../Spinner/Spinner";
import { useDispatch } from "react-redux";
import {ProductAction} from '../../utils/ProductRedux'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading , setIsLoading] = useState(false)
  const history = useHistory()
const dispatch = useDispatch()

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(email));
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    setIsValidPassword(passwordRegex.test(password));
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    validateEmail(newEmail);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };


const loginHandler = async(e)=>{
e.preventDefault();
if(!isValidEmail && !isValidPassword){
  notifyFail("Inavalid Email or password")
}
try {
  setIsLoading(true)
  const data = await signInWithEmailAndPassword(Auth , email ,password);
  setIsLoading(false)
  dispatch(ProductAction.userLogin(data.user))
  notifySuccess("login Success")
  history.push('/home')
} catch (error) {
  setIsLoading(false)
  notifyFail(error.message)
}

}

const signUpHandler = async()=>{
  if(!isValidEmail && !isValidPassword){
    notifyFail("Inavalid Email or password")
  }
  try {
    setIsLoading(true)
    const data = await createUserWithEmailAndPassword(Auth,email,password)
    notifySuccess("welcome to amazonClon")
    dispatch(ProductAction.userLogin(data.user))
    history.push('/home')
    setIsLoading(false)
  } catch (error) {
    setIsLoading(false)
    notifyFail(error.message)
  }
}

  return (
    <div className={classes.login}>
      <Link to="/">
        <img className={classes.login__image} src={logo} />
      </Link>
      <div className={classes.login__container}>
        <h1>Sign-in</h1>
        <form className={classes.login__form} onSubmit={(e)=>loginHandler(e)}>
          <label>E-mail:</label>
          <input
            className={classes.login__input}
            type="email"
            value={email}
            onChange={(e) => handleEmailChange(e)}
          />
          {!isValidEmail && <p>Invalid Email</p>}
          <label>Password:</label>
          <input
            className={classes.login__input}
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => handlePasswordChange(e)}
          />
          {!isValidPassword && <p>The password must contain Capital letters & special charcters </p>}
          <div className={classes.loin__inputs}>
            <input
              type="checkbox"
              onClick={() => setShowPassword((prev) => !prev)}
              id="showPass"
            />
            <label htmlFor="showPass">Show Password</label>
          </div>
          <button className={classes.login__signInBtn}>Sign in</button>
        </form>
        <button onClick={signUpHandler} className={classes.login__registerBtn}>
          Create Your Amazon Account
        </button>
        {isLoading && <Spinner/>}
      </div>
      <ToastContainerComp/>
    </div>
  );
};

export default Login;
