import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CanvasPlaceholder from '../CanvasPlaceholder';
import CanvasVisible from '../CanvasVisible';
import Header from '../Header';
import {
  loadImage,
  unloadImage,
} from '../../actions';
import {
  IMAGE_STATUS
} from '../../constants';

/**
 * Container for CanvasVisible, CanvasPlaceholder and Header
 */
class CanvasContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleCanvasiResize = this.handleCanvasResize.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
  }

  componentDidMount() {
    // eslint-disable-next-line no-undef
    window.addEventListener('resize', this.handleCanvasResize);
  }

  handleCanvasResize(e) {
    // TODO: update container size in redux store based on browser window size
  }

  handleImageUpload(e){
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    this.props.imageLoading();
    reader.onload = () => {
      const image = new window.Image();
      image.src = reader.result;
      image.onload = () => {
        this.props.loadImage(image, image.width, image.height);
      }
      image.onerror = this.props.unloadImage;
    }
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
              width={this.props.imageWidth}
              height={this.props.imageHeight}
            /> :
            <CanvasPlaceholder
              handleImageUpload={this.handleImageUpload}
            />
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
  imageStatus: state.srcImage.status,
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
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CanvasContainer);
