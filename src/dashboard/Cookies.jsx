import React, { useState } from "react";
import Cookies from "js-cookie";

const Agreecookies = () => {
  const [showCookieConsent, setShowCookieConsent] = useState(true);

  const handleAcceptCookies = () => {
    Cookies.set("cookieConsent", "false");
    setShowCookieConsent(true);
  };

  return (
    <div className="Agreecookies">
      {showCookieConsent && (
        <div className="cookie-consent">
          <p>
            Ce site utilise des cookies pour améliorer votre expérience.
            Acceptez-vous l'utilisation des cookies ?
          </p>
          <button onClick={handleAcceptCookies}>Accepter</button>
        </div>
      )}
    </div>
  );
};

export default Agreecookies;
