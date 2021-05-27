import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #ccc"
    },
}));

const SimpleList = (prop) => {
    const classes = useStyles();
    console.log(prop.data);
    return (
        <div className={classes.root}>
            <List component="nav" aria-label="secondary mailbox folders">
                <ListItem dense="true" button>
                    <ListItemText>
                        {prop.data }
                    </ListItemText>
                </ListItem>
            </List>
        </div>
    );
}
export default SimpleList;