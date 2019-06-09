import React from 'react';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import ImageCard from '../ImageCard';
import FilterInput from '../FilterInput';
import FilterTabs from '../FilterTabs';
import ReactVirtualizedTable from '../VirtualizedReactTable';
import monlist from '../../data/pokemon.json';

class DisplayList extends React.Component {

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
    this.setState({
      masterMonList: monlist,
      masterMonCount: monlist.length
    });

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

    let dexId = id.padStart(3,'0');
    let baseImgPath = 'raw.githubusercontent.com/ZeChrales/PogoAssets/master/pokemon_icons/pokemon_icon_';
    let cachebuster = '';
    let variant = '_00';
    if (name.match(/alola/gi)) {
      variant = '_61';
    }
    // todo fix the variant so this is not hard coded:
    if (id === "327" || id === "386") {
      variant = "_11";
    }

    let number = dexId + variant;
    let shiny = '';

    let image = "//images.weserv.nl/?w=80&il&url=" + baseImgPath + number + shiny + ".png" + cachebuster;

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
      <Switch
        checked={monIsLucky}
        onChange={e => this.onLuckySwitchChange(e, e.target.checked)}
        value={monName}
        color="primary"
      />
    );
  };

  /**
   * onLuckySwitchChange - sets the pokemon based off state of the switch
   * being toggled.
   * @param  {[type]}  event      event object
   * @param  {Boolean} isSwitchOn state of switch on/off (switch value checked or not checked)
   * @return {[type]}             [description]
   */
  onLuckySwitchChange = (event, isSwitchOn) => {
    const monName = event.target.value;
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

  handleTabChange = (value) => {
    console.log('tab changed ' + value )
    let list = monlist;
    if (value === 'have') {
      list = monlist.filter(
        x => this.state.lucky.includes(x['name'])
      );
    } else if (value === 'need') {
      list = monlist.filter(
        x => !this.state.lucky.includes(x['name'])
      );
    }
    this.setState(
      {
        masterMonList: list,
        masterMonCount: list.length
      }
    );
  }

  render() {

    return (
      <div>
        <FilterInput
          filterQuery={this.state.filterQuery}
          onFilterChange={this.handleFilterDataChange}
        />
        <FilterTabs
          onTabChange={this.handleTabChange}
        />
        <Paper style={{ height: 560, width: '100%' }}>
          <ReactVirtualizedTable
            rowCount={this.state.masterMonCount}
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

export default DisplayList;
