import React, { Component } from 'react';
import FireflyGallery from './components/FireflyGallery/index';
import './App.css';

/**
 * @class App
 */
class App extends Component {
  render() {
    const frames = [
      { height: 360, width: 1000 },
      { height: 600, width: 400 },
      { height: 400, width: 600 },
      { height: 400, width: 600 },
      { height: 400, width: 300 },
      { height: 400, width: 300 }
    ];

    return (
      <div className="App">
        <FireflyGallery
          frames={frames}
          width={800}
          maxRowHeight={360}
          spacing={10}
        />
      </div>
    );
  }
}

export default App;
