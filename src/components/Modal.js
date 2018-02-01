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
		<div className={overlayClassName}>
			<div className={contentClassName}>
				{props.children}
			</div>
		</div>
		);
	
}

export default Modal;