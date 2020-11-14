import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import { Radar }  from 'react-chartjs-2';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
// const randomColor = require('../lib/randomColor')

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 840,
    // flexGrow: 1,
    },
}));

const Trajectory = () => {
  const [sessionUserId, setSessionUserId] = useState('');
  const [allTasks, setAllTasks] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [load, setLoad] = useState('');

  const classes = useStyles();
  


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
        navigate('/signup');
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
  
  const completedTasks = (arr, category) => {
    let filtered = [];
    for (let i = 0; i<category.length; i++){
      filtered.push(arr.filter(t => t.completed === true 
        && t.category === category[i]
        ).length);
      console.log(filtered);
    }
    return filtered;  
  }
  const completed = completedTasks(allTasks, myLabels);
  console.log(completed); 
  
const data = {
    labels: myLabels,
    datasets: [
      {
        label: "Week 1",
        backgroundColor: "rgba(220,220,220,0.2)",
        pointBackgroundColor: "rgba(220,220,220,1)",
        data: completed
      }, {
        label: 'Hidden dataset',
        hidden: true,
        data: [
          1,
          0,
          2,
          0,
          0,
          0,
          1,
          2
        ]
      }, {
        label: "My Second dataset",
        backgroundColor: "rgba(151,187,205,0.2)",
        pointBackgroundColor: "rgba(151,187,205,1)",
        hoverPointBackgroundColor: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        data: [
          null
        ]
      }
    ]
  }
  
  const options = {
    legend: {
      position: 'top',
      labels: {
        fontColor: '#fff',
        fontSize: 18,
      }
    },
    labels: {
      fontColor: '#fff',
    },
    title: {
      display: true,
      text: 'Trajectory'
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
      ticks: {
        beginAtZero: true
      }
    }
  }
  
  return (
    <Radar data={data} options={options}/>
  );
}


export default Trajectory;
