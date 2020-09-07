import React from "react";
import Authentication from "../Authentication";
import { useSelector } from "react-redux";
import { Container, Avatar, UserInfo, Auth } from "./Navbar";
import { Data } from "../Interface";

const Navbar: React.FC = () => {
  const dataAuth = useSelector((state: Data) => state.data.auth);

  return (
    <Container>
      {dataAuth.authenticated ? (
        <UserInfo>
          <span>Welcome, {dataAuth.user.name}!</span>
          <Avatar src={dataAuth.user.image} />
        </UserInfo>
      ) : (
        <></>
      )}
      <Auth>
        <Authentication />
      </Auth>
    </Container>
  );
};

export default Navbar;
