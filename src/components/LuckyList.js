import React from 'react';
import Paper from '@material-ui/core/Paper';
import LuckySwitch from './LuckySwitch';
import ReactVirtualizedTable from './VirtualizedReactTable';
import monlist from '../data/pokemon.json';

class LuckyList extends React.Component {

  state = {

  };

  componentDidMount = () => {
    console.log('mount');
  };

  componentWillUnmount = () => {
    console.log('unmount');
    this.saveStateToLocalStorage();
  };

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


  isLucky = (monName) => {
    return ( <LuckySwitch name={monName}/> );
  };

  render() {
    return (
      <Paper style={{ height: 550, width: '100%' }}>
        <ReactVirtualizedTable
          rowCount={monlist.length}
          rowGetter={({ index }) => this.getMonRow(index)}
          onRowClick={event => console.log(event)}
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
