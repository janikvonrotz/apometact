import React from 'react';
import 'flexboxgrid/css/flexboxgrid.min.css';

const styles = {
  row: {
    margin: 0,
  },
};

class FlexboxGrid extends React.Component {

  render() {
    return(
      <div className="row" style={styles.row}>
        <div className="col-xs-12 col-sm-1 col-md-2">
          <div className="box-row"></div>
        </div>
        <div className="col-xs-12 col-sm-10 col-md-8">
          <div className="box">
            {this.props.children}
          </div>
        </div>
        <div className="col-xs-12 col-sm-1 col-md-2">
          <div className="box-row"></div>
        </div>
      </div>
    );
  }
}

export default FlexboxGrid;
