import React, { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { Button, Card } from "semantic-ui-react";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { instance, accounts, inProgress } = useMsal();
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (accounts.length > 0) {
      navigate('/MainPage');
    }
  }, [accounts.length, navigate]);

  const handleLogin = async () => {
    try {
      const loginResponse = await instance.loginPopup();
      console.log(loginResponse);
      navigate('/MainPage');
    } catch (error) {
      setErrorMessage("Login failed. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div
      style={{
        justifyItems: "center",
        justifyContent: "center",
        display: "flex",
        marginTop: "100px",
      }}
    >
      <Card fluid style={{ width: "30%", height: "20vh" }}>
        <Card.Content>
          <div
            style={{
              justifyContent: "center",
              justifyItems: "center",
              display: "flex",
            }}
          >
            <h1>Login Page</h1> 
          </div>
          <h3
            style={{
              justifyContent: "center",
              justifyItems: "center",
              display: "flex",
            }}
          >
            Click in the Login Button
          </h3>
        </Card.Content>
        <Card.Content extra>
          <Button primary onClick={handleLogin}>
            {" "}
            {inProgress ? "Login" : "Login with Microsoft"}
          </Button>
          <div style={{ float: "inline-end" }}>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default LoginPage;
