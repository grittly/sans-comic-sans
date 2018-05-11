import React, { Component } from 'react';
import classnames from 'classnames';
import { GoChevronDown, GoChevronUp  } from 'react-icons/lib/go';

/**
 *  HOC for forms that can be grouped together.
 *  Augment with extra functionality like a collapsible header
 */
export default function formSectionHOC(FormSection, { title, collapsed = false }) {
  const FormSectionWrapper = class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        collapsed: collapsed,
      };
      this.toggleCollapsedState = this.toggleCollapsedState.bind(this);
    }

    toggleCollapsedState(){
      this.setState(prevState => ({
        collapsed: !prevState.collapsed,
      }))
    }

    render() {
      return (
        <div className="form-section">
          {
            title !== undefined ?
            <div className="title" onClick={this.toggleCollapsedState}>
              <h4>{title}
                {
                  this.state.collapsed ?
                    <span><GoChevronDown className="collapse-icon" /> <small>(collapsed)</small></span> :
                    <GoChevronUp className="collapse-icon" />
                }
              </h4>
            </div> :
              null
          }
          <div className={classnames('inner-container', this.state.collapsed ? 'collapsed': 'expanded')}>
            <FormSection {...this.props} />
          </div>
        </div>
      );
    }
  };

  return FormSectionWrapper;
}

