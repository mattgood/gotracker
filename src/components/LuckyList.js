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
import LuckySwitch from './LuckySwitch';
import ImageCard from './ImageCard';
import ReactVirtualizedTable from './VirtualizedReactTable';
import monlist from '../data/pokemon.json';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
  textField: {
    flexBasis: 200,
  },
});

class LuckyList extends React.Component {

  state = {
    filterQuery: '',
    lucky: [],
    masterMonList: {},
    masterMonCount: 0
  };

  /**
   * Skip Stoarge list of state values that we don't want to add to storage
   * @type {Array}
   */
  skipStorage = ["filterQuery", "masterMonList", "masterMonCount"]

  componentDidMount = () => {
    this.hydrateStateFromLocalStorage();
    this.setState({ masterMonList: monlist });
    this.setState({ masterMonCount: monlist.length });
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  };

  componentWillUnmount = () => {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );

    this.saveStateToLocalStorage();
  };

  /**
   * get data from local storage and popuplate this.state
   *
   */
  hydrateStateFromLocalStorage = () => {
    // only pull in pre-defefined values stored
    for (let stateKey in this.state) {
      // state property doesn't exist, so skip to next
      if (!localStorage.hasOwnProperty(stateKey)) {
        continue;
      }

      if (this.skipStorage.includes(stateKey)) {
        continue;
      }
      // pull data from local storage.
      let storageValue = localStorage.getItem(stateKey);

      try {
        // json decode and set into local state variable.
        storageValue = JSON.parse(storageValue);
        this.setState({ [stateKey]: storageValue });
      } catch (e) {
        // if json data fails, empty string or value
        this.setState({ [stateKey]: storageValue });
      }
    }
  }

  /**
   * save the current object state to local storage.
   *
   */
  saveStateToLocalStorage = () => {
    // TODO: revist - could be a lot of writes if this.state has many keys.
    // currently we are only using one key.
    for (let key in this.state) {
      if (this.skipStorage.includes(key)) {
        continue;
      }
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  };

  getImageCard = (id, name) => {
    id = id.padStart(3,0);
    // TODO: fix this this variant stuff
    let variant = '00';
    if (id === "327" || id === "386") {
      variant = '11';
    }
    if (name.match(/alola/gi)) {
      variant = '61';
    }
    let image;
    try {
      image = require("../assets/img/pokemon-icons/pokemon_icon_" + id + "_" + variant + ".png");
    } catch (e) {
      image = require("../assets/img/Egg_A.png");
    }
    return (
      <ImageCard
        image={image}
        title={name}
      />
    );
  };

  /**
   * Get the pokemon data for display on the table row.
   * @param  {[type]} id [description]
   * @return {[type]}    [description]
   */
  getMonRow = (id) => {
    const name = this.state.masterMonList[id].name;
    const dex  = this.state.masterMonList[id].dex;
    const lucky = this.isLucky(name);
    const image = this.getImageCard(dex.toString(), name);
    return { id, image, name, lucky, dex };
  };


  /**
   * isLucky helper to display LuckySwitch component
   * @param  {[type]}  monName [description]
   * @return {Boolean}         [description]
   */
  isLucky = (monName) => {
    const monIsLucky = this.state.lucky.includes(monName);
    return (
      <LuckySwitch
        name={monName}
        isChecked={monIsLucky}
        onSwitchChange={this.onLuckySwitchChange}
      />
    );
  };

  /**
   * onLuckySwitchChange - sets the state of each switch
   * @param  {[type]}  monName    pokemon name
   * @param  {Boolean} isSwitchOn state of switch on/off
   * @return {[type]}             [description]
   */
  onLuckySwitchChange = (monName, isSwitchOn) => {
    let luckyList = [...this.state.lucky];
    if (isSwitchOn) {
      luckyList.push(monName)
    } else {
      luckyList = luckyList.filter(name => {
        return monName !== name;
      });
    }

    this.setState(
      { lucky: luckyList },
      () => {
        //console.log(this.state);
        this.saveStateToLocalStorage(); // could be bad with too many writes
      }
    );
  }

  /**
   * Filter Pokemon based off of input.
   * @param  {string} searchString Search text
   * @return {[type]}              [description]
   */
  handleFilterDataChange = searchString => {

    const lowerCaseQuery = searchString.toLowerCase();
    // console.log(searchString + " " + lowerCaseQuery);
    let list = monlist.filter(
      x => x['name'].toLowerCase().includes(lowerCaseQuery)
    );
    this.setState(
      {
        masterMonList: list,
        masterMonCount: list.length,
        filterQuery: searchString
      }
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
      <Paper style={{ height: 94, width: '100%'}}>
        <FormControl className={classNames(classes.margin, classes.textField)}>
          <InputLabel htmlFor="filter-pokemon">FILTER</InputLabel>
          <Input
            id="filter-pokemon"
            type="text"
            value={this.state.filterQuery}
            onChange={e => this.handleFilterDataChange(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Clear Filter"
                  onClick={e => {
                      this.setState({filterQuery: ''});
                      this.handleFilterDataChange("");
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

      <Paper style={{ height: 560, width: '100%' }}>
        <ReactVirtualizedTable
          rowCount={this.state.masterMonList.length}
          disableHeader={true}
          rowHeight={74}
          rowGetter={({ index }) => this.getMonRow(index)}
          onRowClick={
            event => console.log(event)
          }
          columns={[
            {
              width: 128,
              flexGrow: 0.0,
              label: 'Image',
              dataKey: 'image',
            },
            {
              width: 50,
              flexGrow: 1.0,
              label: 'Pokemon',
              dataKey: 'name',
            },
            {
              width: 50,
              flexGrow: 1.0,
              label: 'Lucky',
              dataKey: 'lucky',
            }
          ]}
        />
      </Paper>
      </div>
    );
  };
}

LuckyList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LuckyList);
