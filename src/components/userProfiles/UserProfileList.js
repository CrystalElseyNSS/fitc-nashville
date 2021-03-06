import React, { useContext, useEffect } from 'react';
import { ListGroup } from 'reactstrap';
import { UserProfile } from "../userProfiles/UserProfile";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import "./UserProfile.css";

export const UserProfileList = () => {
  const { gardeners, getAllGardeners } = useContext(UserProfileContext);

  useEffect(() => {
    getAllGardeners();
    // eslint-disable-next-line
  }, []);



  return (
    <>
        <div className="usersHeader">
            <h3>Gardeners</h3>
        </div>
      <section className="userProfileList">
        <ListGroup horizontal className="header--userList">
          <h5 className="header--userInfo">Full Name</h5>
          <h5 className="header--userInfo">Display Name</h5>
          <h5 className="header--userInfo">User Type</h5>
          <h5 className="header--userInfo">Actions</h5>
        </ListGroup>
        <ListGroup>
          {gardeners.map((up) => (
            <UserProfile key={up.id} userProfile={up} />
          ))}
        </ListGroup>
      </section>
    </>
  );
};
