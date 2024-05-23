import React, { useState } from 'react';
import './App.css';
const Calci = () => {
  const [display, setDisplay] = useState('');

  const handleClear = () => {
    setDisplay('');
  };

  const handleClick = (value) => {
    setDisplay(display + value);
  };

  const handleEqual = () => {
    try {
      const tokens = tokenize(display);
      const result = evaluateExp(tokens);
      setDisplay(result.toString());
    } catch (error) {
      setDisplay('Error');
    }
  };

  // const tokens = ['3', '+', '5', '*', '2'];
  // Now, let's see how the evaluateExpression function processes this array of tokens:

  //     Iteration 1: The first token is "3", which is a number. It adds 3 to the running total.
  //         total = 3
  //         lastOperator = '+'

  //     Iteration 2: The second token is "+ ", which is an operator. Since it's an operator, the else block is executed, and the lastOperator is updated to +.
  //         total = 3
  //         lastOperator = '+'

  //     Iteration 3: The third token is "5", which is a number. Now, since the lastOperator is +, it adds 5 to the running total.
  //         total = 8
  //         lastOperator = '+'

  //     Iteration 4: The fourth token is "* ", which is an operator. Again, the else block is executed, and the lastOperator is updated to *.
  //         total = 8
  //         lastOperator = '*'

  //     Iteration 5: The fifth token is "2", which is a number. Now, since the lastOperator is *, it multiplies 2 with the running total.
  //         total = 16
  //         lastOperator = '*'

  // After processing all tokens, the final result is 16, which is the correct evaluation of the expression "3 + 5 * 2".
  const evaluateExp = (tokens) => {
    let total = 0;
    let lastopr = '+';

    tokens.forEach((token) => {
      if (!isNaN(token)) {
        const number = parseFloat(token);
        switch (lastopr) {
          case '+':
            total = total + number;
            break;
          case '-':
            total = number - total;
            break;
          case '*':
            total = number * total;
            break;
          case '/':
            total = number / total;
            break;
          default:
            throw new Error('Invalid opr');
        }
      } else {
        lastopr = token;
      }
    });
    return total;
  };

  //   \d+: This part matches one or more digits (0-9). The \d represents any digit character, and the + quantifier means "one or more times". So, \d+ matches sequences of one or more digits.

  // |: The pipe symbol | acts as an OR operator in regular expressions. It allows matching one of multiple alternatives. In this case, it separates different alternatives for matching.

  // \+|\-|\*|\/: These are the alternatives separated by the | symbol. Each one matches a specific arithmetic operator:
  // tokenize function breaks down a mathematical expression into individual tokens, which are numbers and arithmetic operators. These tokens can then be processed further for evaluation or manipulation.
  const tokenize = (expression) => {
    const a = expression.match(/(\d+|\+|\-|\*|\/)/g);
    console.log(a, 'tokems');
    return a;
  };

  return (
    <div class="calci">
      <div class="displayBox"> {display}</div>
      <div class="btnContainer">
        <button onClick={handleClear}>C</button>
        <button onClick={() => handleClick('1')}>1</button>
        <button onClick={() => handleClick('2')}>2</button>
        <button onClick={() => handleClick('3')}>3</button>
        <button onClick={() => handleClick('4')}>4</button>
        <button onClick={() => handleClick('5')}>5</button>
        <button onClick={() => handleClick('6')}>6</button>
        <button onClick={() => handleClick('7')}>7</button>
        <button onClick={() => handleClick('8')}>8</button>
        <button onClick={() => handleClick('9')}>9</button>
        <button onClick={() => handleClick('0')}>0</button>
        <button onClick={() => handleClick('+')}>+</button>
        <button onClick={() => handleClick('-')}>-</button>
        <button onClick={() => handleClick('*')}>*</button>
        <button onClick={() => handleClick('/')}>/</button>
        <button onClick={() => handleClick('.')}>.</button>
        <button class="equal" onClick={handleEqual}>
          =
        </button>
      </div>
    </div>
  );
};

export default Calci;
