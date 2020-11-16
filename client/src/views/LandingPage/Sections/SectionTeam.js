import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { navigate } from "@reach/router";
// @material-ui/icons
// import  from "@material-ui/icons/";
// core components
import GridContainer from "../../../components/Grid/GridContainer.js";
import GridItem from "../../../components/Grid/GridItem.js";
import Card from "../../../components/Card/Card.js";
import CardHeader from "../../../components/Card/CardHeader.js";
import CardBody from "../../../components/Card/CardBody.js";
import CardFooter from "../../../components/Card/CardFooter.js";
import Muted from "../../../components/Typography/Muted.js";
import Button from "../../../components/CustomButtons/Button.js";

import cardProfile1Square from "../../../assets/img/faces/card-profile1-square.jpg";
import cardProfile2Square from "../../../assets/img/faces/card-profile2-square.jpg";
import cardProfile4Square from "../../../assets/img/faces/card-profile4-square.jpg";
import cardProfile6Square from "../../../assets/img/faces/card-profile6-square.jpg";
import Meditate from "../../../images/Meditate.svg";
import Aristotle from "../../../images/Aristotle_transparent.png";
import Buddha from "../../../images/buddha.png";

import teamsStyle from "../../../assets/jss/material-kit-pro-react/views/sectionsSections/teamsStyle.js";
import teamStyle from "../../../assets/jss/material-kit-pro-react/views/landingPageSections/teamStyle.js";
import { Typography } from "@material-ui/core";


const style = {
  ...teamsStyle,
  ...teamStyle,
  justifyContentCenter: {
    justifyContent: "center"
  }
};

const useStyles = makeStyles(style);

export default function SectionTeam() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <h2 className={classes.title}>Your Vision</h2>
      <div>
        <GridContainer justify='center'>
            <GridItem cs={12} sm={8} md={8}>
            <h4 className={classes.description}>
                Before you begin, start with why. When you <a role="button" onClick={e => {navigate('/signup')}} style={{textDecoration: 'none', color:'white'}}>sign-up</a> for your free {'\u03C4\u03AD\u03BB\u03BF\u03C2'} account, you'll be invited to write your own personal vision statement. Who do you want to be? Who will you show up as in the world today? Then let all your activity flow from this beautiful vision of you! 
              </h4>
            </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={6} md={6}>
            <Card profile plain className={classes.card3}>
              <GridContainer>
                <GridItem xs={12} sm={5} md={5}>
                  <CardHeader image plain>
                      <img src={Aristotle} alt="..." />
                    <div
                      className={classes.coloredShadow}
                      style={{
                        backgroundImage: `url(${Aristotle})`,
                        opacity: "1"
                      }}
                    />
                  </CardHeader>
                </GridItem>
                <GridItem xs={12} sm={7} md={7}>
                  <CardBody plain>
                    <h4 className={classes.cardTitle}>I am what I do?</h4>
                    <Muted>
                      <h6 className={classes.cardCategory}></h6>
                    </Muted>
                    <p className={classes.description}>
                      Aristotle famously said, "We are what we repeatedly do. Excellence, then, is not an act, but a habit."
                    </p>
                  </CardBody>
                  
                </GridItem>
              </GridContainer>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            <Card profile plain className={classes.card3}>
              <GridContainer>
                <GridItem xs={12} sm={5} md={5}>
                  <CardHeader image plain>
                    <a href="#" onClick={e => e.preventDefault()}>
                      <img src={Buddha} alt="..." />
                    </a>
                    <div
                      className={classes.coloredShadow}
                      style={{
                        backgroundImage: `url(${Buddha})`,
                        opacity: "1"
                      }}
                    />
                  </CardHeader>
                </GridItem>
                <GridItem xs={12} sm={7} md={7}>
                  <CardBody plain>
                    <h4 className={classes.cardTitle}>I do what I am?</h4>
                    <Muted>
                      <h6 className={classes.cardCategory}></h6>
                    </Muted>
                    <p className={classes.description}>
                      What if the reverse were also true? "We do what we repeatedly tell ourselves we are."
                    </p>
                  </CardBody>
                  
                </GridItem>
              </GridContainer>
            </Card>
          </GridItem>
          
        </GridContainer>
      </div>
    </div>
  );
}
