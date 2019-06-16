import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ListRow from '../Elements/ListRow';


const styles = theme => ({
  root: {
    flexGrow: 1,
    width: 'auto',
    marginLeft: theme.spacing.unit * .5,
    marginRight: theme.spacing.unit * .5,
  },
  list__summary__list: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 1}px ${theme.spacing.unit * 2}px`,
  },
  list__summary: {
    'margin-top': 0,
  }
});

const defaultList = [
  {

      itemKey: "1",
      name: "Lucky",
      description: "List of lucky pokemon",
      url: "lucky"

  },
  {

      itemKey: "2",
      name: "Shiny",
      description: "List of shiny pokemon",
      url: "shiny"

  }
];

function createLists() {
  const lists = defaultList;
  // append user generated lists

  return lists.map((listType) => {
    return <ListRow key={listType.itemKey} {...listType} />
  });
}

class Summary extends React.Component {
  state = {
    dense: true,
    secondary: true,
  };

  render() {
    const { classes } = this.props;
    const { dense } = this.state;

    return (
      <div id="list-summary-page">
        <Paper className={classes.root} elevation={1} square={true}>
          <Grid container spacing={16} className={classes.list__summary}>
            <Grid item xs={12} >
              <Typography variant="h6" className={classes.title}>
                Lists
              </Typography>
              <div className={classes.list__summary__list}>
                <List dense={dense}>
                  {createLists()}
                </List>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

Summary.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Summary);