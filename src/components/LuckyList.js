import React from 'react';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import ReactVirtualizedTable from './VirtualizedReactTable';
import monlist from '../data/pokemon.json';


function getMonRow(id) {
  const name = monlist[id].name;
  const dex  = monlist[id].dex;
  const lucky = isLucky(name);
  return { id, name, lucky, dex}
}

function isLucky(monName) {
  return (
    <Switch
      checked={true}
      onChange={event => console.log(event)}
      value="{nameLucky}"
    />
  );
}

function LuckyList() {
  return (
    <Paper style={{ height: 550, width: '100%' }}>
      <ReactVirtualizedTable
        rowCount={monlist.length}
        rowGetter={({ index }) => getMonRow(index)}
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
}

export default LuckyList;
