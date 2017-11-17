import React, { Component } from 'react';
import PropTypes from 'prop-types';
import latinize from 'latinize';

import DefaultControls from './defaultControls';

let player;

const PlayerWrapper = ControlsComponent => {
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
			this.setState({ station: this.props.params.station });
		}

		componentDidMount() {
			this.initPlayerSDK();
		}

		increaseVolume(vol) {
			let volume = player.getVolume() + vol;

			if (volume === vol) {
				player.unMute();
			}

			if (volume >= 1) {
				volume = 1;
			}

			player.setVolume(volume);
		}

		decreaseVolume(vol) {
			let volume = player.getVolume() - vol;

			if (volume <= 0) {
				volume = 0;
				player.mute();
			}

			player.setVolume(volume);
		}

		setVolume(newVol) {
			player.setVolume(newVol);
		}

		play(params) {
			player.play(params);
		}

		stop() {
			player.stop();
		}

		pause() {
			player.pause();
		}

		resume() {
			player.resume();
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
			const { options } = this.props.params;

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
			const { options } = this.props.params;
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
			const { options } = this.props.params;
			if (options && options.onAdBlockerDetected) {
				options.onAdBlockerDetected();
			}
		}

		render() {
			return (
				<div>
					<div id="td_container" />
					{!ControlsComponent && (
						<DefaultControls
							playerState={this.state}
							onSetVolume={this.setVolume}
							onIncreaseVolume={this.increaseVolume}
							onDecreaseVolume={this.decreaseVolume}
							onPlay={this.play}
							onStop={this.stop}
							onPause={this.pause}
							onResume={this.resume}
						/>
					)}
					{ControlsComponent && (
						<ControlsComponent
							playerState={this.state}
							onSetVolume={this.setVolume}
							onIncreaseVolume={this.increaseVolume}
							onDecreaseVolume={this.decreaseVolume}
							onPlay={this.play}
							onStop={this.stop}
							onPause={this.pause}
							onResume={this.resume}
						/>
					)}
				</div>
			);
		}
	}
	Player.propTypes = {
		params: PropTypes.object.isRequired
	};

	return Player;
};
export default PlayerWrapper;
