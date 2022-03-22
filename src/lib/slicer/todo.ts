import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export type InputValueTodoItem<T> = {
	id: string,
	value: T,
	isDone: boolean, 
}

export type InputInitalValues<T> = {
	value: T,
	todo: InputValueTodoItem<T>[]
}

const storage = localStorage.getItem("todos")
const initialState: InputInitalValues<string> = storage ? JSON.parse(storage ?? "") : { value: "", todo: [] }

const updateLocalStorage = (input: InputInitalValues<string>) => {
	localStorage.setItem(
		"todos",
		JSON.stringify(input)
	)
}

export const inputSlicer = createSlice({
	name: "input",
	initialState,
	reducers: {
		update: (state, action: PayloadAction<string>) => {
			state.value = action.payload
		},
		pushItem: (state, action: PayloadAction<string>) => {
			if (action.payload.toLowerCase().includes("react") || action.payload.toLowerCase().includes("angular")) {
				window.location.href = "https://svelte.dev/"
				return
			}

			const item: InputValueTodoItem<string> = {
				id: uuidv4(),
				value: action.payload,
				isDone: false,
			}

			state.todo = [item, ...state.todo]
			state.value = ""
			updateLocalStorage(state)
		},
		removeItem: (state, action: PayloadAction<string>) => {
			state.todo = state.todo.filter( item => action.payload !== item.id )
			updateLocalStorage(state)
		},
		updateItem: (state, action: PayloadAction<{ index: number, value: string }>) => {
			const { index, value } = action.payload
			state.todo[index].value = value
			updateLocalStorage(state)
		},
		toggleItemDone: (state, action: PayloadAction<number>) => {
			state.todo[action.payload].isDone = !(state.todo[action.payload].isDone) 
			updateLocalStorage(state)
		},
		clearDone: (state) => {
			state.todo = state.todo.filter(item => !item.isDone)
			updateLocalStorage(state)
		},
		moveItem: (state, action: PayloadAction<{ source: number, destination: number, input: InputValueTodoItem<string> }>) => {
			const { source, destination, input } = action.payload
			const copy = Array.from( state.todo )
			copy.splice(source, 1) // remove the item
			copy.splice(destination, 0, input) // re add it back into the new current position (AKA it's destination)

			state.todo = copy
			updateLocalStorage(state)
		}
	}
})

export const { update, pushItem, removeItem, updateItem, toggleItemDone, clearDone, moveItem } = inputSlicer.actions
