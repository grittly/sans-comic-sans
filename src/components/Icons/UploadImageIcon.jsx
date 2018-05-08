import React from 'react';
import classnames from 'classnames';

/**
 *  SVG graphic for CanvasPlaceholder
 */

const UploadImageIcon = props => (
  <div className={classnames('upload-image-icon', {loading: props.loading})} className="upload-image-icon">
    <svg viewBox='0 0 256 256' >
      <g className="container">
        <path className="arrow" d="M128.106,7.639c0.915,-2.114 5.297,-2.702 6.673,0.157c0,0 34.756,54.638 41.002,66.44c1.593,3.009 1.902,6.065 -3.525,4.371l-27.488,-9.497c0,0 5.31,31.396 5.716,37.783c0.164,2.578 -2.729,2.618 -3.279,0.536c-1.808,-6.841 -7.57,-41.584 -7.57,-41.584c0,0 -0.009,-3.357 3.053,-2.754l23.347,7.502l-34.514,-53.402c0,0 -21.487,32.436 -31.772,47.777l20.119,-6.526c3.97,-1.533 4.791,2.856 4.698,4.021c0,0 -11.49,76.324 -15.763,103.971c-0.311,2.005 -3.494,2.949 -3.144,-1.779l11.183,-97.263l-25.796,8.804c-3.274,0.842 -6.558,-2.566 -4.681,-6.06l41.741,-62.497Z" />
        <path className="picture" d="M35.445,223.967c0,0 33.73,-92.763 41.582,-111.501c2.153,-5.139 7.208,-3.965 8.627,0.42c0,0 12.19,44.021 17.37,62.917c0,0 14.964,-9.216 17.744,-10.559c3.58,-1.731 5.856,-0.144 7.243,2.047c0,0 19.271,36.841 19.271,36.841c0,0 23.683,-39.069 27.839,-44.301c3.751,-4.723 8.505,-2.503 9.726,0.935l23.969,63.201l0.353,2.134l-0.493,2.058c-1.251,1.759 -1.281,1.768 -3.103,2.924l-0.018,0.007c-1.863,0.322 -2.439,0.704 -4.262,-0.08c-0.648,-0.279 -1.166,-0.795 -1.749,-1.193c0,0 -1.176,-1.827 -1.176,-1.827l-19.846,-53.13l-27.125,42.844c-3.297,4.565 -7.756,1.955 -9.234,-0.406c0,0 -20.835,-40.367 -20.835,-40.367c0,0 -16.517,9.764 -18.805,11.04c-3.842,2.142 -6.536,-0.455 -7.468,-3.071l-15.006,-56.586c0,0 -30.811,73.289 -44.303,104.52l-0.029,0.028c0,0 0.236,7.858 0.236,7.858l181.436,0.72l8.332,-110.816c0,0 -31.859,-3.664 -38.801,-4.442c-3.542,-0.398 -2.788,-3.495 1.699,-3.226l40.339,2.497c0,0 2.403,0.188 2.649,2.715c0,0 -3.464,83.154 -5.207,118.219c0,0 -0.886,3.581 -3.674,4.356c0,0 -165.678,2.847 -191.998,0.752c-4.68,-0.373 -5.409,-5.205 -5.409,-5.205c0,0 -2.407,-71.793 -3.611,-107.689c0.126,-2.631 2.111,-5.121 4.856,-5.701c0,0 22.792,-3.044 27.798,-3.508c5.89,-0.545 9.336,9.263 1.388,11.109c0,0 -22.778,2.807 -22.778,2.807l2.473,80.659Z" />
        <path className="sun" d="M158.224,111.035c10.914,-0.01 20.333,9.015 20.428,19.555c0.061,6.784 -2.013,14.283 -7.834,18.741c-3.939,3.017 -11.881,7.271 -22.377,1.408c-5.527,-3.088 -11.283,-11.908 -10.785,-19.933c0.645,-10.393 9.654,-19.623 20.568,-19.771Zm16.496,17.96c-1.282,-9.757 -13.812,-16.192 -23.209,-8.964c-6.599,5.076 -7.796,16.659 0.84,22.045c7.412,4.623 14.484,1.767 17.66,-1.671c4.795,-5.191 4.867,-10.225 4.709,-11.41Z" />
      </g>
    </svg>
  </div>
)

export default UploadImageIcon;