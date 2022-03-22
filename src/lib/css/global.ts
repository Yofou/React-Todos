import { globalCss } from "@stitches/react";
import { reset } from "stitches-reset";

export const styles = globalCss({
	...reset,
	"@import": "url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap')",
	"*": {
		"fontFamily": "'Roboto', sans-serif !important",
		"boxSizing": "border-box",
	},
	"html, body": {
		backgroundColor: "$whiteCream",
		width: "100%",
		height: "100%",
	},
})
