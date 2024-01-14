import Header from "./Components/Header/Header";
import HomePage from "./Pages/HomePage/HomePage";
import {
  Route,
  Switch,
  Redirect,
} from "react-router-dom/cjs/react-router-dom.min";
import CheckOutPage from "./Pages/CheckoutPage/CheckOutPage";
import Login from "./Components/Login/Login";
import Payment from "./Pages/PaymentPage/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe("pk_test_51OG1kzDL1Hf0H1sVXCU7xPDCem4GiHlUtFe9kNzTbgkDfriPdLphqgUzLqYEABj3fapDhwJI1u706K1iWurktMI500z495EWAt")


function App() {
  return (
    <>
      <Switch>
        <Route path="/home">
          <Header />
          <HomePage />
        </Route>
        <Route path="/checkout">
          <Header />
          <CheckOutPage />
        </Route>
        <Route to="/payment" exact>
          <Header />
          <Elements stripe={promise}>
          <Payment />
          </Elements>
        </Route>
        <Route to="/login" exact>
          <Login />
        </Route>
        <Route path="/" exact render={() => <Redirect to="/home" />} />
      </Switch>
    </>
  );
}

export default App;
