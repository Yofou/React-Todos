import { styled } from "@stitches/react"
import { useDispatch, useSelector } from "react-redux"
import FormFooter from "./form-footer"
import { AppDispatch, RootState } from "../global"
import ItemList from "./item-list"
import { pushItem, update } from "../slicer/todo"

const FormContainer = styled('form', {
	width: "100%",
	height: "max-content",
	background: "white",
	boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1)"
})

const InputText = styled('input', {
	width: "100%",
	padding: "1rem 60px",
	paddingRight: "1rem",
	border: "none",
	fontSize: "1.5rem",
	boxShadow: "inset 0 -2px 1px rgba(0,0,0,0.03)",
	"&::placeholder": {
		color: "$white300",
		fontStyle: "italic",
	},
	"&:focus": {
		outline: "none"
	}
})

const Form: React.FC = () => {
	const input = useSelector((state: RootState) => state.input)
	const dispatch = useDispatch<AppDispatch>()

	const onInputChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => dispatch( update( target.value ) ) 
	const onSubmit: React.FormEventHandler = (event) => {
		event.preventDefault()
		if ( input.value.length === 0 ) return
		dispatch(pushItem( input.value ))
	}

	return <FormContainer onSubmit={onSubmit} >
		<InputText placeholder="What needs to be done?" type="text" onChange={onInputChange} value={input.value} />
		<ItemList />
		<FormFooter />
	</FormContainer>
}

export default Form
