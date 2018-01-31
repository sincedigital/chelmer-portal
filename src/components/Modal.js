import React, { Component } from 'react';

const Modal = (props) => {
	
	var overlayClassName = "ModalOverlay";
	var contentClassName = "Modal";
	
	if (!props.showing) {
		overlayClassName += " ModalHidden";
		contentClassName += " ModalHidden";
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