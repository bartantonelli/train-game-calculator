import { GAME_TARGET, isCompleteTrainNumber } from "./TrainGame";

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

function generateRPN(
  numbers: number[],
  operators: string[],
  stack: (string | number)[],
  stackNetNumbers: number
): (string | number)[][] {
  // you can always add another number to the stack, but you can only add an operator if there are
  // at least 2 net numbers on the stack
  const validNextElements: (string | number)[] = [
    ...numbers,
    ...(stackNetNumbers >= 2 ? operators : []),
  ];
  //base case
  if (!validNextElements.length) return [stack];
  const validPerms: (string | number)[][] = [];
  validNextElements.forEach((nextElement) => {
    try {
      const remainingNumbers =
        typeof nextElement === "number"
          ? numbers
              .slice()
              .filter((num, index) => index !== numbers.indexOf(nextElement))
          : numbers.slice();

      const somePerms = generateRPN(
        remainingNumbers,
        operators,
        [...stack, nextElement],
        typeof nextElement === "number"
          ? stackNetNumbers + 1
          : stackNetNumbers - 1
      );
      validPerms.push(...somePerms);
    } catch {}
  });
  return validPerms;
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

function convertToInfix(expression: (number | string)[]): string {
  const stack: string[] = [];

  for (const token of expression) {
    if (typeof token === "number") {
      stack.push(token.toString());
    } else {
      if (stack.length < 2) {
        throw new Error("Invalid expression");
      }
      const operand2 = stack.pop()!;
      const operand1 = stack.pop()!;
      stack.push(`(${operand1} ${token} ${operand2})`);
    }
  }

  if (stack.length !== 1) {
    throw new Error("Invalid expression");
  }

  return stack.pop()!;
}

function isInOrder(solution: string, trainNum: string) {
  return (
    solution
      .split("")
      .filter((character) => parseInt(character) > 0)
      .join("") === trainNum
  );
}

export function trainGameCalculator(
  trainNum: string,
  advancedOperators: boolean,
  inOrderOnly: boolean
): TrainGameResult[] {
  const operators = advancedOperators ? allOperators : basicOperators;
  if (!isCompleteTrainNumber(trainNum)) return [];

  const individualNumbers = trainNum.split("").map((num) => parseFloat(num));
  const possibleCombos = generateRPN(
    individualNumbers,
    Object.keys(operators),
    [],
    0
  );
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
