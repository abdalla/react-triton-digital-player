import React from 'react';
import PropTypes from 'prop-types';

const DefaultControls = props => (
	<div>
		<div className="player-details">
			<div className="player-details-artistName">
				<span>Artist: </span> {props.playerState.artistName}
			</div>

			<div className="player-details-musicTitle">
				<span>Music: </span> {props.playerState.musicTitle}
			</div>
		</div>
		<div className="player-buttons">
			<div className="player-buttons-play">
				<button
					onClick={e => {
						e.preventDefault();
						props.onPlay({ station: props.playerState.station });
					}}>
					PLAY
				</button>
			</div>

			<div className="player-buttons-stop">
				<button
					onClick={e => {
						e.preventDefault();
						props.onStop();
					}}>
					STOP
				</button>
			</div>

			<div className="player-buttons-pause">
				<button
					onClick={e => {
						e.preventDefault();
						props.onPause();
					}}>
					PAUSE
				</button>
			</div>

			<div className="player-buttons-resume">
				<button
					onClick={e => {
						e.preventDefault();
						props.onResume();
					}}>
					RESUME
				</button>
			</div>

			<div className="player-buttons-volPlus">
				<button
					onClick={e => {
						e.preventDefault();
						props.onIncreaseVolume(0.1);
					}}>
					+
				</button>
			</div>
			<div className="player-buttons-volless">
				<button
					onClick={e => {
						e.preventDefault();
						props.onDecreaseVolume(0.1);
					}}>
					-
				</button>
			</div>
		</div>
	</div>
);

DefaultControls.propTypes = {
	playerState: PropTypes.object.isRequired,
	onPlay: PropTypes.func,
	onStop: PropTypes.func,
	onPause: PropTypes.func,
	onResume: PropTypes.func,
	onIncreaseVolume: PropTypes.func,
	onDecreaseVolume: PropTypes.func,
	onSetVolume: PropTypes.func
};

export default DefaultControls;
