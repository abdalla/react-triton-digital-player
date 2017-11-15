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

#### *ES5*
```
var Player require('./containers/radio/player');
```

#### *ES6*
```
import Player from './containers/radio/player';
```

```
<Player station="YOUR_STATION" options={options} />
```

*OBS:* **options are optionals.** 

###EXAMPLE

```
import React, { Component } from 'react';
import Player from './containers/radio/player';

class App extends Component {
	render() {
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
