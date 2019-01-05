import React from 'react';
import Switch from '@material-ui/core/Switch';

/**
 * Switch Display component wrapper
 * - which provides extra functionality around what happens when
 *   switch is toggled.
 * @extends React
 */
class LuckySwitch extends React.Component {
  state = {
    itemName: this.props.name,
    switchChecked: this.props.isChecked ? this.props.isChecked : false
  };

  handleChange = name => event => {
    this.setState(
      { [name]: event.target.checked },
      () => {
        //console.log(this.state);
        this.props.onSwitchChange(this.state.itemName,this.state.switchChecked);
      }
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
