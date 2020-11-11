// import React, {useState, useEffect} from 'react';
// import axios from 'axios';
// import { FormControl, InputLabel, Select } from '@material-ui/core';

// const CategoryList = () => {
//   const [sessionUserId, setSessionUserId] = useState('');
//   const [category, setCategory] = useState({
//     name: '',
//     color: '',
//   });
//   const [allCategories, setAllCategories] = useState([]);
//   const [load, setLoad] = useState(0);
  
  
//   useEffect(() => {
//   let one = 'http://localhost:8000/api/users/one';
//   const requestOne = axios.get(one, { withCredentials: true });
//   requestOne
//     .then(response => {
//       setSessionUserId(response.data.results._id);
//     })
//     .catch(error => {
//       console.log(error);
//     });
//   let two = 'http://localhost:8000/api/categories/user';
//   const requestTwo = axios.get(two, { withCredentials: true });
//   requestTwo
//     .then(response => {
//       setAllCategories(response.data.results);
//     })
//     .catch(error => {
//       console.log(error);
//     });
//   axios
//     .all([requestOne, requestTwo])
//     .then(
//       axios.spread((...responses) => {
//         const responseOne = responses[0];
//         const responseTwo = responses[1];
//         console.log(responseOne, responseTwo);
//       })
//     )
//     .catch(errors => {
//       console.log(errors)
//     });
//   }, [load]);
//   return (
//     <FormControl
//       variant='standard'
//     >
//       <InputLabel
//         htmlFor='category'
//       >
//         Chunk...
//       </InputLabel>
//       <Select
//         native
//         className={classes.textModal}
//         value={task.category}
//                 // onClick={e => {
//                 //   onClickHandler(e, task._id);
//                 // }}
//                 onChange={e => {
//                   onPatchHandler(e, task._id, 'Task Chunked!');
//                 }}
//                 label='Chunk...'
//                 name='category'>
//         <option aria-label='None' value=''/>
//       {allCategories.map((category, i) =>
//         <option key={i} value={category.name}>{category.name}</option>
//       )}
//       </Select>
//     </FormControl>


//   )
// }

// export default CategoryList;
