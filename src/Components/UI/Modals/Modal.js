import { Fragment } from "react";

import ReactDOM from "react-dom";

import classes from "./Modal.module.css";


const BackDrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClick}></div>;
};
const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      {props.children}
    </div>
  );
};

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<BackDrop onClick={props.onClose} />, document.getElementById("backdrop"))}
      {ReactDOM.createPortal(
        (<ModalOverlay>{props.children}</ModalOverlay>
        ),
        document.getElementById("overlays")
      )}
    </Fragment>
  );
};
export default Modal;
