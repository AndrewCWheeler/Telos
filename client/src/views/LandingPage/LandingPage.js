/*eslint-disable*/ import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import { navigate } from '@reach/router';
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Button from "../../components/CustomButtons/Button.js";
import HeaderLinks from "../../components/Header/HeaderLinks.js";
import Parallax from "../../components/Parallax/Parallax.js";
import landingBackground from "../../images/landingBackground.jpg";

import landingPageStyle from "../../assets/jss/material-kit-pro-react/views/landingPageStyle.js";

// Sections for this page
import SectionProduct from "./Sections/SectionProduct.js";
import SectionTeam from "./Sections/SectionTeam.js";
import SectionWork from "./Sections/SectionWork.js";
import { Tooltip } from "@material-ui/core";

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
        color="transparent"
        // brand="Material Kit PRO React"
        links={<HeaderLinks dropdownHoverColor="info" />}
        fixed
        // changeColorOnScroll={{
        //   height: 10,
        //   color: "transparent",
        // }}
        {...rest}
      />
      <Parallax image={landingBackground} filter="dark">
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
                An intuitive task manager designed to help you clear your mind and fulfill your unique purpose.
              </h4>
              <br />
              {/* <Button
                color="primary"
                size="lg"
                onClick={e => (navigate('/signup'))}
                target="_blank"
              >
                Sign-up
              </Button> */}
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)} style={{backgroundColor: '#0e0e15'}}>
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
                    href="mailto:creative.andrew@outlook.com"
                    target="_blank"
                    className={classes.block}
                  >
                    Contact: creative.andrew@outlook.com
                  </a>
                </ListItem>
                {/* <ListItem className={classes.inlineBlock}>
                  <a
                    href="#"
                    target="_blank"
                    className={classes.block}
                  >
                    Contact
                  </a>
                </ListItem> */}
                {/* <ListItem className={classes.inlineBlock}>
                  <a href="//blog.creative-tim.com/" className={classes.block}>
                    Blog
                  </a>
                </ListItem> */}
                {/* <ListItem className={classes.inlineBlock}>
                  <a
                    href="https://www.creative-tim.com/license?ref=mkpr-landing"
                    target="_blank"
                    className={classes.block}
                  >
                    Licenses
                  </a>
                </ListItem> */}
              </List>
            </div>
            {/* <div className={classes.right}>
              &copy; {1900 + new Date().getYear()} , made with{" "}
              <Favorite className={classes.icon} /> by{" "}
              <a
                href="https://www.creative-tim.com/?ref=mkpr-landing"
                target="_blank"
              >
                Creative Tim
              </a>{" "}
              for a better web.
            </div> */}
          </div>
        }
      />
    </div>
  );
}
