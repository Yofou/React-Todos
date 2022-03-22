import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum ViewOptions {
	ALL,
	ACTIVE,
	DONE,
}

const initialState = ViewOptions.ALL 
export const viewSlicer = createSlice({
	name: "view",
	initialState, 
	reducers : {
		update: (_, action: PayloadAction<ViewOptions>) => action.payload
	}
})

export const { update } = viewSlicer.actions
