import React, { useState, useEffect } from "react";
import LoadingMask from "./LoadingMask";

const Subscription = () => {
  const [inputValue, setInputValue] = useState("");
  const [disableButton, setDisableButton] = useState(true);
  const [load, setLoad] = useState(false);
  const [formEnabled, setFormEnabled] = useState(true);
  const [response, setResponse] = useState(false);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  useEffect(() => {
    if (/\S+@\S+\.\S+/.test(inputValue)) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [inputValue]);

  useEffect(() => {
    if (response === true) {
      setInterval(function () {
        setFormEnabled(false);
      }, 5000);
    }
  }, [response]);

  const postEmail = () => {
    setLoad(true);
    fetch("api/subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: inputValue }),
    }).then((data) => {
      setResponse(true);
    });
  };

  return (
    <div>
      {formEnabled === true ? (
        <div>
          <h3>Subscribe to our newsletter</h3>
          {load === false ? (
            <div>
              <input type="email" onChange={handleChange} value={inputValue} />
              <button disabled={disableButton} onClick={postEmail}>
                Subscribe
              </button>
            </div>
          ) : load === true && response === false ? (
            <LoadingMask />
          ) : response === true && response !== undefined ? (
            <div>Subscribed</div>
          ) : (
            <div>Oops, something happened</div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Subscription;
