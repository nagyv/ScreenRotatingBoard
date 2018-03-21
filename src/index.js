import React from 'react';
import ReactDOM from 'react-dom';
import YouTube from 'react-youtube';

const Dimensions = {
  width: window.innerWidth,
  height: window.innerHeight
}

class BaseWidgetHandler extends React.Component {
  constructor (props) {
    super(props)
  }

  render() {
    return "BaseWidgetHandler's render should be overwritten"
  }
}

class ImageHandler extends BaseWidgetHandler {
  render() {
    return <img src={this.props.src} />
  }
}

class HTMLHandler extends BaseWidgetHandler {
  render () {
    return <iframe frameBorder={0} height={Dimensions.height} width={Dimensions.width} src={this.props.src} allowFullScreen />
  }
}

class YoutubeHandler extends BaseWidgetHandler {
  constructor(props) {
    super(props)

    this.onEnd = this.onEnd.bind(this)
  }

  onEnd () {
    this.props.onEnd()
  }

  render () {
    const opts = {
      height: Dimensions.height,
      width: Dimensions.width,
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };

    return <YouTube
        videoId={this.props.videoId}
        opts={opts}
        onEnd={this.onEnd}
      />
  }
}

class ScreenRotatingBoard {
  static widgets = {
    image: ImageHandler,
    html: HTMLHandler,
    youtube: YoutubeHandler
  }

  constructor(contentElement, config) {
    this._contentElement = document.getElementById(contentElement)
    this._config = config
    this._timer = null
    this._activeWidgetIdx = null

    this.next = this.next.bind(this)
  }

  _renderWidget() {
    const currentWidgetConfig = {
      onEnd: this.next,
      ...this._config.screens[this._activeWidgetIdx]
    }
    const widget = ScreenRotatingBoard.widgets[currentWidgetConfig.type]
    ReactDOM.render(
      React.createElement(widget, currentWidgetConfig),
      this._contentElement
    );
    if (this._timer) {
      clearTimeout (this._timer)
    }
    if (currentWidgetConfig.timeOut) {
      this._timer = setTimeout(this.next, currentWidgetConfig.timeOut)
    }
  }

  start() {
    this._activeWidgetIdx = 0
    this._renderWidget()
  }

  next() {
    const nextIdx = this._activeWidgetIdx + 1
    if (this._config.screens.length < nextIdx) {
      this._activeWidgetIdx = 0
    } else {
      this._activeWidgetIdx += 1
    }
    this._renderWidget()
  }
}

export {ScreenRotatingBoard}