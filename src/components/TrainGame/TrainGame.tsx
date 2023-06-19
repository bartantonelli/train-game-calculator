import { trainGameCalculator } from "./trainGameCalculator";
import {
  Button,
  List,
  ListItem,
  OutlinedInput,
  Switch,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import posthog from "posthog-js";
import React, { useState } from "react";

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
  const [inOrder, setInOrder] = useState<boolean>(false);
  const currentTrainNumber = controlledTrainNumber || trainNumber;
  const results = trainGameCalculator(
    currentTrainNumber,
    useAdvancedOperators,
    inOrder
  );
  const [showResults, setShowResults] = useState<boolean>(false);
  return (
    <div>
      <Box pt="1rem" justifyContent="center" p="1rem">
        <Box
          alignItems="center"
          display="flex"
          justifyContent="center"
          gap="2rem"
          flexWrap="wrap"
        >
          <Typography>{"Train Number"}</Typography>
          {controlledTrainNumber && (
            <Typography sx={{ fontWeight: "bold" }} pl="1rem">
              {controlledTrainNumber}
            </Typography>
          )}
          {controlledTrainNumber ? (
            <></>
          ) : (
            <OutlinedInput
              sx={{
                minWidth: "5rem",
                width: "5rem",
                height: "2rem",
                ml: "1rem",
              }}
              value={trainNumber}
              autoFocus
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
          <Box display="flex" flexDirection="column">
            <Box display="flex" alignItems="center" justifyContent="right">
              <Typography p="1rem">{"Advanced Operators"}</Typography>
              <Switch
                value={useAdvancedOperators}
                onChange={(e) => setUseAdvancedOperators(e.target.checked)}
              />
            </Box>
            <Box display="flex" alignItems="center" justifyContent="right">
              <Typography p="1rem">{"In Order Only"}</Typography>
              <Switch
                value={useAdvancedOperators}
                onChange={(e) => setInOrder(e.target.checked)}
              />
            </Box>
          </Box>
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
            disabled={
              !isCompleteTrainNumber(currentTrainNumber) || !results.length
            }
            onClick={() => setShowResults(!showResults)}
            sx={{
              mt: "1rem",
              // make the colour of the button change depending on whether the results are shown or not
              bgcolor: showResults ? "red" : "green",
            }}
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
