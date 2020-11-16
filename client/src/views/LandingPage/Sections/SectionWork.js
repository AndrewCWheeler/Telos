import React from "react";
import { navigate } from '@reach/router';
import { Radar }  from 'react-chartjs-2';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "../../../components/Grid/GridContainer.js";
import GridItem from "../../../components/Grid/GridItem.js";
import CustomInput from "../../../components/CustomInput/CustomInput.js";
import Button from "../../../components/CustomButtons/Button.js";

import workStyle from "../../../assets/jss/material-kit-pro-react/views/landingPageSections/workStyle.js";

const useStyles = makeStyles(workStyle);

const data = {
  labels: ["Family", "Friends", "Finances", "Career", "Health", "Home", "Creative", "Spiritual",],
  datasets: [
    {
      label: "Completed Last Week",
      backgroundColor: "rgba(220,220,220,0.2)",
      pointBackgroundColor: "white",
      data: [
        21,
        18,
        12,
        9,
        6,
        15,
        3,
        15,
      ]
    }, {
      label: 'Completed Last Month',
      backgroundColor: "rgba(220,220,220,0.2)",
      pointBackgroundColor: "white",
      hidden: false,
      data: [
        75,
        72,
        48,
        27,
        24,
        60,
        36,
        45,
      ]
    },
  ]
}

const options = {
  legend: {
    position: 'top',
    labels: {
      // fontColor: textPrimary,
      fontSize: 18,
    }
  },
  title: {
    display: true,
    text: 'Trajectory Radar',
    fontSize: 21,
  },
  scale: {
    reverse: false,
    gridLines: {
      color: [
        'black',
        'red',
        'orange',
        'yellow',
        'green',
        'blue',
        'indigo',
        'violet'
      ]
    },
    pointLabels: {
      fontSize: 15,
      // fontColor: textPrimary,
    },
    ticks: {
      beginAtZero: true, 
    },
    maintainAspectRatio: true,
  },
}

export default function SectionWork() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem cs={12} sm={8} md={8}>
          <h2 className={classes.title}>Your Trajectory</h2>
          <h4 className={classes.description}>
            Track your trajectory by viewing the balance of your activity. Where do you spend most of your energy? Does this reflect who you want to be?
          </h4>
          <div style={{height: '100%', marginTop: 30, marginBottom: 30}}>
            <Radar
              data={data}
              options={options}
              width={42}
              height={51}
              style={{paddingTop: 20, paddingBottom: 20}}
            />
          </div>
        </GridItem>
        <GridItem cs={12} sm={8} md={8}>
          <Button
            onClick={e => {navigate('/signup')}}
            color="primary"
            large
            round
            >
              Create Free Account
          </Button>
        </GridItem>
      </GridContainer>
    </div>
  );
}
