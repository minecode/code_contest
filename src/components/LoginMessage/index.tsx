import React from "react";

import base64 from "base-64";
import apiDatabase from "../../services/apiDatabase";
import { Data } from "../Interface";
import { Col, Row } from "react-bootstrap";
import { BtnGoogle } from "../Authentication/Authentication";
import { GoogleLogin } from "react-google-login";
import { LoginInfo, LoginMessage } from "./LoginMessage";
import { useSelector, useDispatch } from "react-redux";

const Challenge: React.FC = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: Data) => state.data);

  const login = async (response: any) => {
    const newData = { data: data };
    newData.data.auth = {
      authenticated: true,
      user: {
        id: response.googleId,
        name: response.profileObj.givenName,
        surname: response.profileObj.familyName,
        image: response.profileObj.imageUrl,
      },
      token: response.tokenId,
    };
    await apiDatabase.post(
      `/user/${response.googleId}/${response.profileObj.givenName}/${
        response.profileObj.familyName
      }/${base64.encode(response.profileObj.imageUrl)}`
    );
    dispatch({ type: "LOGIN", data: newData });
  };

  const badResponseGoogle = (response: string) => {
    dispatch({ type: "BAD_RESPONSE", data: null });
  };

  return (
    <LoginMessage>
      <Row>
        <Col xs={12} className="text-center">
          <LoginInfo>
            You need to{" "}
            <GoogleLogin
              clientId="156221636932-bvl7ocr3bhrkikgcqc99k4g1a1s0sla1.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={login}
              onFailure={badResponseGoogle}
              cookiePolicy={"single_host_origin"}
              isSignedIn={true}
              render={(renderProps) => (
                <BtnGoogle
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  Sign In w/ Google
                </BtnGoogle>
              )}
            />{" "}
            to send your solution!
          </LoginInfo>
        </Col>
      </Row>
    </LoginMessage>
  );
};

export default Challenge;
