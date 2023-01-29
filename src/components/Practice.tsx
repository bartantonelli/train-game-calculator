import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import TrainGame from "./TrainGame/TrainGame";

function getRandomTrainNumber() {
  return (Math.floor(Math.random() * 9000) + 1000).toString();
}

function Practice() {
  const [trainNumber, setTrainNumber] = useState<string>(
    getRandomTrainNumber()
  );

  return (
    <div>
      <Box pt="1rem" justifyContent="center">
        <Button
          variant="contained"
          onClick={() => {
            setTrainNumber(getRandomTrainNumber());
          }}
        >
          {"Generate New Train Number"}
        </Button>
        <TrainGame controlledTrainNumber={trainNumber} />
      </Box>
    </div>
  );
}

export default Practice;
