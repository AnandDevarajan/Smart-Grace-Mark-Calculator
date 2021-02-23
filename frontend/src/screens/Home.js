import React from 'react';
import './Home.css';
import { Container, Button, Image } from 'react-bootstrap';

const Home = () => {
  return (
    <div className='home'>
      <div className='home__student'>
      <Image src="https://static.thenounproject.com/png/35785-200.png" thumbnail />
        <Button variant='success'>create student account</Button>
      </div>
      <div className='home__faculty'>
      <Image src="https://static.thenounproject.com/png/2011000-200.png" thumbnail/>
        <Button variant='success'>create Faculty account</Button>
      </div>
      <div className='home__admin'>
      <Image src="https://static.thenounproject.com/png/371299-200.png" thumbnail/>
        <Button variant='success'> create Admin account</Button>
      </div>
    </div>
  );
};

export default Home;
