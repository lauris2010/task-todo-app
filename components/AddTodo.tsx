import React from 'react'
import {colRef} from '../firebase/todoApp';
import toast from 'react-hot-toast'
import { addDoc} from 'firebase/firestore';

import { useForm } from 'react-hook-form'
import Todos from './Todos';

import {
  chakra,
  FormControl,
  FormLabel,
  Input,
  Button,
  Container,
  Center,
} from '@chakra-ui/react'
import { useUser } from '@auth0/nextjs-auth0';
import { ITodoCreateEntry, TodoStatus } from '../types/ITodo';

const StyledFormControl = chakra(FormControl, {
  baseStyle: {
    margin: '0 auto',
    maxWidth: 'max-content'
  },
});

const AddTodo = () => {
  const { user, isLoading } = useUser();
  const errorNotify = () => toast.error("Something went wrong!");

  const { 
    register,
    setValue,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<ITodoCreateEntry>();

  const onSubmit = handleSubmit(async (formData) => {
    const notification = toast.loading('Creating todo');
    const addTodoObj = {
      title: formData.title,
      desc: formData.desc,
      sub: user.sub,
      status: TodoStatus.Pending
    };

    await addDoc(colRef, addTodoObj).catch(() => {
      toast.error('something went wrong!', {
        id: notification
      });
    });

    setValue('title', '');
    setValue('desc', '');

    toast.success('New Todo created', {
      id: notification
    });
  });
  
  return (
    <Container maxW='6xl'  h={'300px'} alignItems='center' justifyContent='center'>
      <form onSubmit={onSubmit}>
        <StyledFormControl>
          <Center>
            <FormControl>
              <FormLabel >Create Todo's</FormLabel>
              <Input 
                type='text'
                {...register("title", { required: true })}
                placeholder='Enter Title'
                htmlSize={24}
                width='auto'
              />
            </FormControl>
          </Center>
          <Center >
            <FormControl>
              <Input 
                type='text'
                {...register("desc", { required: true })}
                placeholder='Enter description'
                htmlSize={24}
                width='auto'
              />
            </FormControl>
          </Center>
          {Object.keys(errors).length ?
              <Center w='200px'>
              <Button colorScheme='red' mt={6} onClick={errorNotify} type='submit'>
                  Submit
              </Button>
              </Center> :
              <Center w='230px'>
                <Button colorScheme='teal' mt={6} type='submit'>
                    Submit
                </Button>
              </Center> 
          }
              {Object.keys(errors).length > 0 && (
              <div className=''>
                { errors.title?.type === 'required' && (
                  <p>Title is Required</p>
                )}
                { errors.desc?.type === 'required' && (
                  <p>Description is required</p>
                )}
              </div>
            )}
        </StyledFormControl>
      </form>
      <Todos/>
    </Container>
  )
}

export default AddTodo
