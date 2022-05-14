import { Container, Typography } from "@mui/material";
import React from "react";

const CreateQuiz = () => {
	return (
		<Container maxWidth="lg" sx={{ my: "4rem" }}>
			<Typography variant="h5" component="h2">
				Select the subject
			</Typography>
		</Container>
	);
};

export default CreateQuiz;
