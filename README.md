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
			useItByMyOwn: false,
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
| Option               |  Type    |Default    | Description  |
| -------------------- |----------|-----------|--------------|
| setExternalProps     | function | undefined |The player component will call this function providing a json with artist name and music title. |
| onAdBlockerDetected  | function | undefined |The player will call this function when add block was detected. |
| useItByMyOwn         | boolean  | false     |To use your own play, stop, pause, resume and volume component|
| autoPlay             | boolean  | false     |Play will be automatically |
| showPlayButton       | boolean  | false     |Will display the component play button |
| showStopButton       | boolean  | false     |Will display the component stop button |
| showPauseButton      | boolean  | false     |Will display the component pause button |
| showResumeButton     | boolean  | false     |Will display the component resume button |

>**Note:** _the autoplay feature is disabled on mobile (iOS, Android) with HTML5. You must call the play function only after the result of a user action._

# how to use your own components

```
import Player, {setVolume, play, stop, pause, resume } from 'react-triton-digital-player';

class App extends Component {
	onAdBlockerDetected() {
		console.log('AdBlockerDetected');
	}

	setExternalProps(props) {
		console.log(props);
	}
	
	render() {
	const options = {
			setExternalProps: this.setExternalProps,
			onAdBlockerDetected: this.onAdBlockerDetected,
			useItByMyOwn: true,
			autoPlay: true
  };
  		
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">MY APP</h1>
				</header>
				<Player station="YOUR_STATION" options={options} />
				
				<button
					onClick={e => {
						e.preventDefault();
						stop();
					}}>
					STOP
				</button>

				<button
					onClick={e => {
						e.preventDefault();
						play({ station: 'YOUR_STATION' });
					}}>
					PLAY
				</button>
			</div>
		);
	}
}

export default App;
```

| Method    |  Args  |Options    | Description  |
| ----------|--------|-----------|--------------|
| setVolume | volume | 0-1       |The new volume percentage between 0 and 1. Example: 0.75 for 75% |
| play      | params | [see bellow](#play-params) |Start the playback of a live audio/video stream. |
| stop      | -      | -          |Stop the stream.|
| pause     | -      | -          |Pause the stream. |
| resume    | -      | -          |Resume the stream. |



### Play Params 
This section was provided by [Triton Documentation](https://userguides.tritondigital.com/spc/tdplay2).

> Start the playback of a live audio/video stream.
> 
> Parameters: params (object). Required: Yes. The playback configuration
> object
Properties
----------
> **station (String)** or **mount (String).** Required: Yes. 
> The station on the Triton Digital platform. Example: TRITONRADIOMUSIC
> Mount on the Triton Digital platform. Example: TRITONRADIOMUSICAAC  
>
>**connectionTimeOut** (Number). Required: No. 
>Duration of the Live Stream Connection before timing out (minutes) - default value is 0
> (de-activated). When a **connectionTimeOut** value is defined, after
> "connectionTimeOut"* minutes, the controller sends a "timeout-alert"
> event that the stream will stop. When receiving that alert, the
> website developer (client side) should display a message to the user,
> such as: “To keep the connection alive, please click here or the
> stream will stop.” The user can continue to listen to the live stream
> by clicking on this message: the website developer (client side) needs
> to call the function **restartConnectionTimeOut()** (see below) and hide
> the message. If the user does not click on the message, then 30
> seconds after the alert is displayed, the stream will automatically
> stop.The controller sends a "timeout-reached" event. If the user wants
> to listen again to the stream, the website developer (client side)
> needs to display another message. For example: 
> "The stream was stopped (connection time out occurred). To listen again to the live stream,
> please click here. Thank you." When the user clicks on this message,
> the website developer (client side) need to call the function **play()**
> and hide the message.   
> 
> **timeShift** (Boolean). Required: No. 
> Set to true to enable client-side TimeShifting, set to false to disable 
> 
> **trackingParameters** (Object). Required: No. 
> The **trackingParameters** values are appended to the stream
> URL. They are used to log information from player. 

> Example: **{KEY1:'value1', KEY2:'value2', ... }** 
> 
> Example: Play the TRITONRADIOMUSIC station stream: 

> *play( {station: 'TRITONRADIOMUSIC'} );*  
> 
> Example: Play the TRITONRADIOMUSICAAC mount stream: 
> 
> *play({mount: 'TRITONRADIOMUSICAAC'} );*   
> 
> Example: Play the TRITONRADIOMUSIC station stream with the connection timeout set to 60 minutes and the TimeShifting enabled.
> 
> *play( {station: 'TRITONRADIOMUSIC', connectionTimeOut:60, timeShift:true} );*

