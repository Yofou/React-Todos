import { createStitches } from "@stitches/react";

export const { css, styled, globalCss } = createStitches({
	theme: {
		colors: {
			whiteCream: "#f5f5f5",
			white300: "#e6e6e6"
		},
	},
	media: {
		mobile: "(max-width: 640px)",
	},
})
