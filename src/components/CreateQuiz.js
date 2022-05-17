import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
	Checkbox,
	Container,
	FormControl,
	Grid,
	InputLabel,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	MenuItem,
	Paper,
	Select,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "@emotion/styled";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: "center",
	color: theme.palette.text.secondary,
}));

const CreateQuiz = () => {
	const [subject, setSubject] = React.useState("");
	const [expanded, setExpanded] = React.useState("panel2");
	const [checked, setChecked] = React.useState([]);
	const focusPoint = React.useRef(null);

	const handleChange = (event) => {
		setSubject(event.target.value);
	};
	const handleAccordion = (panel) => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : false);
	};

	const handleToggle = (value, e) => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked, { category: "", questionTypes: [] }];

		if (currentIndex === -1) {
			if (e.currentTarget.getAttribute("role") === "lists") {
				// newChecked[0].category = "lists";
				// newChecked[0].questionTypes.push(value);
				console.log(newChecked[0]);
			} else if (e.currentTarget.getAttribute("role") === "graphs") {
				for (const item in newChecked[0]) {
					item.category = "graphs";
					item.questionTypes.push(value);
				}
				// newChecked[0].category = "graphs";
				// newChecked[0].questionTypes.push(value);
				console.log(newChecked[0]);
			}
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};
	const handleAddItem = async (e) => {
		e.preventDefault();
		// await setDoc(doc(db, "quiz", "LA"), {
		// 	subjectName: subject,
		// 	questionCategories: [{ category: }],
		// 	country: "USA",
		// });

		console.log(checked);
		console.log(subject);
	};

	return (
		<Container maxWidth="lg" sx={{ my: "4rem", flexGrow: 1 }}>
			<Grid container spacing={2}>
				<Grid item xs={8}>
					<Item>
						<Typography variant="h5" component="h2">
							Select the subject
						</Typography>
						<FormControl sx={{ my: 2, minWidth: 315 }} size="small">
							<InputLabel id="demo-select-small">Subject</InputLabel>
							<Select
								labelId="demo-select-small"
								id="demo-select-small"
								value={subject}
								label="Subject"
								onChange={handleChange}
							>
								<MenuItem value={"Data Structure and algorithm"}>
									Data Structure and algorithm
								</MenuItem>
								<MenuItem value={"Arts & Literature"}>
									Arts & Literature
								</MenuItem>{" "}
								<MenuItem value={"React js interview"}>
									React js interview
								</MenuItem>
								<MenuItem value={"Sciences"}>Sciences</MenuItem>
							</Select>
						</FormControl>
						<Box sx={{ flexGrow: 1 }}>
							<Accordion
								expanded={expanded === "panel1"}
								onChange={handleAccordion("panel1")}
							>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel1a-content"
									id="panel1a-header"
									expanded={true}
								>
									<Typography>Lists</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<List
										sx={{
											width: "100%",
										}}
									>
										{[0, 1, 2, 3].map((value) => {
											const labelId = `checkbox-list-label-${value}`;

											return (
												<ListItem key={value} disablePadding>
													<ListItemButton
														role="lists"
														onClick={(e) => handleToggle(value, e)}
														g
														dense
													>
														<ListItemIcon>
															<Checkbox
																edge="start"
																checked={checked.indexOf(value) !== -1}
																tabIndex={-1}
																disableRipple
																inputProps={{ "aria-labelledby": labelId }}
															/>
														</ListItemIcon>
														<ListItemText
															id={labelId}
															primary={`Line item ${value + 1}`}
														/>
													</ListItemButton>
												</ListItem>
											);
										})}
									</List>
								</AccordionDetails>
							</Accordion>
							<Accordion
								expanded={expanded === "panel2"}
								onChange={handleAccordion("panel2")}
							>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel2a-content"
									id="panel2a-header"
								>
									<Typography>Graphs</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<List
										sx={{
											width: "100%",
											// maxWidth: 360,
											// bgcolor: "background.paper",
										}}
									>
										{["item0", "item1", "item2", "item3"].map((value) => {
											const labelId = `checkbox-list-label-${value}`;

											return (
												<ListItem key={value} disablePadding>
													<ListItemButton
														role="graphs"
														onClick={(e) => handleToggle(value, e)}
														dense
													>
														<ListItemIcon>
															<Checkbox
																edge="start"
																checked={checked.indexOf(value) !== -1}
																tabIndex={-1}
																disableRipple
																inputProps={{ "aria-labelledby": labelId }}
															/>
														</ListItemIcon>
														<ListItemText
															id={labelId}
															primary={`Line item ${value + 1}`}
														/>
													</ListItemButton>
												</ListItem>
											);
										})}
									</List>
								</AccordionDetails>
							</Accordion>
							<Button
								variant="contained"
								size="small"
								color="success"
								onClick={handleAddItem}
								sx={{ mt: "2rem", float: "right" }}
							>
								ADD
							</Button>
						</Box>
					</Item>
				</Grid>
				<Grid item xs={4}>
					<Item>
						<Typography variant="h5" component="h2">
							Visualize the test
						</Typography>
						<List
							sx={{
								width: "100%",
								my: "10px",
								maxWidth: 360,
								bgcolor: "#1E1E1E",
								position: "relative",
								overflow: "auto",
								maxHeight: 418,
								"& ul": { padding: 0 },
							}}
							subheader={<li />}
						>
							{checked.length !== 0 &&
								checked?.map((question, index) => (
									<li key={`section-${index}`}>
										<ul>
											<ListItem key={`item-${question}`}>
												<ListItemText primary={`${question}`} />
											</ListItem>
										</ul>
									</li>
								))}
						</List>
					</Item>
				</Grid>
				<Grid item xs={12}>
					<Button sx={{ my: "12px", float: "right" }} variant="contained">
						Next Step
					</Button>
				</Grid>
			</Grid>
		</Container>
	);
};

export default CreateQuiz;
