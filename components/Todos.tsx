import React from 'react'
import {
  Box,
  Heading,
  chakra,
  Grid,
} from '@chakra-ui/react'

import { useUser } from '@auth0/nextjs-auth0'

import { newRef } from '../firebase/todoApp'
import { getDocs, onSnapshot, query, where } from 'firebase/firestore'
import { ITodo, TodoStatus  } from '../types/ITodo'

import Todo from './Todo';

const StyledGrid = chakra(Grid, {
  baseStyle: {
  
  },
});

const StyledContainerBox = chakra(Box, {
  baseStyle: {
    justifyContent: 'center',
    width: 'inherit'
  },
});

const StyledTodoDiv = chakra('div', {
	baseStyle: {
		maxWidth: '33.33%',
		width: '100%'
	}
});

const Todos = () => {
  const [newTodo, setNewTodo] = React.useState([])
  const { user, isLoading } = useUser()

  const todoStatusesMap = {
    [TodoStatus.Pending]: {
      title: 'Pending'
    },
    [TodoStatus.InProgress]: {
      title: 'In Progress'
    },
    [TodoStatus.Done]: {
      title: 'Done'
    },
  }

  React.useEffect(() => {
    if (!user) {
      // we need authenticated user sub
      // to continue
      return;
    }

    async function getTodoList() {
      const todoListQuery = query(newRef, where("sub", "==", user.sub));
      const querySnapshot = await getDocs(todoListQuery);

      onSnapshot(todoListQuery, (querySnapshot) => {
        const todoList: ITodo[] = [];
        querySnapshot.forEach((doc) => {
          const todoItem = {
            id: doc.id, 
            data: doc.data()
          } as ITodo;
          todoList.push(todoItem);
        });
        setNewTodo(todoList);
      });
    }
    getTodoList()
  }, [user])

  if(user === undefined) {
    return
  }else {
    return (
      <div>
      <StyledContainerBox>
      <Heading size='lg' mt='16' mb='5'>Todo List</Heading>
      </StyledContainerBox>
          <StyledContainerBox flex='end' display='flex'  gap={30}>
          { Object.entries(todoStatusesMap).map(([key, statusObj]) => (
          <StyledTodoDiv>
            <Heading size='xs' p={5}>{statusObj.title}</Heading>
            <Box>
              { newTodo?.filter((todo: ITodo) => todo.data.status === key).map((todo : ITodo) => (
                <Todo todo={todo}/>
                )
                )}
            </Box>
          </StyledTodoDiv>
        ))}
      </StyledContainerBox>
      </div>
      )
    }
  }
export default Todos