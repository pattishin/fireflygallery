import React, { Component } from 'react';
import './FireflyCard.css';

/**
 * @class FireflyCard
 * @description Card image for gallery component
 */
class FireflyCard extends Component {
  render() {
    const { frame, image, style } = this.props;

    return (
      <div className="FireflyGallery-card" style={style}>
        <img
          className="FireflyGallery-image"
          alt="gallery-card-item"
          style={frame}
          src={image}
        />
        <div className="FireflyGallery-card-wrapper">
          <div className="FireflyGallery-card-circle" />
          <div className="FireflyGallery-card-info">
            <p className="FireflyGallery-card-info-title">
              {'Gaming picture'}
            </p>
            <p className="FireflyGallery-card-info-description">
              {`(${frame.width} x ${
                frame.height
              }) Lorem ipsum star wars`}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default FireflyCard;
