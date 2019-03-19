/*eslint-disable*/
import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons

// core components
import Button from "../CustomButtons/Button.js";

import headerLinksStyle from "./HeaderLinksStyle.js";
import Hidden from "@material-ui/core/Hidden";

function HeaderLinks({ ...props }) {
    const { classes } = props;
    return (
        <List className={classes.list}>
            <ListItem className={classes.listItem}>
                <Tooltip
                    id="linkedin-tooltip"
                    title="My LinkedIn"
                    placement={window.innerWidth > 959 ? "top" : "left"}
                    classes={{ tooltip: classes.tooltip }}
                    disableHoverListener={window.innerWidth <= 959}
                >
                    <Button
                        color="transparent"
                        href="https://www.linkedin.com/in/dsringari/"
                        target="_blank"
                        className={classes.navLink}
                    >
                        <i className={classes.socialIcons + " fab fa-linkedin"} />
                        {window.innerWidth > 959 ? '' : 'My LinkedIn'}
                    </Button>
                </Tooltip>
            </ListItem>
            <ListItem className={classes.listItem}>
                    <Tooltip
                        id="github-tooltip"
                        title="Project Github Page"
                        placement={window.innerWidth > 959 ? "top" : "left"}
                        classes={{ tooltip: classes.tooltip }}
                        disableHoverListener={window.innerWidth <= 959}
                    >
                    <Button
                        color="transparent"
                        href="https://github.com/dsringari/AstroSearch"
                        target="_blank"
                        className={classes.navLink}
                    >
                        <i className={classes.socialIcons + " fab fa-github"} />
                        {window.innerWidth > 959 ? '' : 'Project Github Page'}
                    </Button>
                </Tooltip>
            </ListItem>
        </List>
    );
}

export default withStyles(headerLinksStyle)(HeaderLinks);