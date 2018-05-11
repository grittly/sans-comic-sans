import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { GoX } from 'react-icons/lib/go';

/**
 * Modal that displays help information
 */
class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return ReactDOM.createPortal(
      <div className="modal">
        <div className="container">
          <div className="heading">
            <a onClick={() => this.props.closeModal()}><GoX size={40}/></a>
          </div>
          <div className="content">
            <div className="section">
              <h2>Why?</h2>
              <p></p>
            </div>
            <div className="section">
              <h2>How it works</h2>
              <p>The obfuscation works by simply adding noise to pixels defined by a selection. The noise generated is driven by a keyword of your choosing. In more technical terms, the string used for password provides the seed for a pseudo random number generator (PRNG), which is exactly what generates the noise.</p>
            </div>
          </div>
        </div>
      </div>,
      document.body,
    );
  }
}

export default Modal;

