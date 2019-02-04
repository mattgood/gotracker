import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SettingsIcon from '@material-ui/icons/Settings';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {Link} from 'react-router-dom';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  stickToBottom: {
    flexGrow: 1,
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
};

class NavBottom extends React.Component {
  state = {
    value: "dashboard",
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.stickToBottom}
      >
        <BottomNavigationAction
          label="Dashboard"
          icon={<NotificationsIcon />}
          component={Link}
          to="/dashboard"
          value="dashboard"
        />
        <BottomNavigationAction
          label="Lucky List"
          icon={<FavoriteIcon />}
          component={Link}
          to="/lists"
          value="lists"
        />
        <BottomNavigationAction
          label="Settings"
          icon={<SettingsIcon />}
          component={Link}
          to="/settings"
          value="settings"
        />
      </BottomNavigation>
    );
  }
}

NavBottom.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBottom);
