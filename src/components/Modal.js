import React, { Component } from 'react';

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
	
	return (
		<div className={overlayClassName}>
			<div className={contentClassName}>
				{props.children}
			</div>
		</div>
		);
	
}

export default Modal;