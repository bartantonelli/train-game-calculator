import {
  List,
  ListItem,
  OutlinedInput,
  Switch,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { trainGameCalculator } from "./trainGameCalculator";

export const TRAIN_NUMBER_LENGTH = 4;
export const GAME_TARGET = 10;

function isValidTrainNumber(num: String) {
  return num.length <= TRAIN_NUMBER_LENGTH && num.match(/^\d*$/);
}

export function isCompleteTrainNumber(num: string) {
  return isValidTrainNumber(num) && num.length === TRAIN_NUMBER_LENGTH;
}

function TrainGame() {
  const [trainNumber, setTrainNumber] = useState<string>("");
  const [useAdvancedOperators, setUseAdvancedOperators] =
    useState<boolean>(false);
  const results = trainGameCalculator(trainNumber, useAdvancedOperators);
  return (
    <div>
      <Box pt="1rem" justifyContent="center">
        <Box alignItems="center" display="flex" justifyContent="center">
          <Typography>{"Train Number"}</Typography>
          <OutlinedInput
            sx={{ ml: "1rem", width: "5rem", height: "2rem" }}
            value={trainNumber}
            onChange={(e) => {
              if (isValidTrainNumber(e.target.value))
                setTrainNumber(e.target.value);
            }}
          />
          <Typography p="1rem">{"Advanced Operators"}</Typography>
          <Switch
            value={useAdvancedOperators}
            onChange={(e) => setUseAdvancedOperators(e.target.checked)}
          />
        </Box>
        <Box justifyContent="center" pt="2rem">
          <Typography>
            {!isCompleteTrainNumber(trainNumber)
              ? "Please enter a 4 digit train number"
              : results.length
              ? `There are ${results.length} unique ways to solve this game`
              : `No Results :(`}
          </Typography>
          <List>
            {results.map((result) => (
              <ListItem sx={{ justifyContent: "center" }}>
                <Typography>{result}</Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </div>
  );
}

export default TrainGame;
