import { ITodo } from '../types/ITodo';
import api from './index';

export const editStatus = async (todo: ITodo) => {
    return await api.put(`${todo.id}`, todo.data)
}

export const deleteTodo = async (todo: ITodo) => {
    return await api.delete(`${todo.id}`)
}
