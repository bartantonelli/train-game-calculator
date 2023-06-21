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
  const result: T[][] = [];

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

function generateCombinations<T>(items: T[], size: number) {
  const combinations: T[][] = [];

  function generateHelper(currentCombination: T[], start: number) {
    if (currentCombination.length === size) {
      combinations.push(currentCombination.slice()); // Add a copy of the current combination
      return;
    }

    for (let i = start; i < items.length; i++) {
      currentCombination.push(items[i]);
      generateHelper(currentCombination, i); // Recursive call with updated start index
      currentCombination.pop();
    }
  }

  generateHelper([], 0);

  return combinations;
}

function evaluateRPN(
  expression: (string | number)[],
  operators: Record<BasicOperator, Calculator>
) {
  const stack: number[] = [];

  for (let i = 0; i < expression.length; i++) {
    const token = expression[i];

    if (typeof token === "number") {
      stack.push(token);
    } else {
      if (stack.length < 2) {
        throw new Error("Invalid expression");
      }

      const operand2 = stack.pop();
      const operand1 = stack.pop();
      const calculator = operators[token as BasicOperator];
      if (!operand1 || !operand2 || !calculator) throw new Error("invalid");
      const result = calculator(operand1, operand2);
      stack.push(result);
    }
  }

  if (stack.length !== 1) {
    throw new Error("Invalid expression");
  }

  return stack.pop();
}

function isOperator(token: string): boolean {
  return ["+", "-", "*", "/"].includes(token);
}

function convertToInfix(expression: (number | string)[]): string {
  const stack: string[] = [];

  for (const token of expression) {
    if (typeof token === "number") {
      stack.push(token.toString());
    } else if (isOperator(token)) {
      if (stack.length < 2) {
        throw new Error("Invalid expression");
      }

      const operand2 = stack.pop()!;
      const operand1 = stack.pop()!;
      let result = "";

      if (token === "+" || token === "-") {
        result = `(${operand1} ${token} ${operand2})`;
      } else {
        result = `(${operand1} ${token} ${operand2})`;
      }

      stack.push(result);
    } else {
      throw new Error("Invalid token");
    }
  }

  if (stack.length !== 1) {
    throw new Error("Invalid expression");
  }

  return stack.pop()!;
}

function isInOrder(solution: string, trainNum: string) {
  const indexes = trainNum.split("").map((num) => solution.indexOf(num));
  for (let i = 1; i < indexes.length; i++) {
    if (indexes[i] < indexes[i - 1]) return false;
  }
  return true;
}

export function trainGameCalculator(
  trainNum: string,
  advancedOperators: boolean,
  inOrderOnly: boolean
): TrainGameResult[] {
  const operators = advancedOperators ? allOperators : basicOperators;
  if (!isCompleteTrainNumber(trainNum)) return [];

  const individualNumbers = trainNum.split("").map((num) => parseFloat(num));

  const operatorSelections = generateCombinations(Object.keys(operators), 3);

  const possibleCombos = operatorSelections.flatMap((ops) => {
    return permutator([...ops, ...individualNumbers]);
  });
  console.log(possibleCombos.length);
  const solutions = possibleCombos
    .flatMap((expression) => {
      try {
        const result = evaluateRPN(expression, operators);
        return {
          result,
          expression,
        };
      } catch {
        return [];
      }
    })
    .filter((sol) => sol.result === GAME_TARGET)
    .map((sol) => convertToInfix(sol.expression))
    .filter((sol) => (inOrderOnly ? isInOrder(sol, trainNum) : true));
  return Array.from(new Set(solutions).values());
}
