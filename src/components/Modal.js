import React from 'react';
import './Modal.css';

const Modal = (props) => {
	
	var overlayClassName = "ModalOverlay";
	var contentClassName = "Modal";
	
	if (!props.showing) {
		overlayClassName += " ModalHidden";
		contentClassName += " ModalHidden";
	}
	
	if (props.fullscreen) {
		contentClassName += " Full";
	} else {
		contentClassName += " Centered";
	}
	
	if (props.allowNavigation) {
		overlayClassName += " AllowNavigation";
	}
	return (
		<div className={overlayClassName} onClick={props.onRequestClose}>
			<div className={contentClassName} onClick={e => { e.stopPropagation(); }}>
				{props.children}
			</div>
		</div>
		);
	
}

export default Modal;