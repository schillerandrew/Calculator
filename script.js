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
  operator_btns.forEach((btn) => {
    btn.classList.remove('active');
  })
}

const toggleMenu = () => {
  let menu = document.getElementById("menu");
  // let menuButton = document.getElementById("menuButton");
  if (menu.className === "menuOff") {
    menu.className = "menuOn";
    // menuButton.value = 'x';
  }
  else {
    menu.className = "menuOff";
    // menuButton.value = '+';
  }
}

const dayColors = [
  '#8C2500', // sun orange
  '#696969', // mon black/white
  '#CC5C5C', // tues red
  '#CCAD00', // wed yellow
  '#186FC7', // thurs blue
  '#72BA72', // fri green
  '#663399' // sat purple
]

const borderColors = [
  '#FF4500', // sun orange
  '#000000', // mon black/white
  '#FF0000', // tues red
  '#FFE44D', // wed yellow
  '#00BFFF', // thurs blue
  '#4AF04A', // fri green
  '#994CE5' // sat purple
]

const operatorColors = [
  '#401F13', // sun orange
  '#434343', // mon black/white
  '#803939', // tues red
  '#807226', // wed yellow
  '#33577A', // thurs blue#33577A
  '#226E22', // fri green
  '#442266' // sat purple
]

const operandColors = [
  '#CA623D', // sun orange
  '#696969', // mon black/white
  '#FF7373', // tues red
  '#FFD700', // wed yellow
  '#1E8CFA', // thurs blue
  '#90EE90', // fri green
  '#BB91E5' // sat purple
]

const miscColors = [
  '#BF3300', // sun orange
  '#C0C0C0', // mon black/white
  '#FFBFBF', // tues red
  '#DAA520', // wed yellow
  '#69B2FB', // thurs blue
  '#436E43', // fri green
  '#8B6BAA' // sat purple
]

let i = 0;
const body = document.querySelector('body');
// const cal = document.querySelector('.cal');
// const or = document.querySelector('.or');
const main = document.querySelector('#main');
const operators = document.querySelectorAll('.btn-operator');
const operands = document.querySelectorAll('.btn-operand');
const misc = document.querySelectorAll('.btn-misc');
const date = new Date();
// body.style.backgroundColor = dayColors[date.getDay()];
if (date.getDay() == 1) {
  body.style.backgroundColor = '#696969';
} else {
  body.style.backgroundColor = dayColors[date.getDay()];
}
// cal.style.color = dayColors[date.getDay()]; // "cal"
// or.style.color = dayColors[date.getDay()]; // "or"
main.style.borderColor = borderColors[date.getDay()]; // calculator border
console.log(operators);
for (i = 0; i < operators.length; i++) {
  operators[i].style.backgroundColor = operatorColors[date.getDay()];
}
for (i = 0; i < operands.length; i++) {
  operands[i].style.backgroundColor = operandColors[date.getDay()];
}
for (i = 0; i < misc.length; i++) {
  misc[i].style.backgroundColor = miscColors[date.getDay()];
}

// insert into brackets above >>> date.getDay()

//// for testing colors
i = 0;
const changeColor = () => {
  if (i == 7) {
    i = 0;
  }
  body.style.backgroundColor = dayColors[i];
  cal.style.color = dayColors[i];
  or.style.color = dayColors[i];
  main.style.borderColor = borderColors[i];
  i++;
  console.log(i);
}
// setInterval(changeColor, 3000);