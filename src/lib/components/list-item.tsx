import { InputValueTodoItem, removeItem, toggleItemDone } from "../slicer/todo"
import { styled } from "../../stiches.config"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../global"
import { Draggable } from "react-beautiful-dnd"
import ListItemLabel from "./list-item-label"

const ItemContainer = styled('div', {
	display: "grid",
	gridTemplateColumns: "max-content 1fr max-content",
	alignItems: "center",
	gap: "1rem",
	padding: "15px 10px",
	paddingRight: "15px",
	borderBottom: "1px solid $white300",
	fontSize: "1.5rem",
	background: "white",
	"@mobile": {
		fontSize: "1.2rem"
	},
})

const ItemButton = styled('button', {
	background: "var(--bg-color, )",
	width: "var(--dim, 30px)",
	height: "var(--dim, 30px)",
	borderRadius: "100%",
	cursor: "pointer",
	padding: "0",
	border: "1px solid rgba(77, 77, 77, .1)",
	color: "#5DC2AF",
	fontSize: "1.5rem",
	"@mobile": {
		fontSize: "1.2rem"
	},
})

const ItemDeleteButton = styled('button', {
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
			<ItemContainer 
				{...provided.draggableProps} 
				{...provided.dragHandleProps} 
				ref={provided.innerRef} 
				className={item.isDone ? "active" : ""} 
				key={item.id}
			>
				<ItemButton type="button" onClick={onItemDoneToggle(index)}>{ item.isDone ? "✓" : "" }</ItemButton>

				<ListItemLabel index={index}>
					{item.value}
				</ListItemLabel>

				<ItemDeleteButton type="button" onClick={onItemClick( item.id )}>×</ItemDeleteButton>
			</ItemContainer>
		)} 
	</Draggable>
}

export default Item
