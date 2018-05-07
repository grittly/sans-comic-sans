import React, { Component } from 'react';
import classnames from 'classnames';

const VIEWBOX_SIZE = 24;

/**
 *  HOC component for svg icons. Provides a wrapper with extra functionality.
 */
export default function iconsHOC(Icon) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      return(
        <div className="icon-hoc" className={classnames('icon-hoc', {hidden: this.props.hidden})} onClick={this.props.onClick} >
          <svg
            viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
          >
            <Icon {...this.props} />
          </svg>
        </div>
      )
    }
  };
}
