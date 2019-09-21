import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';

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
                            <img width='100%' src={'../Assets/help/help1.png'} /><br /><br />
                            <Typography>
                                <ul>
                                    <li>Click the blue ‘Location’ marker to take you to your location.</li>
                                    <li>Pinch to zoom in on the map to get a more precise location.</li>
                                </ul>
                            </Typography>
                            <img width='100%' src={'../Assets/help/help3.png'} /><br /><br />
                            <Typography>
                                <ul>
                                    <li>Follow the instructions on the screen.</li>
                                </ul>
                            </Typography>
                            <br /><br />
                            <img width='100%' src={'../Assets/help/help4.png'} /><br /><br />
                            <Typography>
                                <ul>
                                    <li>Fill in all the details and tick the Healtch Checks and Environmental Checks carefully.</li>
                                </ul>
                            </Typography>
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
                        <Typography>
                            Coming Soon
                        </Typography>
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
                            Coming Soon
            </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}

export default HelpExpansionPanel;