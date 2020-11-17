import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import { Radar }  from 'react-chartjs-2';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Moment from 'react-moment';
import 'moment-timezone';
import moment from 'moment';
// const randomColor = require('../lib/randomColor')


const useStyles = makeStyles(theme => ({
  root: {
    // width: '100%',
    height: '100%',
    // maxWidth: 840,
    marginTop: 90,
    marginBottom: 90,
    // flexGrow: 1,
    },
  chart: {
    color: theme.palette.text.primary,
  },
}));

const Trajectory = () => {
  const [sessionUserId, setSessionUserId] = useState('');
  const [allTasks, setAllTasks] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [load, setLoad] = useState('');
  const [weekDate, setWeekDate] = useState(new Date());
  const [monthDate, setMonthDate] = useState(new Date());

  const classes = useStyles();

  const textPrimary = classes.chart;

  useEffect(() => {
    let one = 'http://localhost:8000/api/users/one';
    const requestOne = axios.get(one, { withCredentials: true });
    requestOne
      .then(response => {
        setSessionUserId(response.data.results._id);
      })
      .catch(error => {
        console.log(error);
      });
    let two = 'http://localhost:8000/api/tasks/user';
    const requestTwo = axios.get(two, { withCredentials: true });
    requestTwo
      .then(response => {
        setAllTasks(response.data.results);
      })
      .catch(error => {
        console.log(error);
      });
    let three = 'http://localhost:8000/api/categories/user';
    const requestThree = axios.get(three, {withCredentials: true });
    requestThree
      .then(response => {
        setAllCategories(response.data.results);
      }).catch(error => {
        console.log(error);
      })
    axios
      .all([requestOne, requestTwo, requestThree])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];
          const responseThree = responses[2];
          console.log(responseOne, responseTwo, responseThree);
        })
      )
      .catch(errors => {
        navigate('/landing');
      });
  }, [load]);

  const getCategoryNames = (arr) => {
    let names = [];
    for (let i = 0; i<arr.length; i++){
      names.push(arr[i].name.toString());
    }
    const namesArray = (Object.values(names));
    console.log(typeof namesArray);
    const isArr = Object.prototype.toString.call(namesArray) == '[object Array]';
    console.log(isArr);
    return namesArray;
  }
  const myLabels = getCategoryNames(allCategories);
  
  // Get 1 week of completed tasks, 'rolling' (1 week ago from now);
  const getWeekTasks = (arr, category) => {
    let filteredLength = [];
    let filteredTasks = [];
    let now = moment().calendar();
    let weekAgo = moment().subtract(7, 'days').calendar();
    moment(now).toISOString();
    moment(weekAgo).toISOString();
    console.log(now);
    console.log(weekAgo);
    console.log(now > weekAgo);

    for (let i = 0; i<category.length; i++){
      filteredLength.push(arr.filter(t => t.completed === true
        && t.category === category[i] 
        ).length);
      console.log(filteredLength);
      filteredTasks.push(arr.filter(t => (t.completed === true && t.category === category[i]) 
      && (t.completedAt < now && t.completedAt > weekAgo)
      ));
      console.log(filteredTasks);
    }
    return filteredLength;
  }
  const WeeklyCompleted = getWeekTasks(allTasks, myLabels);
  console.log(WeeklyCompleted); 

  // Get 1 month of completed tasks, 'rolling' (1 month ago from now);
  const getMonthTasks = (arr, category) => {
    let filteredLength = [];
    let filteredTasks = [];
    let now = moment().calendar();
    let monthAgo = moment().subtract(1, 'months').calendar();
    moment(now).toISOString();
    moment(monthAgo).toISOString();
    console.log(now);
    console.log(monthAgo);
    console.log(now > monthAgo);

    for (let i = 0; i<category.length; i++){
      filteredLength.push(arr.filter(t => t.completed === true
        && t.category === category[i] 
        ).length);
      console.log(filteredLength);
      filteredTasks.push(arr.filter(t => (t.completed === true && t.category === category[i]) 
      && (t.completedAt < now && t.completedAt > monthAgo)
      ));
      console.log(filteredTasks);
    }
    return filteredLength;
  }

  const MonthlyCompleted = getMonthTasks(allTasks, myLabels);
  console.log(MonthlyCompleted);


  // Get 1 year of completed tasks, 'rolling' (1 year ago from now);
  const getYearTasks = (arr, category) => {
    let filteredLength = [];
    let filteredTasks = [];
    let now = moment().calendar();
    let yearAgo = moment().subtract(1, 'years').calendar();
    moment(now).toISOString();
    moment(yearAgo).toISOString();
    console.log(now);
    console.log(yearAgo);
    console.log(now > yearAgo);

    for (let i = 0; i<category.length; i++){
      filteredLength.push(arr.filter(t => t.completed === true
        && t.category === category[i] 
        ).length);
      console.log(filteredLength);
      filteredTasks.push(arr.filter(t => (t.completed === true && t.category === category[i]) 
      && (t.completedAt < now && t.completedAt > yearAgo)
      ));
      console.log(filteredTasks);
    }
    return filteredLength;
  }

  const YearlyCompleted = getYearTasks(allTasks, myLabels);
  console.log(YearlyCompleted); 
  
const data = {
    labels: myLabels,
    datasets: [
      {
        label: "Rolling Weekly",
        backgroundColor: "rgba(220,220,220,0.2)",
        pointBackgroundColor: "rgba(220,220,220,1)",
        data: WeeklyCompleted
      }, {
        label: 'Rolling Monthly',
        hidden: true,
        data: MonthlyCompleted
      }, {
        label: "Rolling Yearly",
        backgroundColor: "rgba(151,187,205,0.2)",
        pointBackgroundColor: "rgba(151,187,205,1)",
        hoverPointBackgroundColor: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        data: YearlyCompleted
      }
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
      text: 'Trajectory',
      fontSize: 24,
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
  
  return (
    <div className={classes.root}>
      <Radar
        className={classes.chart}
        data={data}
        options={options}
        width={39}
        height={51}
        style={{paddingTop: 20, paddingBottom: 20}}
      />
    </div>
  );
}


export default Trajectory;
