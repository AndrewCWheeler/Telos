/*eslint-disable*/ import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
// @material-ui/icons
import Favorite from '@material-ui/icons/Favorite';
// core components
import Header from '../../components/Header/Header.js';
import Footer from '../../components/Footer/Footer.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import GridItem from '../../components/Grid/GridItem.js';
import HeaderLinks from '../../components/Header/HeaderLinks.js';
import Parallax from '../../components/Parallax/Parallax.js';
import landingBackground from '../../images/landingBackground.jpg';

import landingPageStyle from '../../assets/jss/material-kit-pro-react/views/landingPageStyle.js';

// Sections for this page
import SectionProduct from './Sections/SectionProduct.js';
import SectionTeam from './Sections/SectionTeam.js';
import SectionWork from './Sections/SectionWork.js';

const useStyles = makeStyles(landingPageStyle);

export default function LandingPage({ ...rest }) {
    React.useEffect(() => {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
    });
    const classes = useStyles();
    return (
        <div>
            <Header
                color='transparent'
                links={<HeaderLinks dropdownHoverColor='info' />}
                fixed
                {...rest}
            />
            <Parallax
                image='https://images.unsplash.com/photo-1468276311594-df7cb65d8df6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=3900&q=80'
                filter='dark'
                className={classes.parallax}
            >
                <div className={classes.container}>
                    <GridContainer>
                        <GridItem xs={12} sm={6} md={6}>
                            <Typography variant='h1'>
                                {'\u03C4\u03AD\u03BB\u03BF\u03C2'}
                            </Typography>
                            <Typography variant='h6' color='textPrimary'>
                                Task Manager
                            </Typography>
                            <h4>
                                An intuitive task manager designed to help you
                                clear your mind and fulfill your unique purpose.
                            </h4>
                            <br />
                        </GridItem>
                    </GridContainer>
                </div>
            </Parallax>
            <div
                className={classNames(classes.main, classes.mainRaised)}
                style={{ backgroundColor: '#0e0e15' }}
            >
                <div className={classes.container}>
                    <SectionProduct />
                    <SectionTeam />
                    <SectionWork />
                </div>
            </div>
            <Footer
                content={
                    <div>
                        <div className={classes.right}>
                            <List className={classes.list}>
                                <ListItem className={classes.inlineBlock}>
                                    <a
                                        href='mailto:achristopherwheeler@gmail.com'
                                        target='_blank'
                                        className={classes.block}
                                    >
                                        Contact: achristopherwheeler@gmail.com
                                    </a>
                                </ListItem>
                            </List>
                        </div>
                    </div>
                }
            />
        </div>
    );
}
