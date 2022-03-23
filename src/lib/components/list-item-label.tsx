import { styled } from "@stitches/react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../global"
import { updateItem } from "../slicer/todo"

const ItemText = styled('li', {
	display: "grid",
	alignItems: "center",
	width: "100%",
	cursor: "pointer",
	listStyle: "none",
	color: "#4d4d4d",
	transition: "all 0.2s",
	".active &": {
		color: "#d9d9d9",
		textDecoration: "line-through"
	},
})

const ItemInput = styled("input", {
	width: "100%",
	border: "none",
	outline: "none",
	font: "inherit",
	color: "#4d4d4d",
	caretColor: "rgba(175, 47, 47, 0.3)",
	padding: "0",
	margin: "0",
})

type ListItemLabelProps = { index: number }
export const ListItemLabel: React.FC<ListItemLabelProps> = ({ children, index }) => {
	const [isEditing, setIsEditing] = useState(false)
	const item = useSelector( (state: RootState) => state.input.todo[index] )
	const dipatch = useDispatch<AppDispatch>()

	const onDblClick = () => setIsEditing(true)
	const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = ({ key, currentTarget }) => {
		if (key === "Enter" || key === "Escape") currentTarget.blur()
	}
	const onBlur = () => setIsEditing(false)
	const onChange: React.ChangeEventHandler<HTMLInputElement>  = ({ target }) => {
		const payload = { index, value: target.value }
		dipatch(updateItem( payload ))
	}

	let ListItem = <ItemText onDoubleClick={onDblClick}>{children}</ItemText>
	if (isEditing) ListItem = <ItemInput 
		type="text" 
		onBlur={onBlur} 
		autoFocus 
		onKeyDown={onKeyDown}
		onChange={onChange}
		value={item.value} 
	/> 

	return ListItem 
}

export default ListItemLabel
