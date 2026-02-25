import { Stack } from './stackImplement.ts'

function evaluateExpression(expression: string): number | undefined {
    const numStack = new Stack<number>();
    const opStack = new Stack<string>();

    // reference for precedence of operations
    const precedence: Record<string, number> = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
    };

    /**
     * applyOperator function takes the top two numbers from the numStack stack and the top operator from the opStack stack and evaluates it.
     * 
     * @returns evaluated number
     */
    function applyOperator() {
        const b = numStack.pop();
        const a = numStack.pop();
        const op = opStack.pop();

        if (typeof a !== 'number' || typeof b !== 'number' || typeof op !== 'string') return false;

        switch(op) {
            case '+': numStack.push(a + b); break;
            case '-': numStack.push(a - b); break;
            case '*': numStack.push(a * b); break;
            case '/': numStack.push(a / b); break;
        }
        return true;
    }

    const tokens = expression.split(' ');

    for (const token of tokens) {
        if (token.trim() !== '' && !isNaN(Number(token))) {
            numStack.push(Number(token));
        } else if (token === '(') {
            opStack.push(token);
        } else if (token === ')') {
            while (opStack.top() !== '(' && opStack.top() !== 'Stack is empty') {
                if (!applyOperator()) return undefined;
            }
            opStack.pop();

        } else if (token in precedence) {
            while (
                opStack.top() !== null &&
                opStack.top() !== '(' &&
                precedence[opStack.top() as string] >= precedence[token]
            ) {
                if (!applyOperator()) return undefined;
            }
            opStack.push(token);

        } else {
            return undefined;
        }
    }

    while (opStack.top() !== null) {
        if (!applyOperator()) return undefined;
    }

    const result = numStack.pop();
    return typeof result === 'number' ? result : undefined;
}

export { evaluateExpression }