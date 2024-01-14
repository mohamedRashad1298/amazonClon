import classes from "./Header.module.css";
import logo from "../../assets/logo.png";
import { FaSearch } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {ProductAction} from '../../utils/ProductRedux';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 0,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    background: "#cd9042",
  },
}));

const Header = () => {
  const totalQuantity = useSelector((state) => state.totalQuantity);
  const user = useSelector((state) => state.user);
const dispatch = useDispatch();
const history = useHistory()

const SignHandler = ()=>{
  if(user){
    dispatch(ProductAction.userLogOut())
  }else{
    history.push("/login")
  }
}

  return (
    <div className={classes.header}>
      <Link to="/home">
        <img src={logo} className={classes.header__logo} />
      </Link>
      <div className={classes.header__search}>
        <input className={classes.header__searchInput} />
        <FaSearch className={classes.header__searchIcon} />
      </div>
      <div className={classes.nav}>
          <div className={classes.nav__options}>
            <span className={classes.nav__lineOne}>
              {user ? `Hello ${user?.email}` : "Hello Guest"}
            </span>
            <span className={classes.nav__linetwo} onClick={SignHandler}>
              {user ? "Sgin Out" : "Sgin In"}
            </span>
          </div>
     
        <div className={classes.nav__options}>
          <span className={classes.nav__lineOne}>Returns</span>
          <span className={classes.nav__linetwo}>& Orders</span>
        </div>
        <div className={classes.nav__options}>
          <span className={classes.nav__lineOne}>Your</span>
          <span className={classes.nav__linetwo}>Prime</span>
        </div>
        <div className={classes.nav__cart}>
          <Link to="/checkout">
            <IconButton aria-label="cart">
              <StyledBadge badgeContent={totalQuantity} color="secondary">
                <FaShoppingCart style={{ color: "white" }} />
              </StyledBadge>
            </IconButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
