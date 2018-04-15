import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CanvasPlaceholder from '../CanvasPlaceholder';
import CanvasVisible from '../CanvasVisible';
import Header from '../Header';
import { loadImage } from '../../actions';

/**
 * Container for CanvasVisible, CanvasPlaceholder and Header
 */
class CanvasContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleCanvasiResize = this.handleCanvasResize;
  }

  componentDidMount() {
    // eslint-disable-next-line no-undef
    window.addEventListener('resize', this.handleCanvasResize);
  }

  handleCanvasResize(e) {
    // TODO: update container size in redux store based on browser window size
  }

  render() {
    return (
      <div className="canvas-container" ref={(elem) => { this.canvasContainer = elem; }}>
        Header, Canvas and Canvas placeholder
        <Header />
        {
          this.props.imageStatus ?
            <CanvasVisible
              src={this.props.imageSrc}
              width={this.props.imageWidth}
              height={this.props.imageHeight}
            /> :
            <CanvasPlaceholder />
        }
      </div>
    );
  }
}

CanvasContainer.propTypes = {
  imageSrc: PropTypes.object,
  imageWidth: PropTypes.number,
  imageHeight: PropTypes.number,
  imageStatus: PropTypes.shape({
    LOADING: PropTypes.string,
    DONE: PropTypes.string,
  }),
};

CanvasContainer.defaultProps = {
  imageSrc: null,
  imageWidth: 0,
  imageHeight: 0,
  imageStatus: null,
};

const mapStateToProps = state => ({
  imageSrc: state.srcImage.src,
  imageWidth: state.srcImage.width,
  imageHeight: state.srcImage.height,
  status: state.srcImage.status,
});

const mapDispatchToProps = dispatch => ({
  loadImage: () => {
    dispatch(loadImage());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CanvasContainer);
