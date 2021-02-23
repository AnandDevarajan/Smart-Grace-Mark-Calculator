import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Button, Image } from 'react-bootstrap';

const Home = () => {
  return (
    <div className='home'>
      <div className='home__student'>
        <Image
          src='https://static.thenounproject.com/png/35785-200.png'
          thumbnail
        />
        <Button variant='success' className='mt-3 text-white'>
          <Link
            to='/student/login'
            style={{ textDecoration: 'none' }}
            className='text-white'
          >
            {' '}
            Sign in as student
          </Link>
        </Button>
        <Button variant='primary' className='mt-3'>
          <Link    to='/student/signup'
            style={{ textDecoration: 'none' }}
            className='text-white'> create student account</Link>
        </Button>
      </div>
      <div className='home__faculty'>
        <Image
          src='https://static.thenounproject.com/png/2011000-200.png'
          thumbnail
        />
        <Button variant='success' className='mt-3'>
          <Link    to='/faculty/login'
            style={{ textDecoration: 'none' }}
            className='text-white'>Sign in as Faculty</Link>
        </Button>
        <Button variant='primary' className='mt-3'>
          <Link    to='/faculty/signup'
            style={{ textDecoration: 'none' }}
            className='text-white'>create Faculty account</Link> 
        </Button>
      </div>
      
      <div className='home__admin'>
        <Image
          src='https://static.thenounproject.com/png/371299-200.png'
          thumbnail
        />
        <Button variant='success' className='mt-3'>
          <Link    to='/admin/login'
            style={{ textDecoration: 'none' }}
            className='text-white'> Sign in as Admin</Link>
        </Button>
        <Button variant='primary' className='mt-3'>
          {' '}
          <Link    to='/admin/signup'
            style={{ textDecoration: 'none' }}
            className='text-white'> create Admin account</Link>
        </Button>
      </div>
    </div>
  );
};

export default Home;
