import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import {Link} from 'react-router-dom';


class ListRow extends React.Component {


  render() {
    const { itemKey, name, url, description } = this.props;

    // define the link url
    let linkUrl = "/list/" + url;

    // define the delete button
    let deleteButton = '';

    if ( itemKey !== "1" && itemKey !== "2") {
      deleteButton =  ( <ListItemSecondaryAction>
                          <IconButton aria-label="Delete">
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      );
    }

    return (
      <ListItem
        key={itemKey.toString()}
        component={Link}
        button={true}
        to={linkUrl}
        >
          <ListItemAvatar>
            <Avatar>
              <FolderIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={name}
            secondary={description}
          />
          {deleteButton}
        </ListItem>
    );
  }
}

export default ListRow;