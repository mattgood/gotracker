import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SettingsIcon from '@material-ui/icons/Settings';
import NotificationsIcon from '@material-ui/icons/Notifications';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
};

class NavBottom extends React.Component {
  state = {
    value: 0,
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
        className={classes.root}
      >
        <BottomNavigationAction label="News" icon={<NotificationsIcon />} />
        <BottomNavigationAction label="Lists" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
      </BottomNavigation>
    );
  }
}

NavBottom.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBottom);
