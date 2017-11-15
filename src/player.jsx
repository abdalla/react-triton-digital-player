import React, { Component } from 'react';
import PropTypes from 'prop-types';

let player;

class Player extends Component {
	constructor(props, context) {
		super(props, context);

		this.initPlayerSDK = this.initPlayerSDK.bind(this);
		this.onPlayerReady = this.onPlayerReady.bind(this);
		this.onConfigurationError = this.onConfigurationError.bind(this);
		this.onModuleError = this.onModuleError.bind(this);
		this.onTrackCuePoint = this.onTrackCuePoint.bind(this);
		this.onAdBlockerDetected = this.onAdBlockerDetected.bind(this);
	}

	componentWillMount() {
		this.setState({ station: this.props.station });
	}

	componentDidMount() {
		this.initPlayerSDK();
	}

	initPlayerSDK() {
		//Player SDK is ready to be used, this is where you can instantiate a new TDSdk instance.
		//Player configuration: list of modules
		const tdPlayerConfig = {
			coreModules: [
				{
					id: 'MediaPlayer',
					playerId: 'td_container'
				}
			],
			playerReady: this.onPlayerReady,
			configurationError: this.onConfigurationError,
			moduleError: this.onModuleError,
			adBlockerDetected: this.onAdBlockerDetected
		};

		//Player instance
		player = new window.TDSdk(tdPlayerConfig);
	}

	onPlayerReady() {
		player.addEventListener('track-cue-point', this.onTrackCuePoint);
		player.play({ station: this.state.station });
	}

	onConfigurationError(object) {
		this.setState({
			errorCode: object.data.errors[0].code,
			errorMessage: object.data.errors[0].message
		});
	}

	onModuleError(object) {
		this.setState({
			errorCode: object.data.errors[0].code,
			errorMessage: object.data.errors[0].message
		});
	}

	/* Callback function called to notify that a new Track CuePoint comes in. */
	onTrackCuePoint(e) {
		this.setState({
			artistName: e.data.cuePoint.artistName,
			musicTitle: e.data.cuePoint.cueTitle
		});
	}
	/* Callback function called to notify that an Ad-Blocker was detected */
	onAdBlockerDetected() {
		console.log('AdBlockerDetected');
	}

	render() {
		return (
			<div>
				<div id="td_container" />
				<span>Artist Name:</span>
				{this.state.artistName}
				<br />

				<span>Music Title:</span>
				{this.state.musicTitle}
				<div>
					<button
						onClick={e => {
							e.preventDefault();
							player.resume();
						}}>
						{' '}
						>{' '}
					</button>
				</div>
				<div>
					<button
						onClick={e => {
							e.preventDefault();
							player.pause();
						}}>
						{' '}
						>||
					</button>
				</div>
			</div>
		);
	}
}

Player.propTypes = {
	station: PropTypes.string.isRequired,
	options: PropTypes.object
};

export default Player;
