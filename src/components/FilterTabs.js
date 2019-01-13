import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = {
  root: {
    flexGrow: 1,
  },
};

class FilterTabs extends React.Component {
  state = {
    value: 'all',
  };

  handleChange = (event, value) => {
    this.setState({ value });
    this.props.onTabChange(value);
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          variant="fullWidth"
        >
          <Tab label="All"  value="all" />
          <Tab label="Have" value="have" />
          <Tab label="Need" value="need" />
        </Tabs>
      </Paper>
    );
  }
}

FilterTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FilterTabs);
