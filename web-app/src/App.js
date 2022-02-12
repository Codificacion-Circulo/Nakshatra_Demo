import React, { Fragment, useEffect, useRef } from "react";
import Routes from "./Routes";
import alanBtn from "@alan-ai/alan-sdk-web";
import Mapp from "./components/maps/Mapp"

function App() {
  const alanBtnContainer = useRef();
  const logoEl = useRef();

  useEffect(() => {
    alanBtn({
      key: "16e640254ab52f4aa02148c35fd8d1c92e956eca572e1d8b807a3e2338fdd0dc/stage",
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
