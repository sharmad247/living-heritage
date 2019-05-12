import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  root: {
      width: '100%',
      height: '100%'
  },
});

function TreeInfo(props) {
  const { classes } = props;
  const treeData = {...props.location.treedata}
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