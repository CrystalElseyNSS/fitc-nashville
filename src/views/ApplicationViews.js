import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import { UserProfileList } from "../components/userProfiles/UserProfileList";
import { UserProfileDetails } from "../components/userProfiles/UserProfileDetails";
import '../components/app/App.css'
import { CommunityCalendar } from "../components/calendar/CommunityCalendar";
import { CropShare } from "../components/bulletin/CropShare";
import { CareRequests } from "../components/bulletin/CareRequests";

export function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);

  return (
    <main className="app">
      <Switch>

        <Route exact path="/">
          {isLoggedIn ? <CommunityCalendar /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/cropshare">
          {isLoggedIn ? <CropShare /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/carerequests">
          {isLoggedIn ? <CareRequests /> : <Redirect to="/login" />}
        </Route>

        <Route path="/userProfiles/:id" exact>
          {isLoggedIn ? <UserProfileDetails /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/userProfiles" exact>
          {isLoggedIn ? <UserProfileList /> : <Redirect to="/login" />}
        </Route>

      </Switch>

    </main>
  );
};
