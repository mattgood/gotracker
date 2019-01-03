import React from 'react';
import Switch from '@material-ui/core/Switch';

class LuckySwitch extends React.Component {
  state = {
    itemName: this.props.name,
    switchChecked: false
  };

  handleChange = name => event => {
    this.setState(
      { [name]: event.target.checked },
      () => console.log(this.state)
    );
  };

  render() {
    return (
      <div>
        <Switch
          checked={this.state.switchChecked}
          onChange={this.handleChange('switchChecked')}
          value="switchChecked"
          color="primary"
        />
      </div>
    );
  }
}

export default LuckySwitch;
