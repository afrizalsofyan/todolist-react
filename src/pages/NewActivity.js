import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Card } from '../components/Card';
import EmptyItem from '../components/EmptyItem';
import Layout from '../components/Layout';
import Navigation from '../components/Navigation';
import EmptyTodoList from '../assets/images/todo-empty-state.png';

function NewActivity() {
  const location = useLocation();
  let pageTitle = '';
  if (location.pathname.includes('new-activity')) {
    pageTitle = 'New Activity';
  }
  React.useEffect(() => {}, []);
  return (
    <Layout
      data_cy={'dashboard-data'}
      child={
        <main
          data-cy='main-content'
          className='px-[13.75rem] mt-11 flex flex-col gap-14 items-center'
        >
          <Navigation
            pageName={pageTitle}
            // onClickButton={() => navigate('/new-activity')}
          />
          {/* <div className='grid grid-cols-4 gap-4'>
            <Card
              activityName={'Daftar Belanja Bulanan'}
              createAt={'5 Oktober 2021'}
            />
          </div> */}
          <EmptyItem img={EmptyTodoList} />
        </main>
      }
    />
  );
}

export default NewActivity;
