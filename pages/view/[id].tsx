import React from 'react'
import { useRouter } from 'next/router'
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from '../../firebase/todoApp';
import { Box, Container, Heading, Flex, Divider, Text} from '@chakra-ui/react';
import { ITodo } from '../../types/ITodo';


const Preview = () => {
  const router = useRouter()
  const todoId = router.query.id && router.query.id.toString()
  const [todo, setTodo] = React.useState<ITodo>({} as ITodo)
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    if (!todoId) {
      return
    }
    const docRef = doc(db, 'todos', todoId)
    const getItem = async () => {
      const docSnap = await getDoc(docRef).catch(() => {
        setIsError(true);
      });

      if(docSnap && docSnap.exists()) {
          setTodo({
              id: docSnap.id,
              data: docSnap.data()
            } as ITodo
          )
          onSnapshot(docRef, (snapShot) => {
            setTodo(
              {
                id: snapShot.id,
                data: snapShot.data()
              } as ITodo
            )
          })
          return
      }

      setIsError(true);
    }
    getItem()
  }, [router.query.id])

  return (
    <Container>
      <Heading mb={10}>Preview Todo</Heading>
        <Box p="4" mt='4' maxW="920px" borderWidth="1px" borderRadius='md'>
          <Flex flexDirection="column" align="baseline" p={2}>
            <Heading size='sm' mt='4'>Title:</Heading>
            <Text size='md' mt='2'>{todo?.data?.title}</Text>
          </Flex>
        <Divider mt='10px' mb='12px'/>
          <Flex flexDirection="column" align="baseline" p={2}>
            <Heading size='sm' mt='4'>Description:</Heading>
            <Text mb={2}>
              {todo?.data?.desc}
            </Text>
          </Flex>
        </Box>
    </Container>
  )
}

export default Preview