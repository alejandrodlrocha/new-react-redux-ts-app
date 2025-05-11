import { BrowserRouter } from "react-router";
import routes from "./routes";

const App = () => {
  return (
    <BrowserRouter>
      {routes}
    </BrowserRouter>
  )
}

export default App;
