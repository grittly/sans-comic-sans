import React, { Component } from 'react';
import GoMarkGithub from 'react-icons/lib/go/mark-github';

/**
 *  Footer component
 */
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <footer className="footer font-small">
        <a href="https://github.com/grittly/sans-comic-sans">
          Github <GoMarkGithub />
        </a>
      </footer>
    );
  }
}

export default Footer;
