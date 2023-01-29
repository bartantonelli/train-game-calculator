import {
  Button,
  List,
  ListItem,
  OutlinedInput,
  Switch,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { trainGameCalculator } from "./trainGameCalculator";
import posthog from "posthog-js";

export const TRAIN_NUMBER_LENGTH = 4;
export const GAME_TARGET = 10;

function isValidTrainNumber(num: String) {
  return num.length <= TRAIN_NUMBER_LENGTH && num.match(/^\d*$/);
}

export function isCompleteTrainNumber(num: string) {
  return isValidTrainNumber(num) && num.length === TRAIN_NUMBER_LENGTH;
}

function TrainGame({
  controlledTrainNumber,
}: {
  controlledTrainNumber?: string;
}) {
  const [trainNumber, setTrainNumber] = useState<string>("");
  const [useAdvancedOperators, setUseAdvancedOperators] =
    useState<boolean>(false);
  const currentTrainNumber = controlledTrainNumber || trainNumber;
  const results = trainGameCalculator(currentTrainNumber, useAdvancedOperators);
  const [showResults, setShowResults] = useState<boolean>(false);
  return (
    <div>
      <Box pt="1rem" justifyContent="center">
        <Box alignItems="center" display="flex" justifyContent="center">
          <Typography>{"Train Number"}</Typography>
          <Box sx={{ ml: "1rem", width: "5rem", height: "2rem" }}>
            {controlledTrainNumber ? (
              <Typography sx={{ width: "100%", height: "100%" }}>
                {controlledTrainNumber}
              </Typography>
            ) : (
              <OutlinedInput
                sx={{ width: "100%", height: "100%" }}
                value={trainNumber}
                onChange={(e) => {
                  setShowResults(false);
                  if (isValidTrainNumber(e.target.value)) {
                    posthog.capture("trainNumberEntered", {
                      number: e.target.value,
                    });
                    setTrainNumber(e.target.value);
                  }
                }}
              />
            )}
          </Box>
          <Typography p="1rem">{"Advanced Operators"}</Typography>
          <Switch
            value={useAdvancedOperators}
            onChange={(e) => setUseAdvancedOperators(e.target.checked)}
          />
        </Box>
        <Box justifyContent="center" pt="1rem">
          <Typography>
            {!isCompleteTrainNumber(currentTrainNumber)
              ? "Please enter a 4 digit train number"
              : results.length
              ? `There are ${results.length} unique ways to solve this game`
              : `No Results :(`}
          </Typography>
          <Button
            variant="contained"
            onClick={() => setShowResults(!showResults)}
            sx={{ mt: "1rem" }}
          >
            {" "}
            {showResults ? "Hide Results" : "Show Results"}
          </Button>
          {showResults && results.length > 0 ? (
            <List>
              {results.map((result) => (
                <ListItem sx={{ justifyContent: "center" }}>
                  <Typography>{result}</Typography>
                </ListItem>
              ))}
            </List>
          ) : null}
        </Box>
      </Box>
    </div>
  );
}

export default TrainGame;
