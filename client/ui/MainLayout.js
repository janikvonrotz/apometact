import React from 'react';
import Helmet from 'react-helmet';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppBar, Card, Drawer, MenuItem } from 'material-ui';
import {  } from 'material-ui/styles/colors';
import { ContentClear } from 'material-ui/svg-icons';
import { FlexboxGrid } from './index';

const styles = {
  appBar: {
    backgroundColor: "#000",
    textAlign: "center"
  },
  drawer: {
    backgroundColor: "#000",
    color: "#FFF"
  },
  menuItem: {
    color: "#FFF"
  }
}

class MainLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {drawerOpen: false};
  }

  toggleDrawer() {
    this.setState({drawerOpen: !this.state.drawerOpen})
  }

  render() {
    const { title } = this.props
    return (
      <MuiThemeProvider>
        <FlexboxGrid>
          <Helmet
            title={"Bot Management"}
            meta={[{"name": "viewport", "content": "width=device-width, initial-scale=1"}]}
            link={[
              {"rel": "stylesheet", "href": "https://fonts.googleapis.com/css?family=Roboto:400,300,500e", "type": "text/css"},
              {"rel": "shortcut icon", "href": "/favicon.ico", "type": "image/x-icon"}
            ]}
          />
          <AppBar
            title="ok.- Bot Management"
            onTouchTap={this.toggleDrawer.bind(this)}
            style={styles.appBar}
          />
          <Drawer
            open={this.state.drawerOpen}
            containerStyle={styles.drawer}
          >
            <MenuItem primaryText="Close" onTouchTap={this.toggleDrawer.bind(this)} leftIcon={<ContentClear />} />
            <MenuItem style={styles.menuItem} href="/" primaryText="Dashboard" />
            <MenuItem style={styles.menuItem} href="/deals" primaryText="Deals" />
            <MenuItem style={styles.menuItem} href="/categories" primaryText="Categories" />
          </Drawer>
          {this.props.children}
        </FlexboxGrid>
      </MuiThemeProvider>
    );
  }
}

export default MainLayout;
