import React from 'react';
import { useParams } from 'react-router-dom';
import AddListItem from '../components/AddListItem';
import { CardListItem } from '../components/Card';
import EmptyItem from '../components/EmptyItem';
import Layout from '../components/Layout';
import Navigation from '../components/Navigation';
import EmptyTodoList from '../assets/images/todo-empty-state.png';
import DeleteModal from '../components/DeleteModal';
import { useDispatch, useSelector } from 'react-redux';
import { getOneActivity } from '../redux/action/activity';
import { deleteTodo, getAllTodo, updateTodo } from '../redux/action/todo';
import {
  ascSort,
  deletedItem,
  descSort,
  newerSort,
  olderSort,
  unFinished,
} from '../redux/reducer/todo';
import store from '../redux/store';
import { Helmet } from 'react-helmet-async';

function DetailListItem() {
  const params = useParams();
  const dispatch = useDispatch();
  const activity = useSelector((state) => state.activity.result);
  const todo = useSelector((state) => state.todo.results);
  const todoSorted = useSelector(() => store.getState().todo.sorted);
  const [showModalAddItem, setShowModalAddItem] = React.useState(false);
  const [showModalEditItem, setShowModalEditItem] = React.useState(false);
  const [showModalDelete, setShowModalDelete] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [updateCheck, setUpdateCheck] = React.useState(false);
  const [hideDropdown, setHideDropdown] = React.useState(true);
  const [deleteItem, setDeleteItem] = React.useState(false);
  const handleSort = (_, idx) => {
    const temp = [...todo];
    if (idx === 0) {
      dispatch(newerSort(todo));
    } else if (idx === 1) {
      temp.reverse();
      dispatch(olderSort(temp));
    } else if (idx === 2) {
      temp.sort((a, b) =>
        a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
      );
      dispatch(ascSort(temp));
    } else if (idx === 3) {
      temp.sort((a, b) =>
        a.title.toLowerCase() > b.title.toLowerCase() ? -1 : 1
      );
      dispatch(descSort(temp));
    } else if (idx === 4) {
      temp.sort((a, b) => (a.is_active > b.is_active ? -1 : 1));
      dispatch(unFinished(temp));
    }
  };
  React.useEffect(() => {
    if (deleteItem === false) {
      if (todoSorted?.length < 1) {
        dispatch(newerSort(todo));
        setTimeout(() => {
          setDeleteItem(false);
        }, 500);
      }
    }
  }, [deleteItem, dispatch, todoSorted, todo]);
  React.useEffect(() => {
    if (updateCheck) {
      dispatch(getAllTodo({ id: params?.idActivity }));
      dispatch(newerSort(todo));
      setTimeout(() => {
        setUpdateCheck(false);
      }, 500);
    }
  }, [dispatch, todo, updateCheck, params?.idActivity]);
  React.useEffect(() => {
    dispatch(getOneActivity({ id: params?.idActivity }));
    dispatch(getAllTodo({ id: params?.idActivity }));
    if (loading) {
      dispatch(getAllTodo({ id: params?.idActivity }));
      setLoading(false);
    }
    if (showModalAddItem || showModalEditItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [
    params?.idActivity,
    dispatch,
    loading,
    showModalAddItem,
    showModalEditItem,
  ]);
  return (
    <>
      <Helmet>
        <title>To Do List - Details</title>
      </Helmet>
      <Layout
        data_cy={'dashboard-data'}
        child={
          <main
            data-cy='main-content'
            className='px-10 md:px-[13.75rem] mt-11 flex flex-col gap-14 items-center'
            onClick={() => {
              setHideDropdown(!hideDropdown);
            }}
          >
            <Navigation
              isEdit
              isGoBack
              isFilter
              goBackTo={'/'}
              data={activity}
              onClickButton={() => setShowModalAddItem(!showModalAddItem)}
              onSelectSort={handleSort}
              titleType='todo'
              buttonFor='todo'
              hideDropdown={hideDropdown}
            />
            {!updateCheck ? (
              <>
                {todoSorted && todoSorted?.length > 0 ? (
                  <div
                    data_cy='todo-item-list'
                    className='grid grid-flow-row w-full gap-4'
                  >
                    {todoSorted &&
                      todoSorted?.map((e, i) => {
                        return (
                          <CardListItem
                            key={'card-item ' + i}
                            data={e}
                            onClickDelete={() => {
                              setShowModalDelete(!showModalDelete);
                              setSelectedItem(e);
                            }}
                            onChecklist={() => {
                              setLoading(true);
                              dispatch(
                                updateTodo({
                                  id: e.id,
                                  is_active: e.is_active === 0 ? 1 : 0,
                                  priority: e.priority,
                                })
                              );
                            }}
                            onEditItem={() => {
                              setSelectedItem(e);
                              setShowModalEditItem(!showModalEditItem);
                            }}
                          />
                        );
                      })}
                  </div>
                ) : (
                  <EmptyItem
                    img={EmptyTodoList}
                    onClick={() => setShowModalAddItem(!showModalAddItem)}
                    emptyType='todo'
                  />
                )}
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
          </main>
        }
      />
      {showModalAddItem ? (
        <AddListItem
          onHideModal={() => setShowModalAddItem(!showModalAddItem)}
          onComplate={() => {
            setLoading(true);
            setShowModalAddItem(!showModalAddItem);
          }}
          onHide={() => setShowModalAddItem(!showModalAddItem)}
        />
      ) : null}
      {showModalEditItem ? (
        <AddListItem
          itemData={selectedItem}
          onHideModal={() => setShowModalEditItem(!showModalEditItem)}
          onComplate={() => {
            setUpdateCheck(true);
            setShowModalEditItem(!showModalEditItem);
          }}
          onHide={() => setShowModalEditItem(!showModalEditItem)}
        />
      ) : null}
      {showModalDelete ? (
        <DeleteModal
          nameItem={selectedItem?.title}
          onCancel={() => setShowModalDelete(!showModalDelete)}
          onDelete={async () => {
            dispatch(deleteTodo({ id: selectedItem?.id }));
            dispatch(deletedItem(selectedItem?.id));
            setLoading(true);
            setDeleteItem(true);
            setShowModalDelete(!showModalDelete);
          }}
          type='item'
        />
      ) : null}
    </>
  );
}

export default DetailListItem;
