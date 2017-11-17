'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DefaultControls = function DefaultControls(props) {
	return _react2.default.createElement(
		'div',
		null,
		_react2.default.createElement(
			'div',
			{ className: 'player-details' },
			_react2.default.createElement(
				'div',
				{ className: 'player-details-artistName' },
				_react2.default.createElement(
					'span',
					null,
					'Artist: '
				),
				' ',
				props.playerState.artistName
			),
			_react2.default.createElement(
				'div',
				{ className: 'player-details-musicTitle' },
				_react2.default.createElement(
					'span',
					null,
					'Music: '
				),
				' ',
				props.playerState.musicTitle
			)
		),
		_react2.default.createElement(
			'div',
			{ className: 'player-buttons' },
			_react2.default.createElement(
				'div',
				{ className: 'player-buttons-play' },
				_react2.default.createElement(
					'button',
					{
						onClick: function onClick(e) {
							e.preventDefault();
							props.onPlay({ station: props.playerState.station });
						} },
					'PLAY'
				)
			),
			_react2.default.createElement(
				'div',
				{ className: 'player-buttons-stop' },
				_react2.default.createElement(
					'button',
					{
						onClick: function onClick(e) {
							e.preventDefault();
							props.onStop();
						} },
					'STOP'
				)
			),
			_react2.default.createElement(
				'div',
				{ className: 'player-buttons-pause' },
				_react2.default.createElement(
					'button',
					{
						onClick: function onClick(e) {
							e.preventDefault();
							props.onPause();
						} },
					'PAUSE'
				)
			),
			_react2.default.createElement(
				'div',
				{ className: 'player-buttons-resume' },
				_react2.default.createElement(
					'button',
					{
						onClick: function onClick(e) {
							e.preventDefault();
							props.onResume();
						} },
					'RESUME'
				)
			),
			_react2.default.createElement(
				'div',
				{ className: 'player-buttons-volPlus' },
				_react2.default.createElement(
					'button',
					{
						onClick: function onClick(e) {
							e.preventDefault();
							props.onIncreaseVolume(0.1);
						} },
					'+'
				)
			),
			_react2.default.createElement(
				'div',
				{ className: 'player-buttons-volless' },
				_react2.default.createElement(
					'button',
					{
						onClick: function onClick(e) {
							e.preventDefault();
							props.onDecreaseVolume(0.1);
						} },
					'-'
				)
			)
		)
	);
};

DefaultControls.propTypes = {
	playerState: _propTypes2.default.object.isRequired,
	onPlay: _propTypes2.default.func,
	onStop: _propTypes2.default.func,
	onPause: _propTypes2.default.func,
	onResume: _propTypes2.default.func,
	onIncreaseVolume: _propTypes2.default.func,
	onDecreaseVolume: _propTypes2.default.func,
	onSetVolume: _propTypes2.default.func
};

exports.default = DefaultControls;