import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import AddIcon from '@material-ui/icons/Add';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

// core components
import GridContainer from "../../../components/Grid/GridContainer.js";
// import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "../../../components/Grid/GridItem.js";
import InfoArea from "../../../components/InfoArea/InfoArea.js";

import productStyle from "../../../assets/jss/material-kit-pro-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(productStyle);

export default function SectionProduct() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={8} md={8}>
          <h2 className={classes.title}>Your Tasks</h2>
          <h5 className={classes.description}>
            {'\u03C4\u03AD\u03BB\u03BF\u03C2'} task manager is <em>not</em> your typical organizer!<br></br>
            Its 3 main components are meant to slow you down and help you work in controlled flow from thought to action. Its primary purpose is to help you fulfill your purpose, so you do what you <em>intend</em> to be doing. 
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={4} md={4}>
            <InfoArea
              title="Dump & Chunk"
              description="Use the dump component to quickly add tasks to a list and clear your mind! Revisit this list when you're ready and 'chunk' each task into a category that you created."
              icon={AddIcon}
              iconColor="primary"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <InfoArea
              title="Schedule"
              description="To schedule tasks on your calendar, select a category of previously chunked items and assign them to be done on a certain day."
              icon={CalendarTodayIcon}
              iconColor="primary"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <InfoArea
              title="Do"
              description="Then choose a date to see scheduled tasks and rearrange them in order of priority."
              icon={CheckCircleIcon}
              iconColor="primary"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
