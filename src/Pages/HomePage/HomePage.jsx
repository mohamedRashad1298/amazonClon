import AImage from "../../assets/prime.jpg";
import classes from "./HomePage.module.css";
import Product from "../../Components/Product/Product";
import { useEffect } from "react";
import data from '../../../product.json'

const HomePage = () => {


  return (
    <div className={classes.home}>
      <div className={classes.home__container}>
        <img src={AImage} className={classes.home__image} />
        <div className={classes.home__row}>
          <Product product={data[0]}/>
          <Product product={data[1]} />
        </div>
        <div className={classes.home__row}>
        <Product product={data[5]} />

        </div>
        <div className={classes.home__row}>
        <Product product={data[3]} />
        <Product product={data[4]} />
        <Product product={data[2]} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
