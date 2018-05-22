import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { GoX } from 'react-icons/lib/go';
import { FaSpinner } from 'react-icons/lib/fa';
import classnames from 'classnames';

/**
 * Modal that displays help information
 */
class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infographicSrc: null,
    };
  }

  componentDidMount(){
    const image = new window.Image();
    image.src = '/images/infographic.svg';
    image.onload = () => {
      this.setState({
        infographicSrc: image.src
      }) 
    }
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
              <p>Sometimes we do things that we regret after - like using Comic Sans. However, as with anything on internet,. In an attempt to help cleanse the internet of  </p>
            </div>
            <div className="section">
              <h2>How it works</h2>
              <p>The obfuscation works by simply adding noise to pixels defined by a selection. The noise generated is driven by a keyword of your choosing. In more technical terms, the string used for password provides the seed for a pseudo random number generator (PRNG), which is exactly what generates the noise.</p>
              <figure className="figure">
                <div className={classnames('image','infographic', {loading: this.state.infographicSrc === null})} >
                  <FaSpinner className="spinner" />
                  {
                    this.state.infographicSrc !== null ?
                      <img src={this.state.infographicSrc} /> :
                      null
                  }
                </div>
                <figcaption>Figure 1. Load an image, chose an area, encrypt or decrypt!</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>,
      document.body,
    );
  }
}

export default Modal;

