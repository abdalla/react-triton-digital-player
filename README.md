# react-triton-digital-player
React component to use [triton digital](https://www.tritondigital.com/) sdk

Triton's technology is designed to help broadcasters, podcasters, and music services streamline their day-to-day operations, build their online audience, and maximize their online revenue.

This component was develop to help the triton sdk implemantation into your react project.

# prerequisites
You have to import the Triton Digital SDK into you app.

```
<script src="//sdk.listenlive.co/web/2.9/td-sdk.min.js"></script>
```

# how to use

#### Install
```
npm i react-triton-digital-player
```
or
```
yarn add react-triton-digital-player
```

#### *ES5*
```
var Player = require('react-triton-digital-player');
```

#### *ES6*
```
import Player from 'react-triton-digital-player';
```

```
<Player station="YOUR_STATION" [options={options}] />
```

*OBS:* **options are optional.** 

### EXAMPLE

```
import React, { Component } from 'react';
import Player from 'react-triton-digital-player';

class App extends Component {
	render() {
	const options = {
			setExternalProps: this.setExternalProps,
			onAdBlockerDetected: this.onAdBlockerDetected,
			autoPlay: true,
			showPlayButton: true,
			showStopButton: true,
			showResumeButton: true,
			showPauseButton: true
  };
  		
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">MY APP</h1>
				</header>
				<Player station="YOUR_STATION" options={options} />
			</div>
		);
	}
}

export default App;
```

# options

## *IN DEVELOPMENT*
