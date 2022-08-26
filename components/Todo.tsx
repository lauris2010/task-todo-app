import React from 'react'
import Link from 'next/link'
import { editStatus, deleteTodo } from '../axios/actions';

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Select,
  chakra,
  Flex,
  Text
} from '@chakra-ui/react'
import { ExternalLinkIcon, DeleteIcon} from '@chakra-ui/icons'

import toast from 'react-hot-toast'

import { ITodo, TodoStatus } from '../types/ITodo';

const StyledAccordionPanel = chakra(AccordionPanel, {
  baseStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
});


const handleDeleteTodo = async (todo: ITodo) => {
	const deleteTodoResult = await deleteTodo(todo).catch(() => {
		toast.error('Todo deletion failed!');
	})
	
	if (!deleteTodoResult || !deleteTodoResult.data) {
		toast.error('Todo deletion failed!');
		return;
	}

	toast.success('Todo Deleted!');
}

const handleTodoStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>, todo: ITodo) => {
	const updatedTodo = {
		id: todo.id,
		data: { ...todo.data, status: e.target.value as TodoStatus }
	};

	const updateTodoResult = await editStatus(updatedTodo).catch(() => {
		toast.error('Todo status update failed!');
	})

	if (!updateTodoResult || !updateTodoResult.data) {
		toast.error('Todo status update failed!');
		return;
	}

	toast.success('Todo status changed!');
}

const Todo = ({ todo }) => {
	const todoStatusesMap = {
		[TodoStatus.Pending]: {
		  title: 'Pending',
		},
		[TodoStatus.InProgress]: {
		  title: 'In Progress'
		},
		[TodoStatus.Done]: {
		  title: 'Done'
		},
	}

	return (
		<Accordion defaultIndex={[1]} allowMultiple>
			<AccordionItem>
				<h2>
					<AccordionButton>
						<Box key={todo.id} flex='1' textAlign='left'>
							{todo.data.title}
						</Box>
						<AccordionIcon />
					</AccordionButton>
				</h2>
				<StyledAccordionPanel display='flex' flexDirection='column' p={4} key={todo.id}>
					<Flex align='baseline' >
						<Text >
							{todo.data.desc}
						</Text>
					</Flex>
					<Flex align='baseline'>
						<Link href={`/view/${todo.id}`}>
							<ExternalLinkIcon m={[6]} cursor='pointer'/>
						</Link>
						<DeleteIcon cursor='pointer' onClick={() => { handleDeleteTodo(todo) }}/>
						<Select pl={3} w={'140px'} value={todo.data.status} onChange={(e) => { handleTodoStatusChange(e, todo)}}>
							{Object.entries(todoStatusesMap).map(([key, statusObj]) => (
								<option value={key}>{statusObj.title}</option>
							))}
						</Select>
					</Flex>
				</StyledAccordionPanel>
			</AccordionItem>
		</Accordion>
	)
}

export default Todo