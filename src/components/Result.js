import {
  Alert,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getFormatedTime } from "../helper";
import useStateContext from "../hooks/useStateContext";
import { green } from "@mui/material/colors";
import Answer from "./Answer";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Result() {
  const { context, setContext } = useStateContext();
  const [score, setScore] = useState(0);
  const [qnAnswers, setQnAnswers] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    var qna;
    Promise.all(
      (qna = context.selectedOptions.map((x) => ({
        ...x,
        ...context.qns.find((y) => y.id === x.qnId),
      })))
    ).then(() => {
      setTimeout(setQnAnswers(qna), 1000);

      calculateScore(qna);
    });
  }, []);

  const calculateScore = (qna) => {
    let tempScore = qna.reduce((acc, curr) => {
      return curr.correctAnswer === curr.selected ? acc + 1 : acc;
    }, 0);
    setScore(tempScore);
    console.log("answer isss", qnAnswers);
  };

  const restart = () => {
    setContext({
      timeTaken: 0,
      selectedOptions: [],
    });
    navigate("/quiz");
  };

  const submitScore = async () => {
    try {
      await setDoc(doc(db, "Score", context.participantId), {
        participantId: context.participantId,
        score: score,
        timeTaken: context.timeTaken,
        timeStamp: serverTimestamp(),
      });

      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Card
        sx={{
          mt: 5,
          display: "flex",
          width: "100%",
          maxWidth: 640,
          mx: "auto",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <CardContent sx={{ flex: "1 0 auto", textAlign: "center" }}>
            <Typography variant="h4">Congratulations!</Typography>
            <Typography variant="h6">YOUR SCORE</Typography>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              <Typography variant="span" color={green[500]}>
                {score}
              </Typography>
              /5
            </Typography>
            <Typography variant="h6">
              Took {getFormatedTime(context.timeTaken) + " mins"}
            </Typography>
            <Button
              variant="contained"
              sx={{ mx: 1 }}
              size="small"
              onClick={submitScore}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              sx={{ mx: 1 }}
              size="small"
              onClick={restart}
            >
              Re-try
            </Button>
            <Alert
              variant="outlined"
              severity="success"
              sx={{
                width: "53%",
                m: "auto",
                mt: "1rem",
                visibility: showAlert ? "visible" : "hidden",
              }}
            >
              Score Updated.
            </Alert>
          </CardContent>
        </Box>
        <CardMedia component="img" sx={{ width: 220 }} image="./result.png" />
      </Card>
      <Answer qnAnswers={qnAnswers} />
    </>
  );
}
