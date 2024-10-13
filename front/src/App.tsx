import { Route, Switch } from "wouter";

import "./App.css";

import { Layout } from "./components/Layout";

import { Login } from "@/features/auth/views/Login";
import { Home } from "./features/home/view/Home";
import { Private } from "./features/private/view/Private";
import { AuthRoutes } from "./features/AuthRoutes";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/login" component={Login} />

        <AuthRoutes>
          <Route path="/" component={Home} />
          <Route path="/private" component={Private} />

          {/* 404 - Match all other routes except exactly '/' */}
          {/* TODO 404 view */}
          <Route path={/^\/(?!$)[^/]+/}>Not found</Route>
        </AuthRoutes>
      </Switch>
    </Layout>
  );
}

export default App;
