import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import FormControl from '@material-ui/core/FormControl';


const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
  width: {
    width: 300
  },
  textField: {
    flexBasis: 300,
  },
});


class FilterInput extends React.Component {

  state = {
    filterQuery: this.props.filterQuery
  }

  handleChange = eventValue => {
    this.setState(
      { filterQuery: eventValue },
      () => {
        //console.log(this.state);
        this.props.onFilterChange(eventValue);
      }
    );
  };

  render() {
    const { classes } = this.props;
    return(
      <Paper style={{ height: 80, width: '100%'}}>
        <FormControl
          className={classNames(classes.width, classes.margin, classes.textField)
        }>
          <InputLabel htmlFor="filter-pokemon">FILTER</InputLabel>
          <Input
            id="filter-pokemon"
            type="text"
            value={this.state.filterQuery}
            onChange={e => this.handleChange(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Clear Filter"
                  onClick={e => {
                      this.handleChange("");
                    }
                  }
                >
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Paper>
    );
  }
}

FilterInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FilterInput);
