import { InputValueTodoItem, removeItem, toggleItemDone } from "../slicer/todo"
import { styled } from "@stitches/react" 
import { useDispatch } from "react-redux"
import { AppDispatch } from "../global"
import { Draggable } from "react-beautiful-dnd"

const ListContainer = styled('div', {
	display: "grid",
	gridTemplateColumns: "max-content 1fr max-content",
	alignItems: "center",
	gap: "1rem",
	padding: "15px 10px",
	paddingRight: "15px",
	borderBottom: "1px solid $white300",
	fontSize: "1.5rem",
	transition: "all 0.2s",
	background: "white",
	"&.active li": {
		color: "#d9d9d9",
		textDecoration: "line-through"
	}
})

const ListButton = styled('button', {
	background: "var(--bg-color, )",
	width: "var(--dim, 30px)",
	height: "var(--dim, 30px)",
	borderRadius: "100%",
	cursor: "pointer",
	padding: "0",
	border: "1px solid rgba(77, 77, 77, .1)",
})

const ListItem = styled('li', {
	cursor: "pointer",
	listStyle: "none",
	color: "#4d4d4d",
	transition: "all 0.2s",
})

const ListItemDelete = styled('button', {
	display: "none",
	background: "transparent",
	border: "none",
	fontSize: "30px",
	color: "#cc9a9a",
	padding: "0",
	width: "30px",
	height: "30px",
	cursor: "pointer",
	"div:hover &": {
		display: "block"
	}
})

type ItemProp = { item: InputValueTodoItem<string>, index: number, }
const Item: React.FC<ItemProp> = ({ item, index }) => {
	const dispatch = useDispatch<AppDispatch>()
	const onItemClick = (id: string) => () => dispatch(removeItem(id))
	const onItemDoneToggle = (index: number) => () => dispatch(toggleItemDone(index))

	return <Draggable draggableId={item.id} index={index}>
		{(provided) => (
			<ListContainer 
				{...provided.draggableProps} 
				{...provided.dragHandleProps} 
				ref={provided.innerRef} 
				className={item.isDone ? "active" : ""} 
				key={item.id}
			>
				<ListButton type="button" onClick={onItemDoneToggle(index)} />

				<ListItem key={item.id}>
					{item.value}
				</ListItem>

				<ListItemDelete type="button" onClick={onItemClick( item.id )}>×</ListItemDelete>
			</ListContainer>
		)} 
	</Draggable>
}

export default Item
