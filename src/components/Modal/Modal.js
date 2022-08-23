import React from "react";
import ReactDOM from "react-dom";
import "./modal.css";

class Modal extends React.Component {
  render() {
    const { open, onClose } = this.props;

    if (!open) return null;

    return ReactDOM.createPortal(
      <div onClick={onClose}>{this.props.children}</div>,
      document.getElementById("portal")
    );
  }
}

export default Modal;
