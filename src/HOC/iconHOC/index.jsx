import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const VIEWBOX_SIZE = 24;

/**
 *  HOC component for svg icons. Provides a wrapper with extra functionality.
 */
export default function iconsHOC(Icon) {
  const IconWrapper = class extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      return (
        <a
          className={classnames('icon-hoc', { hidden: this.props.hidden })}
          onClick={this.props.onClick}
          href={this.props.href}
          download={this.props.href ? 'obfuscatedImage' : null}
        >
          <svg
            viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
          >
            <rect x="0" y="0" width={VIEWBOX_SIZE} height={VIEWBOX_SIZE} fill="none" />
            <Icon {...this.props} />
          </svg>
          <svg
            viewBox={`0 0 ${VIEWBOX_SIZE} ${6}`}
            className={classnames('underline', { hidden: this.state.hover })}
          >
            <g>
              <path d="M19.58,1.341c1.298,0.01 3.111,0.102 3.111,0.102c0,0 1.112,0.193 1.117,1.327c0.006,1.292 -1.321,1.123 -1.321,1.123c-7.092,-0.759 -14.203,-0.291 -21.175,0.765c-0.257,0.04 -1.312,-0.608 -1.312,-0.608c0,0 0.395,-0.805 0.777,-0.858c3.264,-0.452 12.473,-1.875 18.803,-1.851Z" />
            </g>
          </svg>
        </a>
      );
    }
  };

  IconWrapper.defaultProps = {
    href: null,
  };

  IconWrapper.propTypes = {
    hidden: PropTypes.bool.isRequired,
    href: PropTypes.string,
    onClick: PropTypes.func.isRequired,
  };

  return IconWrapper;
}

