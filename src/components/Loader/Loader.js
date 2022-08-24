import React from "react";
import "./loader.css";

class Loader extends React.Component {
  render() {
    return (
      <div className="loader">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
    );
  }
}

export { Loader };
