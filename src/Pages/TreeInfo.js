import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
  root: {
      width: '100%',
      height: '100%'
  },
});

function TreeInfo(props) {
  const { classes } = props;
  const treeData = {...props.location.treedata}
  console.log(treeData)
  return (
    <div>
      {treeData.id}
      {treeData.data.info.genericName}
      {treeData.data.info.scientificName}
    </div>
  );
}


TreeInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TreeInfo);