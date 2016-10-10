import React from 'react'
import { Spinner } from './index';

const style = {
  verticalAlign: 'top',
  objectFit: 'contain',
  width: '100%',
  maxHeight: 400,
}

class ImageLoader extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      fileStatus: props.src ? 'loading' : 'no image to load'
    }
  }

  setFileStatus(status) {
    this.setState({ fileStatus: status })
  }

  componentWillReceiveProps(nextProps){
    if(this.props.src != nextProps.src){
      this.setState({
        fileStatus: nextProps.src ? 'loading' : 'no image to load'
      })
    }
  }

  render() {
    return !this.props.src ? <p>no image to load</p> : (
      <div>
        {(()=>{
          var status = {
            'loading': () => {
              return (<Spinner />)
            },
            'loaded': () => {
              return null
            },
            'failed to load': () => {
              return (<p>{this.state.fileStatus}</p>)
            },
            'no image to load': () => {
              return (<p>{this.state.fileStatus}</p>)
            },
          }
          return status[this.state.fileStatus]()
        })()}
        <img
          style={style}
          src={this.props.src}
          onLoad={this.setFileStatus.bind(this, 'loaded')}
          onError={this.setFileStatus.bind(this, 'failed to load')}
        />
      </div>
    )
  }
}

export default ImageLoader
