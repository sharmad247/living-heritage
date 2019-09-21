import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import cMarkerYellow from '../Assets/tree_yellow.png'
import cMarkerOrange from '../Assets/tree_orange.png'
import cMarkerRed from '../Assets/tree_red.png'
import { Divider, List, ListItem } from '@material-ui/core';

const ExpansionPanel = withStyles({
    root: {
        border: '1px solid rgba(0,0,0,.125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
    },
    expanded: {
        margin: 'auto',
    },
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0,0,0,.03)',
        borderBottom: '1px solid rgba(0,0,0,.125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(props => <MuiExpansionPanelSummary {...props} />);

ExpansionPanelSummary.muiName = 'ExpansionPanelSummary';

const ExpansionPanelDetails = withStyles(theme => ({
    root: {
        padding: theme.spacing.unit * 2,
    },
}))(MuiExpansionPanelDetails);

class HelpExpansionPanel extends React.Component {
    state = {
        expanded: null,
    };

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    render() {
        const { expanded } = this.state;
        return (
            <div>
                <ExpansionPanel
                    square
                    expanded={expanded === 'panel1'}
                    onChange={this.handleChange('panel1')}
                >
                    <ExpansionPanelSummary>
                        <Typography>Tagging a Tree</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div>
                            <img width='100%' src={'../Assets/help/help2.png'} /><br /><br />
                            <Typography>
                                <ul>
                                    <li>Click on the green ‘+’ button on your screen in the Discover Section.</li>
                                    <li>You can toggle between ‘Map’ view and ‘Satellite’ view.</li>
                                </ul>
                            </Typography>
                            <br />
                            <Divider variant="middle" />
                            <br /><br />
                            <img width='100%' src={'../Assets/help/help1.png'} /><br /><br />
                            <Typography>
                                <ul>
                                    <li>Click the blue ‘Location’ marker to take you to your location.</li>
                                    <li>Pinch to zoom in on the map to get a more precise location.</li>
                                </ul>
                            </Typography>
                            <br />
                            <Divider variant="middle" />
                            <br /><br />
                            <img width='100%' src={'../Assets/help/help3.png'} /><br /><br />
                            <Typography>
                                <ul>
                                    <li>Follow the instructions on the screen.</li>
                                </ul>
                            </Typography>
                            <br />
                            <Divider variant="middle" />
                            <br /><br />
                            <img width='100%' src={'../Assets/help/help4.png'} /><br /><br />
                            <Typography>
                                <ul>
                                    <li>Fill in all the details and tick the Healtch Checks and Environmental Checks carefully.</li>
                                </ul>
                            </Typography>
                            <br />
                            <Divider variant="middle" />
                            <br /><br />
                            <img width='100%' src={'../Assets/help/help5.png'} /><br /><br />
                            <Typography>
                                <ul>
                                    <li>Choose the images you have clicked of the tree, and upload them.</li>
                                    <li>After uploading the images, the tick mark turns green as shown in the image below. Click on it to save the tree on the map.</li>
                                    <img width='70' src={'../Assets/help/help6.png'} />
                                </ul>
                            </Typography>
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel
                    square
                    expanded={expanded === 'panel2'}
                    onChange={this.handleChange('panel2')}
                >
                    <ExpansionPanelSummary>
                        <Typography>Volunteering for Health Checks</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div>
                            <img width='100%' src={'../Assets/help/help7.png'} /><br />
                            <Typography>
                                <ul>
                                    <li>Go to the ‘Volunteer’ section of the app.</li>
                                    <li>Select on the red or orange trees that are due for a health check.</li>
                                    <img src={cMarkerRed} />
                                    <img src={cMarkerOrange} />
                                    <img src={cMarkerYellow} />
                                </ul>
                                Note: Red trees require more attention compared to the orange and yellow trees.
                            </Typography>
                            <br />
                            <Divider variant="middle" />
                            <br /><br />
                            <img width='100%' src={'../Assets/help/help8.png'} /><br />
                            <Typography>
                                <ul>
                                    <li>Click on the blue ‘Edit Tree’ icon.</li>
                                    <li>Tick the Health and Environmental checks applicable for the tree.</li>
                                </ul>
                            </Typography>
                            <br />
                            <Divider variant="middle" />
                            <br /><br />
                            <img width='100%' src={'../Assets/help/help9.png'} /><br />
                            <Typography>
                                <ul>
                                    <li>Click on the green ‘Tick’ sign to save entries.</li>
                                </ul>
                            </Typography>
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel
                    square
                    expanded={expanded === 'panel3'}
                    onChange={this.handleChange('panel3')}
                >
                    <ExpansionPanelSummary>
                        <Typography>Legend</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            <List>
                                <ListItem>
                                    <img src={cMarkerRed} /> - Last Health Check done 6+ months ago. <br />
                                </ListItem>
                                <ListItem>
                                    <img src={cMarkerOrange} /> - Last Health Check done 3-6 months ago. <br />
                                </ListItem>
                                <ListItem>
                                    <img src={cMarkerYellow} /> - Last Health Check done 1-3 months ago. <br />
                                </ListItem>
                            </List>
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}

export default HelpExpansionPanel;