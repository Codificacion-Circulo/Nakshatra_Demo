import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import UploadImage from "./pages/uploadImage/UploadImage";
import Login from './pages/login/Login';
import SignUp from './pages/login/SignUp';
import ForgotPassword from "./pages/login/ForgotPassword";
import ResetPassword from "./pages/login/ResetPassword";
import KnowMore from "./pages/knowMore/KnowMore";
const Routes = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path="/upload" exact>
                        <UploadImage />
                    </Route>
                    <Route path="/profile" exact>
                        <Profile />
                    </Route>
                    <Route path="/knowmore">
                        <KnowMore />
                    </Route>
                    <Route path="/login" exact>
                        <Login />
                    </Route>
                    <Route path="/signup" exact>
                        <SignUp />
                    </Route>
                    <Route path="/forgotPassword" exact>
                        <ForgotPassword />
                    </Route>
                    <Route path="/resetPassword/:id" exact>
                        <ResetPassword />
                    </Route>
                    
                </Switch>
            </Layout>
        </BrowserRouter>
    );
}

export default Routes;