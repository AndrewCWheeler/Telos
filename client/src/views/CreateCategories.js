import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import Container from '@material-ui/core/Container';
import CategoryComponent from '../components/CategoryComponent';
import BottomNavComponent from '../components/BottomNavComponent';

const CreateCategories = () => {
  const [category, setCategory] = useState({
    nameOne: '',
    nameTwo: '',
    nameThree: '',
    nameFour: '',
    nameFive: '',
    nameSix: '',
    nameSeven: '',
    nameEight: '',
  });
  const onChangeHandler = e => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
    console.log(category);
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/api/categories', category)
      .then(res => {
        setCategory({
          nameOne: '',
          nameTwo: '',
          nameThree: '',
          nameFour: '',
          nameFive: '',
          nameSix: '',
          nameSeven: '',
          nameEight: '',
        });

        navigate('/categories');
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <Container>
      <CategoryComponent
        onChangeHandler={onChangeHandler}
        onSubmitHandler={onSubmitHandler}
        data={category}
        setData={setCategory}
      />
    </Container>
  );
};

export default CreateCategories;
