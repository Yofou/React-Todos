import { styled } from "../../stiches.config"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../global"
import { clearDone } from "../slicer/todo"
import { update, ViewOptions } from "../slicer/view"

const FooterContainer = styled('footer', {
	width: "100%",
	display: "grid",
	gridTemplateColumns: "repeat(2, minmax(0, max-content) minmax(0, 1fr)) minmax(0, max-content)",
	gridTemplateAreas: '"count all active completed clear"',
	gap: "1rem",
	padding: "10px 15px",
	borderTop: "1px solid $white300",
	boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2)",
	"alignItems": "center",
	"& > *": {
		fontWeight: "400",	
		fontSize: "0.875rem",
		color: "#777",
	},
	"& > button": {
		background: "transparent",
		border: "none",
		textAlign: "left",
		cursor: "pointer"
	},
	"& > button.active": {
		border: "1px solid rgba(175, 47, 47, 0.2)",
		borderRadius: "3px"
	},
	"@mobile": {
		gridTemplateRows: "1fr",
		gridTemplateAreas: `
			"count . . . clear"
			". all active completed ."
		`
	}
})

const FormFooter: React.FC = () => {
	const input = useSelector( (state: RootState) => state.input )
	const view = useSelector( (state: RootState) => state.views )
	const dispatch = useDispatch<AppDispatch>()
	const doneCount = input.todo.reduce( (total, current) => total + (current.isDone ? 1 : 0) , 0)

	const clearCompelted = () => {
		dispatch( clearDone() )
	}

	const onViewOptionClicked = (option: ViewOptions) => () => {
		dispatch( update(option) )
	}

	return <FooterContainer>
		<p style={{ gridArea: "count" }}>{input.todo.length} item(s) left</p>
		<button type="button" className={ view === ViewOptions.ALL ? "active" : "" } style={{ justifySelf: "end", gridArea: "all" }} onClick={onViewOptionClicked(ViewOptions.ALL)}>All</button>
		<button type="button" className={ view === ViewOptions.ACTIVE ? "active" : "" } style={{ gridArea: "active" }} onClick={onViewOptionClicked(ViewOptions.ACTIVE)}>Active</button>
		<button type="button" className={ view === ViewOptions.DONE ? "active" : "" } style={{ justifySelf: "start", gridArea: "completed" }} onClick={onViewOptionClicked(ViewOptions.DONE)}>Completed</button>
		<button style={{ gridArea: "clear" }}type="button" onClick={clearCompelted}>Clear Completed ({ doneCount })</button>
	</FooterContainer>
}

export default FormFooter
