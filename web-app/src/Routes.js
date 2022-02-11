import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/home/Home";
import UploadImage from "./pages/uploadImage/UploadImage";
import Login from './pages/login/Login';
import SignUp from './pages/login/SignUp';

const Routes = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path="/upload">
                        <UploadImage />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/signup">
                        <SignUp />
                    </Route>
                </Switch>
            </Layout>
        </BrowserRouter>
    );
}

export default Routes;