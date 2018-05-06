import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import classnames from 'classnames';
import CanvasContainer from '../CanvasContainer';
import FormsContainer from '../FormsContainer';
import Footer from '../Footer';

const MainContainer = props => (
  <div className="mainContainer">
    <div className="leftContainer">
      <CanvasContainer />
    </div>
    <div
      className={classnames(
        'rightContainer',
        { collapsed: props.collapseRightContainer },
      )}
    >
      <FormsContainer />
      <Footer />
    </div>
  </div>
);

const mapStateToProps = state => ({
  collapseRightContainer: state.srcImage.status === null,
});

MainContainer.propTypes = {
  collapseRightContainer: PropTypes.bool.isRequired,
}

export default hot(module)(
  connect(mapStateToProps)(MainContainer)
);
