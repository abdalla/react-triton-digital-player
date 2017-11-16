import React, { Component } from 'react';
import PropTypes from 'prop-types';
import latinize from 'latinize';

let player;

export const getVolume = () => {
	player.getVolume();
};

export const setVolume = newVol => {
	player.setVolume(newVol);
};

export const play = station => {
	player.play(station);
};

export const stop = () => {
	player.stop();
};

export const pause = () => {
	player.pause();
};

export const resume = () => {
	player.resume();
};

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

	setVolume(newVol) {
		setVolume(newVol);
	}

	play() {
		play({ station: this.state.station });
	}

	stop() {
		stop();
	}

	pause() {
		pause();
	}

	resume() {
		resume();
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
		const { options } = this.props;

		player.addEventListener('track-cue-point', this.onTrackCuePoint);

		if (options && options.autoPlay) {
			player.play({ station: this.state.station });
		}
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
		const { options } = this.props;
		this.setState({
			artistName: e.data.cuePoint.artistName,
			musicTitle: e.data.cuePoint.cueTitle
		});

		if (options && options.setExternalProps) {
			options.setExternalProps({
				artistName: e.data.cuePoint.artistName,
				formatedArtistName: latinize(e.data.cuePoint.artistName).replace(
					' ',
					'_'
				),
				musicTitle: e.data.cuePoint.cueTitle
			});
		}
	}
	/* Callback function called to notify that an Ad-Blocker was detected */
	onAdBlockerDetected() {
		const { options } = this.props;
		if (options && options.onAdBlockerDetected) {
			options.onAdBlockerDetected();
		}
	}

	render() {
		const { options } = this.props;

		return (
			<div>
				<div id="td_container" />
				{options &&
					!options.useItByMyOwn && (
						<div>
							<span>Artist Name:</span>
							{this.state.artistName}
							<br />

							<span>Music Title:</span>
							{this.state.musicTitle}
							<div>
								{options &&
									options.showPlayButton && (
										<button
											onClick={e => {
												e.preventDefault();
												this.play();
											}}>
											PLAY
										</button>
									)}
							</div>
							<div>
								{options &&
									options.showStopButton && (
										<button
											onClick={e => {
												e.preventDefault();
												this.stop();
											}}>
											{' '}
											STOP
										</button>
									)}
							</div>
							<div>
								{options &&
									options.showPauseButton && (
										<button
											onClick={e => {
												e.preventDefault();
												this.pause();
											}}>
											{' '}
											PAUSE
										</button>
									)}
							</div>
							<div>
								{options &&
									options.showResumeButton && (
										<button
											onClick={e => {
												e.preventDefault();
												this.resume();
											}}>
											RESUME
										</button>
									)}
							</div>
						</div>
					)}
			</div>
		);
	}
}

Player.propTypes = {
	station: PropTypes.string.isRequired,
	options: PropTypes.object
};

export default Player;
