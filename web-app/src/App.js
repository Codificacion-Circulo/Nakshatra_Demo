import React, { Fragment, useEffect, useRef } from "react";
import Routes from "./Routes";
import alanBtn from "@alan-ai/alan-sdk-web";
import Mapp from "./components/maps/Mapp"

function App() {
  const alanBtnContainer = useRef();
  const logoEl = useRef();

  useEffect(() => {
    alanBtn({
      key: process.env.REACT_APP_ALAN_SDK_KEY,
      rootEl: alanBtnContainer.current,
      onCommand: (commandData) => {
        console.log(commandData);
        if (commandData.command === "command-example") {
          if (logoEl.current) {
            logoEl.current.style.transform = "rotate(180deg)";
          }
        }
      },
    });
  }, []);

  return (
    <Fragment>
      <Routes />
      <div className="App">
        <div ref={alanBtnContainer}></div>
      </div>
      {/* <Mapp /> */}
    </Fragment>
  );
}

export default App;
