import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CanvasPlaceholder from '../CanvasPlaceholder';
import CanvasVisible from '../CanvasVisible';
import Header from '../Header';
import ActionsPanel from '../ActionsPanel';
import {
  loadImage,
  unloadImage,
  resizeCanvas,
} from '../../actions';
import { IMAGE_STATUS } from '../../constants';

/**
 * Container for CanvasVisible, CanvasPlaceholder and Header
 */
class CanvasContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleCanvasResize = this.handleCanvasResize.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
  }

  componentDidMount() {
    // eslint-disable-next-line no-undef
    window.addEventListener('resize', this.handleCanvasResize);
    this.handleCanvasResize();
  }

  handleCanvasResize() {
    this.props.resizeCanvas(this.canvasContainer.offsetWidth);
  }

  handleImageUpload(e) {
    // eslint-disable-next-line no-undef
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    this.props.imageLoading();
    reader.onload = () => {
      // eslint-disable-next-line no-undef
      const image = new window.Image();
      image.src = reader.result;
      image.onload = () => {
        this.props.loadImage(image, image.width, image.height);
      };
      image.onerror = this.props.unloadImage;
    };
    reader.onerror = this.props.unloadImage;
  }

  render() {
    return (
      <div className="canvas-container" ref={(elem) => { this.canvasContainer = elem; }}>
        Header, Canvas and Canvas placeholder
        <Header />
        {
          this.props.imageStatus === IMAGE_STATUS.DONE ?
            <CanvasVisible
              src={this.props.imageSrc}
              width={this.props.containerWidth}
              height={this.props.containerHeight}
              displaySelections={!this.props.isObfuscated}
            /> :
            <CanvasPlaceholder
              handleImageUpload={this.handleImageUpload}
              loading={this.props.imageStatus === IMAGE_STATUS.LOADING}
            />
        }
        <ActionsPanel />
      </div>
    );
  }
}

CanvasContainer.propTypes = {
  // eslint-disable-next-line no-undef
  imageSrc: PropTypes.instanceOf(HTMLImageElement),
  containerWidth: PropTypes.number,
  containerHeight: PropTypes.number,
  imageStatus: PropTypes.oneOf([
    IMAGE_STATUS.LOADING,
    IMAGE_STATUS.DONE,
  ]),
  imageLoading: PropTypes.func.isRequired,
  unloadImage: PropTypes.func.isRequired,
  loadImage: PropTypes.func.isRequired,
  resizeCanvas: PropTypes.func.isRequired,
  isObfuscated: PropTypes.bool.isRequired,
};

CanvasContainer.defaultProps = {
  imageSrc: null,
  imageStatus: null,
  containerWidth: 0,
  containerHeight: 0,
};

const mapStateToProps = state => ({
  imageSrc: state.srcImage.src,
  containerWidth: state.srcImage.containerWidth,
  containerHeight: state.srcImage.containerWidth * state.srcImage.aspectRatio,
  imageStatus: state.srcImage.status,
  isObfuscated: state.obfuscatedImage.src !== null,
});

const mapDispatchToProps = dispatch => ({
  loadImage: (image, width, height) => {
    dispatch(loadImage(IMAGE_STATUS.DONE, image, width, height));
  },
  unloadImage: () => {
    dispatch(unloadImage());
  },
  imageLoading: () => {
    dispatch(loadImage(IMAGE_STATUS.LOADING));
  },
  resizeCanvas: (width) => {
    dispatch(resizeCanvas(width));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CanvasContainer);
