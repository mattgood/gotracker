import React from 'react';
import Paper from '@material-ui/core/Paper';
import LuckySwitch from './LuckySwitch';
import ImageCard from './ImageCard';
import ReactVirtualizedTable from './VirtualizedReactTable';
import monlist from '../data/pokemon.json';

class LuckyList extends React.Component {

  state = {
    lucky: []
  };

  componentDidMount = () => {
    this.hydrateStateFromLocalStorage();
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
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  };

  getImageCard = (id, name) => {
    id = id.padStart(3,0);
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
    const name = monlist[id].name;
    const dex  = monlist[id].dex;
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

  render() {
    return (
      <Paper style={{ height: 560, width: '100%' }}>
        <ReactVirtualizedTable
          rowCount={monlist.length}
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
    );
  };
}

export default LuckyList;
