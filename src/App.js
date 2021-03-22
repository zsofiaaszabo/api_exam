import React, { useState, useEffect } from "react";
import LoadingMask from "./Components/LoadingMask";
import Hotel from "./Components/Hotel";
import Subscription from "./Components/Subscription";

const App = () => {
  const [data, setData] = useState();
  const [load, setLoad] = useState(false);
  const [loadSubscription, setLoadSubscription] = useState(false);
  const [subscription, setSubscription] = useState(false);

  useEffect(() => {
    setLoad(false);
    setLoadSubscription(false);
    setLoadSubscription(false);
    fetch("api/hotels")
      .then((response) => response.json())
      .then((response) => setData(response))
      .then((response) => setLoad(true))
      .then((response) => setLoadSubscription(true));
  }, []);

  useEffect(() => {
    setInterval(function () {
      setSubscription(true);
    }, 20000);
  }, [loadSubscription]);

  return (
    <div>
      <h1>Hotels</h1>
      {load === true ? (
        data !== undefined ? (
          data.map((item) => (
            <Hotel
              key={item.name}
              name={item.name}
              stars={item.stars}
              city={item.city}
            />
          ))
        ) : (
          <div>Oops, something happened</div>
        )
      ) : (
        <LoadingMask />
      )}
      {subscription === true ? <Subscription /> : null}
    </div>
  );
};
export default App;
