import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Base from "./Base";
import DetailProduct from "./body/products/detailProduct/DetailProduct";
import ScrollToTop from "./components/ScrollToTop.js";
import theme from "./Theme";

// admin view
import adminIndex from "./FeedbackManager/adminIndex";
import { useEffect } from "react";
import AdminSignIn from "./FeedbackManager/adminSignIn/AdminSignIn";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <ThemeProvider theme={theme}>
          <Route path="(/|/login|/prescription|/orders|/profile|/contact|/reports)">
            <Base />
          </Route>
          <Route path = "/product/:id" component = {DetailProduct} />
          <Route path = "/feedbackManager/dashbord" component = {adminIndex}  exact/>

{/* Add admin route path and component */}
          <Route path = "/adminSignIn" component = {AdminSignIn}/>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
