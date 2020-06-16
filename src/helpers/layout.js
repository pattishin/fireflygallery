/**
 * @method getAspectRatioWidth
 * ***********************************
 * @param {number} original frame height
 * @param {number} original frame width
 * @param {number} new height for image
 * @returns {number} calculated aspect ratio width
 * @description (original width / original height) x new height = new width
 */
export const getAspectRatioWidth = (height, width, newHeight) => {
  if (!height || !width || !newHeight) {
    return 0;
  }
  return Math.floor(newHeight * (width / height));
};

/**
 * @method getAspectRatioHeight
 * ***********************************
 * @param {number} original frame height
 * @param {number} original frame width
 * @param {number} new width for image
 * @returns {number} calculated aspect ratio height
 * @description (original height / original width) x new width = new height
 */
export const getAspectRatioHeight = (height, width, newWidth) => {
  if (!height || !width || !newWidth) {
    return 0;
  }
  return Math.floor(newWidth * (height / width));
};

/**
 * @method layoutFrames
 * ***********************************
 * @param {Array<Object>} array of frame objects with height/width properties
 * @param {number} width of the containing element, in pixels
 * @param {number} maximum height of each row of images, in pixels
 * @param {number} spacing between images in a row, in pixels
 * @returns {Array<Array<Object>>} array of rows of resized frames
 */
export const layoutFrames = (frames, maxRowHeight, containerWidth) => {
  if (!frames || frames.length < 1 || !containerWidth || !maxRowHeight) {
    return [];
  }

  let rows = createRows(frames, maxRowHeight, containerWidth);

  return rows.map(rowFrames =>
    getFrameRatioPerRow(
      setRowMaxHeight(rowFrames, maxRowHeight),
      containerWidth
    )
  );
};

/**
 * @method createRows
 * ***********************************
 * @param {Array<Object>} array of frame objects with height/width properties
 * @param {number} maximum height of each row of images, in pixels
 * @param {number} width of the containing element, in pixels
 * @returns {Array<Array<Object>>} array of rows
 * @description
 *  * Determine Rows (greedy alg)
 *   - Using potential aspect width size for each frame to determine which frame goes into which row.
 *   - If calculated row "widthTotal" exceeds container width, reset and create new row
 */
export const createRows = (frames, maxRowHeight, containerWidth) => {
  if (!frames || frames.length < 1 || !containerWidth || !maxRowHeight) {
    return [];
  }

  let allFrames = [],
    frameRow = [],
    widthTotal = 0;

  frames.forEach(({ width, height }, index) => {
    const aspectWidth = getAspectRatioWidth(height, width, maxRowHeight);
    const potentialWidth = aspectWidth + widthTotal;

    frameRow.push({ width, height }); // push "frame" into current row
    widthTotal = potentialWidth; // update row width total

    const isLast = index === frames.length - 1;
    // Reset when row width restriction has been exceeded or is last frame
    if (potentialWidth >= containerWidth || isLast) {
      allFrames.push(frameRow);
      widthTotal = 0;
      frameRow = [];
    }
  });

  return allFrames;
};

/**
 * @method getFrameRatioPerRow
 * ***********************************
 * @param {Array<Object>} array of frame objects with height/width properties
 * @param {number} width of the containing element, in pixels
 * @returns {Array<Array<Object>>} row array with adjusted height and width values
 * for each frame based on the ratio between frames current width (w/ total width)
 * and the required width (containerWidth)
 *
 * @description
 * Example ->
 * frames: [{ width: 10, height: 15 }, { width: 15, height: 10 }]
 * widthTotal = 25;
 * containerWidth = 20;
 *
 * newWidth = (width/widthTotal) * containerWidth;
 * ==> frame 1: (10/25) * 20 = 8
 * ==> frame 2: (15/25) * 20 = 12
 */
export const getFrameRatioPerRow = (frames, containerWidth) => {
  if (!frames || frames.length < 1 || !containerWidth) {
    return [];
  }

  let widthTotal = frames
    .map(frame => frame.width)
    .reduce((acc, frame) => acc + frame);

  if (widthTotal > containerWidth) {
    // Gather new widths after calculating ratios for each frame width
    return frames.map(({ width, height }) => {
      const newWidth = Math.floor((width / widthTotal) * containerWidth);
      return {
        width: newWidth,
        height: getAspectRatioHeight(height, width, newWidth)
      };
    });
  }

  return frames;
};

/**
 * @method setRowMaxHeight
 * ***********************************
 * @param {Array<Object>} array of frame objects with height/width properties
 * @returns {Array<Array<Object>>} row array with frames set to maximum row height
 * @description Sets the max height for row, unless it exceeds global maxRowHeight.
 */
export const setRowMaxHeight = (frames, maxRowHeight) => {
  if (!frames || frames.length < 1 || !maxRowHeight) {
    return [];
  }

  let maxCurrentHeight = Math.max(...frames.map(frame => frame.height));
  let adjustedMaxHeight =
    maxCurrentHeight > maxRowHeight ? maxRowHeight : maxCurrentHeight;

  return frames.map(({ width, height }) => {
    let rowWidth = getAspectRatioWidth(height, width, adjustedMaxHeight);
    return {
      width: rowWidth,
      height: getAspectRatioHeight(height, width, rowWidth)
    };
  });
};
