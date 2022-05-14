import {
	Box,
	Button,
	ButtonGroup,
	Card,
	CardContent,
	Typography,
} from "@mui/material";
import React, { useState } from "react";
import Center from "./Center";
import PopupCategory from "./PopupCategory";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();

	const handleClick = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const handleCreate = (e) => {
		e.preventDefault();
		navigate("/create-quiz");
	};
	return (
		<Center>
			<Card sx={{ width: "800px" }}>
				<CardContent sx={{ textAlign: "center" }}>
					<Typography variant="h3" sx={{ my: 3 }}>
						Bun venit, @marian.petrescu!
					</Typography>
					<Box
						sx={{
							"& .MuiTextField-root": {
								m: 1,
								width: "90%",
							},
						}}
					>
						<ButtonGroup
							orientation="vertical"
							aria-label="vertical outlined button group"
						>
							<Button
								sx={{ my: "12px" }}
								variant="contained"
								onClick={handleCreate}
								disableElevation
							>
								Create a test
							</Button>
							<Button sx={{ my: "12px" }} variant="contained" disableElevation>
								Visualize the created test
							</Button>{" "}
							<Button sx={{ my: "12px" }} variant="contained" disableElevation>
								Add a target group
							</Button>{" "}
							<>
								<Button
									sx={{ my: "12px" }}
									variant="contained"
									onClick={handleClick}
									disableElevation
								>
									Add content
								</Button>
								{open && <PopupCategory openForm={open} close={handleClose} />}
							</>
							<Button sx={{ my: "12px" }} variant="contained" disableElevation>
								Check Authenticate
							</Button>{" "}
						</ButtonGroup>
					</Box>
				</CardContent>
			</Card>
		</Center>
	);
};

export default AdminPage;
