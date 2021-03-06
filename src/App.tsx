import { styled } from "./stiches.config"
import { styles } from "./lib/css/global"
import Form from "./lib/components/form"
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "./lib/global"
import { moveItem } from "./lib/slicer/todo"

const H1 = styled("h1", {
	fontSize: "6.25rem",
	color: "rgba(175, 47, 47, 0.15)",
	marginTop: "1rem"
})

const P = styled('p', {
	fontSize: "0.625rem",
	marginTop: "calc(65px - 2rem)",
	height: "max-content",
	color: "#bfbfbf"
})

const Main = styled('main', {
	width: "100%",
	height: "100%",
	display: "grid",
	gridTemplateRows: "max-content max-content 1fr",
	gridTemplateColumns: "minmax(0, 550px)",
	justifyContent: "center",
	justifyItems: "center",
	gap: "2rem",
	"@mobile": {
		padding: "0 20px"
	}
})

const App: React.FC = () => {
	styles()
	
	const input = useSelector( (state: RootState) => state.input )
	const dispatch = useDispatch<AppDispatch>()
	const onDragEnd = (result: DropResult) => {
		const { source, destination } = result
		const temp = input.todo[source.index] 
		if (destination?.index !== undefined) {
			dispatch( moveItem({ source: source.index, destination: destination.index, input: temp }) )
		}
	}

	return <DragDropContext onDragEnd={onDragEnd}>
		<Main>
			<H1>todos</H1>
			<Form />
			<P>Double-click to edit a todo</P>
		</Main>
	</DragDropContext> 
}

export default App
