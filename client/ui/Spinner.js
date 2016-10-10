import React, { PropTypes } from 'react'
import {grey400} from 'material-ui/styles/colors'

class Spinner extends React.Component {

  render() {

    const style = {
      width: this.props.width,
      height: this.props.height,
      borderColor: this.props.borderColor
    }

    return (
      <div
        className='react-spinner'
        style={style}
      />
    )
  }
}

Spinner.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  borderColor: PropTypes.string
}

Spinner.defaultProps = {
  width: '40px',
  height: '40px',
  borderColor: grey400
}

export default Spinner
