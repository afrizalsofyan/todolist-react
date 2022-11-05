import React from 'react';
import Layout from '../components/Layout';
import Navigation from '../components/Navigation';
import EmptyActivity from '../assets/images/activity-empty-state.png';
import { Card } from '../components/Card';
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../components/DeleteModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  createActivity,
  deleteActivity,
  getAllActivity,
  getOneActivity,
} from '../redux/action/activity';
import EmptyItem from '../components/EmptyItem';
import { getAllTodo } from '../redux/action/todo';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.activity.results);
  const [showModalDelete, setShowModalDelete] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [loadingOnButton, setLoadingOnButton] = React.useState(false);
  const [deleteSuccess, setDeleteSuccess] = React.useState(false);
  const [selectedItemId, setSelectedItemId] = React.useState(null);
  const email = 'afrizalafaandy@gmail.com';
  const date = [
    'januari',
    'februari',
    'maret',
    'april',
    'mei',
    'juni',
    'juli',
    'agustus',
    'september',
    'oktober',
    'november',
    'desember',
  ];
  const convertDate = (param) => {
    const newDate = new Date(param);
    let month = '';
    let fullDate = '';
    const temp = newDate.toLocaleDateString().split('/');
    temp.map((e, i) => {
      if (i === 0) {
        month = date[e - 1];
      }
      return (fullDate = temp[1] + ' ' + month + ' ' + temp[2]);
    });
    return fullDate;
  };
  React.useEffect(() => {
    dispatch(getAllActivity({ email: email }));
    if (loading) {
      dispatch(getAllActivity({ email: email }));
      setTimeout(() => {
        setLoading(false);
        setLoadingOnButton(false);
      }, 500);
    }
    if (showModalDelete || deleteSuccess) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [dispatch, loading, loadingOnButton, showModalDelete, deleteSuccess]);
  return (
    <div>
      <Layout
        data_cy={'dashboard-data'}
        child={
          <main
            data-cy='main-content'
            className='px-20 md:px-[13.75rem] mt-11 flex flex-col gap-14 items-center'
          >
            <Navigation
              pageName={'activity'}
              onClickButton={() => {
                dispatch(
                  createActivity({
                    title: 'new activity',
                    email: 'afrizalafaandy@gmail.com',
                  })
                );
                setLoading(true);
                setLoadingOnButton(true);
              }}
              isLoading={loadingOnButton}
            />
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-3'>
              {data?.length > 0 ? (
                <>
                  {!loading ? (
                    <>
                      {data &&
                        data?.map((e, i) => {
                          return (
                            <Card
                              key={'card ' + i}
                              activityName={e.title}
                              createAt={convertDate(e.created_at)}
                              onClick={() => {
                                dispatch(getAllTodo({ id: e.id }));
                                dispatch(getOneActivity({ id: e.id }));
                                setTimeout(() => {
                                  navigate(`/details/${e.id}`, {
                                    state: { activityName: e.title },
                                  });
                                }, 500);
                              }}
                              onClickDelete={() => {
                                setShowModalDelete(!showModalDelete);
                                setSelectedItem(e.title);
                                setSelectedItemId(e.id);
                              }}
                            />
                          );
                        })}
                    </>
                  ) : (
                    <div className='h-1/2 col-span-4 flex items-center'>
                      <svg
                        aria-hidden='true'
                        className='mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
                        viewBox='0 0 100 101'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                          fill='currentColor'
                        />
                        <path
                          d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                          fill='currentFill'
                        />
                      </svg>
                    </div>
                  )}
                </>
              ) : (
                <EmptyItem
                  img={EmptyActivity}
                  onClick={() => {
                    dispatch(
                      createActivity({
                        title: 'new activity',
                        email: 'afrizalafaandy@gmail.com',
                      })
                    );
                    setLoading(true);

                    setLoadingOnButton(true);
                  }}
                />
              )}
            </div>
          </main>
        }
      />
      {showModalDelete ? (
        <DeleteModal
          nameItem={selectedItem}
          onCancel={() => setShowModalDelete(!showModalDelete)}
          onDelete={() => {
            dispatch(deleteActivity({ id: selectedItemId }));
            setShowModalDelete(!showModalDelete);
            setLoading(true);
            setDeleteSuccess(true);
          }}
          type='activity'
        />
      ) : null}
      {deleteSuccess ? (
        <DeleteModal
          successDelete={deleteSuccess}
          onContinue={() => {
            setDeleteSuccess(false);
          }}
        />
      ) : null}
    </div>
  );
}

export default Dashboard;
