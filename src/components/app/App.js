import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "../../providers/UserProfileProvider";
import { ApplicationViews } from '../../views/ApplicationViews';
import { UploadImgProvider } from "../../providers/UploadImgProvider";
import './App.css'
import { Nav } from "../nav/Nav";

export function App() {
  return (
    <Router>
      <UserProfileProvider>
        <UploadImgProvider>
            <Nav />
            <ApplicationViews />
        </UploadImgProvider>
      </UserProfileProvider>
    </Router>
  );
}