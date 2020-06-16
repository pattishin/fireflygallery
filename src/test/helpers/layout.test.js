import * as helpers from '../../helpers/layout';

describe('layout helpers', () => {
  let mockFrames, mockFrames2, mockFrames3;

  beforeEach(() => {
    mockFrames = [
      { height: 360, width: 1000 },
      { height: 600, width: 400 },
      { height: 400, width: 600 },
      { height: 400, width: 600 },
      { height: 400, width: 300 },
      { height: 400, width: 300 }
    ];

    mockFrames2 = [
      { height: 360, width: 800 },
      { height: 440, width: 300 },
      { height: 400, width: 200 }
    ];

    mockFrames3 = [
      { height: 300, width: 100 },
      { height: 300, width: 100 },
      { height: 300, width: 100 },
      { height: 300, width: 100 }
    ];
  });

  describe('getAspectRatioWidth', () => {
    it('correctly gives 0 if no params given', () => {
      expect(helpers.getAspectRatioWidth()).toEqual(0);
    });

    it('correctly gives the expected aspect ratio width', () => {
      expect(helpers.getAspectRatioWidth(100, 200, 100)).toEqual(200);
    });
  });

  describe('getAspectRatioHeight', () => {
    it('correctly gives 0 if no params given', () => {
      expect(helpers.getAspectRatioHeight()).toEqual(0);
    });

    it('correct gives the correct aspect ratio height', () => {
      expect(helpers.getAspectRatioHeight(100, 200, 100)).toEqual(50);
    });
  });

  describe('layoutFrames', () => {
    it('correctly gives empty array when required params are not given', () => {
      const expectedLayout = [];
      expect(helpers.layoutFrames(mockFrames)).toEqual(expectedLayout);
    });

    it('correctly gives grid of frames that describe layout with appropriate aspect ratio', () => {
      const expectedLayout = [
        [{ height: 288, width: 800 }],
        [
          { height: 217, width: 145 },
          { height: 218, width: 327 },
          { height: 218, width: 327 }
        ],
        [{ height: 360, width: 270 }, { height: 360, width: 270 }]
      ];

      expect(helpers.layoutFrames(mockFrames, 360, 800)).toEqual(
        expectedLayout
      );
    });
  });

  describe('createRows', () => {
    it('correctly gives empty array when required params are not given', () => {
      const expectedLayout = [];
      expect(helpers.createRows(mockFrames2)).toEqual(expectedLayout);
    });

    it('correctly gives the grid of frames that describe layout rows', () => {
      const expectedLayout = [
        [{ height: 360, width: 800 }],
        [{ height: 440, width: 300 }, { height: 400, width: 200 }]
      ];

      expect(helpers.createRows(mockFrames2, 360, 800)).toEqual(expectedLayout);
    });

    it('correctly gives the list of frames as one row', () => {
      const expectedLayout = [
        [
          { height: 300, width: 100 },
          { height: 300, width: 100 },
          { height: 300, width: 100 },
          { height: 300, width: 100 }
        ]
      ];

      expect(helpers.createRows(mockFrames3, 300, 400)).toEqual(expectedLayout);
    });
  });

  describe('getFrameRatioPerRow', () => {
    it('correctly gives empty array when required params are not given', () => {
      const expectedLayout = [];
      expect(helpers.getFrameRatioPerRow()).toEqual(expectedLayout);
    });

    it('correctly gives the appropriate ratio width per frame', () => {
      const expectedLayout = [
        { height: 90, width: 250 },
        { height: 150, width: 100 },
        { height: 100, width: 150 },
        { height: 100, width: 150 },
        { height: 100, width: 75 },
        { height: 100, width: 75 }
      ];

      expect(helpers.getFrameRatioPerRow(mockFrames, 800)).toEqual(
        expectedLayout
      );
    });
  });

  describe('setRowMaxHeight', () => {
    it('correctly gives empty array when required params are not given', () => {
      const expectedLayout = [];
      expect(helpers.setRowMaxHeight()).toEqual(expectedLayout);
    });

    it('correctly sets the max frame height for row', () => {
      const expectedLayout = [
        { height: 199, width: 444 },
        { height: 199, width: 136 },
        { height: 200, width: 100 }
      ];
      expect(helpers.setRowMaxHeight(mockFrames2, 200)).toEqual(expectedLayout);
    });
  });
});
