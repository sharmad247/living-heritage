import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom'
import { trackPromise } from 'react-promise-tracker';
import Spinner from './LoadingSpinner';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        position: "fixed",
        bottom: 56,
        width: '100%',
        minHeight: 50
    },
});


class TreeInfoBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            treeData: {},
            id: this.props.id
        }
    }

    firebaseDb = this.props.firebaseApp.firestore()
    content = null
    tree = null
    componentDidMount() {
        this.tree = this.firebaseDb.collection('tree_data').doc(this.state.id.toString())
        this.fetchTree()
    }

    fetchTree = () => {
            trackPromise(
                this.tree.get().then(doc => {
                    let temp = doc.data()
                    this.content = <div>
                        <Typography variant="h5" component="h3">
                            {temp.info.genericName}
                        </Typography>
                        <Typography component="span">
                            {temp.info.scientificName}
                        </Typography>
                    </div>
                    console.log(temp)
                    this.setState({ treeData: temp })
                }) , 'infobox'
            )
            this.forceUpdate()
    }

    render() {
        const { classes } = this.props
        return (
            <div className="ContainerStyle">
                <Link to={{
                    pathname: "/treeinfo",
                    treedata: {...this.state.treeData}
                }}>
                    <Spinner area="infobox" />
                    <Paper className={classes.root} elevation={1}>
                        <Grid container spacing={24}>
                            <Grid item xs={3}>
                                <img id="boxImg" alt="cover" src={this.state.treeData.images ? this.state.treeData.images[0] : "https://via.placeholder.com/150?text=Tree+Photo"}></img>
                            </Grid>
                            <Grid item xs={9}>
                                {this.content}
                            </Grid>
                        </Grid>
                    </Paper>
                </Link>
            </div>
        )
    }
}


TreeInfoBox.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TreeInfoBox);