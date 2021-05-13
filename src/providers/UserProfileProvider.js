import React, { useState, useEffect, createContext } from "react";
import { Spinner } from "reactstrap";
import firebase from "firebase/app";
import "firebase/auth";

export const UserProfileContext = createContext();

export function UserProfileProvider(props) {
  const functionsApiUrl = "https://us-central1-fitc-nashville.cloudfunctions.net";
  const apiUrl = "/api/userprofile"
  const currentUser = JSON.parse(localStorage.getItem("userProfile"));
  const [allGardeners, setAllGardeners] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(currentUser != null);
  const [isFirebaseReady, setIsFirebaseReady] = useState(false);

  const getToken = () => firebase.auth().currentUser.getIdToken();

  const register = (gardener, password) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(gardener.email, password)
      .then((createResponse) => 
        addNewGardenerToFirestore({ ...gardener, firebaseUserId: createResponse.user.uid })
      )
      .then((savedUserProfile) => {
        localStorage.setItem("userProfile", JSON.stringify(savedUserProfile));
        setIsLoggedIn(true);
      });
  };

  const addNewGardenerToFirestore = (gardener) => {
    return getToken().then((token) =>
      fetch(`${functionsApiUrl}/registerNewGardener`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gardener),
      }).then(resp => resp.json())
    );
  };

  const login = (email, pw) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, pw)
      .then((signInResponse) => getGardenerFromFirestore(signInResponse.user.uid))
      .then((userProfile) => {
        localStorage.setItem("userProfile", JSON.stringify(userProfile));
        setIsLoggedIn(true);
      });
  };

  const getGardenerFromFirestore = (firebaseUserId) => {
    return getToken().then((token) =>
      fetch(`${functionsApiUrl}/getGardenerById`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: firebaseUserId
      }).then((resp) => resp.json())
    );
  };

  const logout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        localStorage.clear();
        setIsLoggedIn(false);
      });
  };

  const getAllGardeners = () => {
    getToken().then((token) =>
      fetch(`${functionsApiUrl}/getAllGardeners`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then(setAllGardeners)
    );
  };

  const editGardenerProfile = (userProfile) => {
    return getToken().then((token) =>
      fetch(apiUrl + `/${userProfile.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userProfile),
      })
      .then(getAllGardeners)
    );
  };
  
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      user
      ? localStorage.setItem('userProfile', JSON.stringify(user))
      : localStorage.removeItem('userProfile')
      setIsFirebaseReady(true);
    });
  }, []);


  return (
    <UserProfileContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        register,
        getToken,
        getAllGardeners,
        allGardeners,
        editGardenerProfile,
        currentUser
      }}
    >
      {isFirebaseReady ? (
        props.children
      ) : (
        <Spinner className="app-spinner dark" />
      )}
    </UserProfileContext.Provider>
  );
}
