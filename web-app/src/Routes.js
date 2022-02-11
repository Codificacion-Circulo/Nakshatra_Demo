import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import UploadImage from "./pages/uploadImage/UploadImage";
import Login from './pages/login/Login';
import SignUp from './pages/login/SignUp';
import ForgotPassword from "./pages/login/ForgotPassword";
import ResetPassword from "./pages/login/ResetPassword";
import History from "./pages/history/History";

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
                    <Route path="/profile">
                        <Profile />
                    </Route>
                    <Route path="/history">
                        <History />
                    </Route>

                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/signup">
                        <SignUp />
                    </Route>
                    <Route path="/forgotPassword">
                        <ForgotPassword />
                    </Route>
                    <Route path="/resetPassword/:id">
                        <ResetPassword />
                    </Route>
                    
                </Switch>
            </Layout>
        </BrowserRouter>
    );
}

export default Routes;