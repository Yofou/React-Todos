import { styled } from "@stitches/react"
import { styles } from "./lib/css/global"
import Form from "./lib/components/form"
import { css } from "./stiches.config"
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "./lib/global"
import { moveItem } from "./lib/slicer/todo"

const H1 = styled("h1", {
	fontSize: "6.25rem",
	color: "rgba(175, 47, 47, 0.15)",
	marginTop: "1rem"
})

const Main = styled('main', {
	width: "100%",
	height: "100%",
	display: "grid",
	gridTemplateRows: "max-content 1fr",
	gridTemplateColumns: "minmax(0, 550px)",
	justifyContent: "center",
	justifyItems: "center",
	gap: "2rem"
})

const App: React.FC = () => {
	css()
	styles()
	
	const input = useSelector( (state: RootState) => state.input )
	const dispatch = useDispatch<AppDispatch>()
	const onDragEnd = (result: DropResult) => {
		const { source, destination } = result
		const temp = input.todo[source.index] 
		if (destination?.index) {
			dispatch( moveItem({ source: source.index, destination: destination.index, input: temp }) )
		}
	}

	return <DragDropContext onDragEnd={onDragEnd}>
		<Main>
			<H1>todos</H1>
			<Form />
		</Main>
	</DragDropContext> 
}

export default App
