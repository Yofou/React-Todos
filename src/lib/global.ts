import { configureStore } from "@reduxjs/toolkit";
import { inputSlicer } from "./slicer/todo";
import { viewSlicer } from "./slicer/view";

export const stores = configureStore({
	reducer: {
		input: inputSlicer.reducer,
		views: viewSlicer.reducer,
	}
})

export type RootState = ReturnType<typeof stores.getState>
export type AppDispatch = typeof stores.dispatch
