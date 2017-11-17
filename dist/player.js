'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _latinize = require('latinize');

var _latinize2 = _interopRequireDefault(_latinize);

var _defaultControls = require('./defaultControls');

var _defaultControls2 = _interopRequireDefault(_defaultControls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var player = void 0;

var PlayerWrapper = function PlayerWrapper(ControlsComponent) {
	var Player = function (_Component) {
		_inherits(Player, _Component);

		function Player(props, context) {
			_classCallCheck(this, Player);

			var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, props, context));

			_this.initPlayerSDK = _this.initPlayerSDK.bind(_this);
			_this.onPlayerReady = _this.onPlayerReady.bind(_this);
			_this.onConfigurationError = _this.onConfigurationError.bind(_this);
			_this.onModuleError = _this.onModuleError.bind(_this);
			_this.onTrackCuePoint = _this.onTrackCuePoint.bind(_this);
			_this.onAdBlockerDetected = _this.onAdBlockerDetected.bind(_this);
			return _this;
		}

		_createClass(Player, [{
			key: 'componentWillMount',
			value: function componentWillMount() {
				this.setState({ station: this.props.params.station });
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.initPlayerSDK();
			}
		}, {
			key: 'increaseVolume',
			value: function increaseVolume(vol) {
				var volume = player.getVolume() + vol;

				if (volume === vol) {
					player.unMute();
				}

				if (volume >= 1) {
					volume = 1;
				}

				player.setVolume(volume);
			}
		}, {
			key: 'decreaseVolume',
			value: function decreaseVolume(vol) {
				var volume = player.getVolume() - vol;

				if (volume <= 0) {
					volume = 0;
					player.mute();
				}

				player.setVolume(volume);
			}
		}, {
			key: 'setVolume',
			value: function setVolume(newVol) {
				player.setVolume(newVol);
			}
		}, {
			key: 'play',
			value: function play(params) {
				player.play(params);
			}
		}, {
			key: 'stop',
			value: function stop() {
				player.stop();
			}
		}, {
			key: 'pause',
			value: function pause() {
				player.pause();
			}
		}, {
			key: 'resume',
			value: function resume() {
				player.resume();
			}
		}, {
			key: 'initPlayerSDK',
			value: function initPlayerSDK() {
				//Player SDK is ready to be used, this is where you can instantiate a new TDSdk instance.
				//Player configuration: list of modules
				var tdPlayerConfig = {
					coreModules: [{
						id: 'MediaPlayer',
						playerId: 'td_container'
					}],
					playerReady: this.onPlayerReady,
					configurationError: this.onConfigurationError,
					moduleError: this.onModuleError,
					adBlockerDetected: this.onAdBlockerDetected
				};

				//Player instance
				player = new window.TDSdk(tdPlayerConfig);
			}
		}, {
			key: 'onPlayerReady',
			value: function onPlayerReady() {
				var options = this.props.params.options;


				player.addEventListener('track-cue-point', this.onTrackCuePoint);

				if (options && options.autoPlay) {
					player.play({ station: this.state.station });
				}
			}
		}, {
			key: 'onConfigurationError',
			value: function onConfigurationError(object) {
				this.setState({
					errorCode: object.data.errors[0].code,
					errorMessage: object.data.errors[0].message
				});
			}
		}, {
			key: 'onModuleError',
			value: function onModuleError(object) {
				this.setState({
					errorCode: object.data.errors[0].code,
					errorMessage: object.data.errors[0].message
				});
			}

			/* Callback function called to notify that a new Track CuePoint comes in. */

		}, {
			key: 'onTrackCuePoint',
			value: function onTrackCuePoint(e) {
				var options = this.props.params.options;

				this.setState({
					artistName: e.data.cuePoint.artistName,
					musicTitle: e.data.cuePoint.cueTitle
				});

				if (options && options.setExternalProps) {
					options.setExternalProps({
						artistName: e.data.cuePoint.artistName,
						formatedArtistName: (0, _latinize2.default)(e.data.cuePoint.artistName).replace(' ', '_'),
						musicTitle: e.data.cuePoint.cueTitle
					});
				}
			}
			/* Callback function called to notify that an Ad-Blocker was detected */

		}, {
			key: 'onAdBlockerDetected',
			value: function onAdBlockerDetected() {
				var options = this.props.params.options;

				if (options && options.onAdBlockerDetected) {
					options.onAdBlockerDetected();
				}
			}
		}, {
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement('div', { id: 'td_container' }),
					!ControlsComponent && _react2.default.createElement(_defaultControls2.default, {
						playerState: this.state,
						onSetVolume: this.setVolume,
						onIncreaseVolume: this.increaseVolume,
						onDecreaseVolume: this.decreaseVolume,
						onPlay: this.play,
						onStop: this.stop,
						onPause: this.pause,
						onResume: this.resume
					}),
					ControlsComponent && _react2.default.createElement(ControlsComponent, {
						playerState: this.state,
						onSetVolume: this.setVolume,
						onIncreaseVolume: this.increaseVolume,
						onDecreaseVolume: this.decreaseVolume,
						onPlay: this.play,
						onStop: this.stop,
						onPause: this.pause,
						onResume: this.resume
					})
				);
			}
		}]);

		return Player;
	}(_react.Component);

	Player.propTypes = {
		params: _propTypes2.default.object.isRequired
	};

	return Player;
};
exports.default = PlayerWrapper;