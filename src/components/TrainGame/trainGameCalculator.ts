import {
  GAME_TARGET,
  TRAIN_NUMBER_LENGTH,
  isCompleteTrainNumber,
} from "./TrainGame";

export type TrainGameResult = String;

type Calculator = (a: number, b: number) => number;

enum BasicOperator {
  Plus = "+",
  Minus = "-",
  Divide = "/",
  Multiply = "*",
}

enum AdvancedOperator {
  Power = "^",
  Modulo = "%",
}

type Progress = {
  displayString: string;
  remainingNums: number[];
};

const basicOperators: Record<BasicOperator, Calculator> = {
  [BasicOperator.Plus]: function (a: number, b: number): number {
    return a + b;
  },
  [BasicOperator.Minus]: function (a: number, b: number): number {
    return a - b;
  },
  [BasicOperator.Divide]: function (a: number, b: number): number {
    return a / b;
  },
  [BasicOperator.Multiply]: function (a: number, b: number): number {
    return a * b;
  },
};

const advancedOperators: Record<AdvancedOperator, Calculator> = {
  [AdvancedOperator.Power]: function (a: number, b: number): number {
    return Math.pow(a, b);
  },
  [AdvancedOperator.Modulo]: function (a: number, b: number): number {
    return a % b;
  },
};
const allOperators = { ...basicOperators, ...advancedOperators };

function permutator<T>(inputArr: T[]): T[][] {
  let result: T[][] = [];

  const permute = (arr: T[], m: T[] = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        const curr = arr.slice();
        const next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };

  permute(inputArr);

  return result;
}

function applyCalculation({
  nums,
  displayString,
  operator,
  calculator,
}: {
  nums: number[];
  displayString: string;
  operator: string;
  calculator: Calculator;
}): Progress {
  if (nums.length === 1) {
    return {
      displayString,
      remainingNums: nums,
    };
  }
  if (nums[1] === 0 && operator === BasicOperator.Divide) {
    throw new Error();
  }
  return {
    remainingNums: [calculator(nums[0], nums[1]), ...nums.slice(2)],
    displayString:
      displayString === ""
        ? `(${nums[0]} ${operator} ${nums[1]})`
        : `(${displayString} ${operator} ${nums[1]})`,
  };
}

export function trainGameCalculator(
  trainNum: string,
  advancedOperators: boolean
): TrainGameResult[] {
  const operators = advancedOperators ? allOperators : basicOperators;
  if (!isCompleteTrainNumber(trainNum)) return [];

  const individualNumbers = trainNum.split("").map((num) => parseFloat(num));

  const numberPerms = permutator(individualNumbers);

  const outcomes = numberPerms.flatMap((fourNumbers) => {
    let workInProgress: Progress[] = [
      { remainingNums: fourNumbers, displayString: "" },
    ];
    for (let i = 0; i < TRAIN_NUMBER_LENGTH - 1; i++) {
      const nextWorkInProgress = workInProgress.flatMap((progress) => {
        return Object.entries(operators).flatMap(([operator, calculator]) => {
          try {
            return applyCalculation({
              nums: progress.remainingNums,
              displayString: progress.displayString,
              operator,
              calculator,
            });
          } catch {
            return [] as Progress[];
          }
        });
      });
      workInProgress = nextWorkInProgress;
    }
    return workInProgress
      .filter((progress) => progress.remainingNums[0] === GAME_TARGET)
      .map((progress) => progress.displayString.slice(1, -1));
  });
  return Array.from(new Set(outcomes).values());
}
