const form = document.getElementById("calc_form");
const output = document.getElementById("output");
const operand_btns = document.querySelectorAll("button[data-type=operand]");
const operator_btns = document.querySelectorAll("button[data-type=operator]");

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

let is_operator = false;
operand_btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    remove_active();
    if (output.value == '0') {
      output.value = e.target.value;
    } else if (output.value.includes('.')) {
      output.value = output.value + '' + e.target.value.replace('.', '');
    } else if (is_operator) {
      is_operator = false;
      output.value = e.target.value;
    } else {
      output.value = output.value + '' + e.target.value;
    }
  });
});

let equation = [];
operator_btns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    remove_active();
    e.currentTarget.classList.add('active');

    switch (e.target.value) {
      case '%':
        output.value = parseFloat(output.value) / 100;
        break;
      case 'invert':
        output.value = parseFloat(output.value) * -1;
        break;
      case '=':
        equation.push(output.value);
        output.value = eval(equation.join(''));
        equation = [];
        break;
      default:
        let last_item = equation[equation.length - 1];
        if (['/', '*', '+', '-'].includes(last_item) && is_operator) {
          equation.pop();
          equation.push(e.target.value);
        } else {
          equation.push(output.value);
          equation.push(e.target.value);
        }
        is_operator = true;
        break;
    }
  })
})

const remove_active = () => {
  operator_btns.forEach( (btn) => {
    btn.classList.remove('active');
  })
}

const dayColors = [
  '#f6b26b', // sun orange
  '#000000', // mon black/white
  '#e06666', // tues red
  '#f1c232', // wed yellow
  '#6d9eeb', // thurs blue
  '#93c47d', // fri green
  '#8e7cc3' // sat purple
]
const body = document.querySelector('body');
const cal = document.querySelector('.cal');
const or = document.querySelector('.or');
const date = new Date();
// body.style.backgroundColor = dayColors[date.getDay()];
body.style.backgroundColor = dayColors[date.getDay()];
cal.style.color = dayColors[date.getDay()];
or.style.color = dayColors[date.getDay()];
