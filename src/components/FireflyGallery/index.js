import React, { Component } from 'react';
import FireflyCard from '../FireflyCard';
import { layoutFrames } from '../../helpers/layout';
import * as images from '../../constants/index';
import './FireflyGallery.css';

/**
 * @class FireflyGallery
 * @description gallery photo container
 */
class FireflyGallery extends Component {
  render() {
    const { frames, width, maxRowHeight, spacing } = this.props;
    const rows = layoutFrames(frames, maxRowHeight, width, spacing);
    const cardProps = { spacing, height: maxRowHeight };

    return (
      <div className="FireflyGallery" style={{ width }}>
        <h1 className="FireflyGallery-title">Firefly Gallery</h1>
        {rows.map((row, i) => (
          <div key={`row${i}`} className="FireflyGallery-row">
            {row.map((frame, j) => (
              <FireflyCard
                key={`card${i}_${j}`}
                image={images[`image${i}_${j}`]}
                frame={frame}
                style={{
                  width: frame.width,
                  marginLeft: j > 0 ? spacing : 0
                }}
                {...cardProps}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default FireflyGallery;
