import React from "react";
import "./styles/LineAuth.css";

const LineAuth = ({ clientID, state, scope, redirectURI }) => {
  const lineLogin = () => {
    const query =
      `response_type=code&` +
      `client_id=${clientID}&` +
      `state=${state}&` +
      `scope=${scope}&` +
      `redirect_uri=${redirectURI}`;

    const lineAuthoriseURL =
      "https://access.line.me/oauth2/v2.1/authorize?" + query;

    window.location.href = lineAuthoriseURL;
  };

  return (
    <div className="line-button-container">
      <img
        src={"https://i.imgur.com/khY4T6I.png"}
        className="line-button"
        onClick={lineLogin}
      />
    </div>
  );
};

export default LineAuth;
