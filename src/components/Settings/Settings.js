import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: 'auto',
    marginLeft: theme.spacing.unit * .5,
    marginRight: theme.spacing.unit * .5,
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

let Settings = (props) => {
  const { classes } = props;

  return (
    <React.Fragment>
      
      <div>
        <Paper className={classes.root} elevation={1} square={true}>
          <Typography variant="h5" component="h2">
            Settings
          </Typography>
          <Typography>
            We should put something here.
          </Typography>
        </Paper>
      </div>
    </React.Fragment>
  )
}

Settings.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Settings);
