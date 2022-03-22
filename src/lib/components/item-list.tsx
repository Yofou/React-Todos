import { styled } from "@stitches/react"
import { Droppable } from "react-beautiful-dnd"
import { useSelector } from "react-redux"
import { RootState } from "../global"
import { ViewOptions } from "../slicer/view"
import Item from "./item"

const UL = styled('ul', {
	display: "flex",
	flexDirection: "column",
})

const ItemList: React.FC = () => {
	const input = useSelector( (state: RootState) => state.input )
	const views = useSelector( (state: RootState) => state.views )
	const todos = views === ViewOptions.ALL ? input.todo : input.todo.filter(item => {
		if (views === ViewOptions.DONE) {
			return item.isDone
		} else {
			return !item.isDone
		}
	}) 

	return <Droppable droppableId="item list">
		{(provided) => (
			<UL {...provided.droppableProps} ref={provided.innerRef}>
				{todos.map((item, index) => <Item key={item.id} item={item} index={index} />)}
				{provided.placeholder}
			</UL>
		)}
	</Droppable>
}

export default ItemList
