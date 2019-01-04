import React from 'react';
import Paper from '@material-ui/core/Paper';
import LuckySwitch from './LuckySwitch';
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

  hydrateStateFromLocalStorage = () => {
    // only pull in pre-defefined values stored
    for (let stateKey in this.state) {
      // state property doesn't exist, so skip to next
      if (!localStorage.hasOwnProperty(stateKey)) {
        continue;
      }

      let storageValue = localStorage.getItem(stateKey);

      try {
        storageValue = JSON.parse(storageValue);
        this.setState({ [stateKey]: storageValue });
      } catch (e) {
        // if json data fails, empty string or value
        this.setState({ [stateKey]: storageValue });
      }
    }
  }

  saveStateToLocalStorage = () => {
    for (let key in this.state) {
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  getMonRow = (id) => {
    const name = monlist[id].name;
    const dex  = monlist[id].dex;
    const lucky = this.isLucky(name);
    return { id, name, lucky, dex}
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
      }
    );
  }

  render() {
    return (
      <Paper style={{ height: 560, width: '100%' }}>
        <ReactVirtualizedTable
          rowCount={monlist.length}
          rowGetter={({ index }) => this.getMonRow(index)}
          onRowClick={
            event => console.log(event)
          }
          columns={[
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
            },
            {
              width: 120,
              label: 'Dex ID',
              dataKey: 'dex',
              numeric: true,
            }
          ]}
        />
      </Paper>
    );
  };
}

export default LuckyList;
