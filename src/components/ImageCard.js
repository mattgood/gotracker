import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';


const styles = {
  card: {
    maxWidth: 128,
    borderRadius: 0,
    border: 0,
    backgroundColor:'inherit',
    boxShadow: '0 0 0 0'

  },
  media: {
    height: 64,
  },
};

function ImageCard(props) {
  const { classes, image, title } = props;
  return (
    <Card className={classes.card}>
        <CardMedia
          component="img"
          height="64"
          alt={title}
          className={classes.media}
          image={image}
          title={title}
        />

    </Card>
  );
}

ImageCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageCard);
