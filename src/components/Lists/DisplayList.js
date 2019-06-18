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
    currentListName: 'default',
    filterQuery: '',
    lucky: [],
    lists: {
      lucky: ['Ivysaur'],
      shiny: ['Squirtle']
    },
    masterMonList: {},
    masterMonCount: 0
  };

  /**
   * Skip Stoarge list of state values that we don't want to add to storage
   * @type {Array}
   */
  skipStorage = ["currentListName", "filterQuery", "masterMonList", "masterMonCount"]

  componentDidMount = () => {
    console.log(this.props.match.params.listName)
    this.hydrateStateFromLocalStorage();
    this.setState({
      currentListName: this.props.match.params.listName,
      masterMonList: monlist,
      masterMonCount: monlist.length
    });
    console.log({...this.state});
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
   * @param  {[type]} currentList [description]
   * @return {[type]}    [description]
   */
  getMonRow = (id, currentList) => {
    const name = this.state.masterMonList[id].name;
    const dex  = this.state.masterMonList[id].dex;
    const selected = this.monIsSelected(name, currentList);
    const image = this.getImageCard(dex.toString(), name);
    return { id, image, name, selected, dex };
  };

  getCurrentListFromState = (listName) => {
    const stateLists = {...this.state.lists};
    const list = stateLists[listName];
    return list;
  };

  // handleSetState = ()

  /**
   * monIsSelected helper to display Switch component
   * @param  {[type]}  monName [description]
   * @param  {[type]}  currentList [description]
   * @return {Boolean}         [description]
   */
  monIsSelected = (monName, currentList) => {
    
    const monIsSet = currentList.includes(monName);
    return (
      <Switch
        checked={monIsSet}
        onChange={e => this.onSwitchChange(e, e.target.checked)}
        value={monName}
        color="primary"
      />
    );
  };

  /**
   * onSwitchChange - sets the pokemon based off state of the switch
   * being toggled.
   * @param  {[type]}  event      event object
   * @param  {Boolean} isSwitchOn state of switch on/off (switch value checked or not checked)
   * @return {[type]}             [description]
   */
  onSwitchChange = (event, isSwitchOn) => {
    const listName = this.state.currentListName;
    let currentList = this.getCurrentListFromState(listName);
    const monName = event.target.value;

    if (isSwitchOn) {
      currentList.push(monName)
    } else {
      currentList = currentList.filter(name => {
        return monName !== name;
      });
    }
    const stateLists = {...this.state.lists};
    stateLists[listName] = currentList;
    this.setState(
      { lists: stateLists },
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

  /**
   * handleTabChange - re-filter the list based off of the current tab.
   * - all
   * - have - only display ones they have selected
   * - need - only display ones they haven't selected
   * @param  {string} value Name of the tab
   */
  handleTabChange = (value) => {
    console.log('tab changed ' + value )
    const listName = this.state.currentListName;
    let currentList = this.getCurrentListFromState(listName);
    let list = monlist;
    if (value === 'have') {
      list = monlist.filter(
        x => currentList.includes(x['name'])
      );
    } else if (value === 'need') {
      list = monlist.filter(
        x => !currentList.includes(x['name'])
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

    let currentListArray = this.getCurrentListFromState(this.state.currentListName);
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
            rowGetter={({ index }) => this.getMonRow(index, currentListArray)}
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
                label: 'Have',
                dataKey: 'selected',
              }
            ]}
          />
        </Paper>
      </div>
    );
  };
}

export default DisplayList;
