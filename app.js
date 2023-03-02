alert('You have 10 guesses. Red means correct number and position. Blue means correct number only. The solution is printed to the console.');

const form = document.createElement('form');
const random = document.createElement('button');
const results = document.createElement('div');
const set = document.createElement('input');
const start = document.createElement('button');
const submit = document.createElement('input');
let counter = 1;
let solution;

random.innerHTML = 'Randomize';
set.classList.add('user');
set.setAttribute('maxlength', 4);
set.setAttribute('pattern', '[0-9]{4}');
set.setAttribute('placeholder', '####');
set.setAttribute('type', 'text');
start.innerHTML = 'Start';
submit.setAttribute('type', 'submit');
submit.setAttribute('value', 'try');
submit.style.display = 'none';

document.body.append(set);
document.body.append(start);
document.body.append(random);
document.body.append(form);

for (let i = 1; i <= 4; ++i) {
    const box = document.createElement('input');
    box.setAttribute('id', `guess${i}`);
    box.setAttribute('type', 'number');
    box.setAttribute('min', 0);
    box.setAttribute('max', 9);
    box.setAttribute('value', `${i}`);
    form.append(box);
}

form.append(submit, results);

start.addEventListener('click', () => {
    if (set.value.search(/\d{4}/) !== -1) {
        random.setAttribute('disabled', 'true');
        set.style.display = 'none';
        start.setAttribute('disabled', 'true');
        submit.style.display = 'inline-block';

        solution = set.value.split('').map(e => Number(e));
        console.log(`Solution: ${solution}`);
    }
});

random.addEventListener('click', () => {
    const randomize = [
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
    ];

    set.value = randomize.join('');
});

submit.addEventListener('click', e => {
    const checker = [...solution];
    const guess1 = document.querySelector('#guess1').value;
    const guess2 = document.querySelector('#guess2').value;
    const guess3 = document.querySelector('#guess3').value;
    const guess4 = document.querySelector('#guess4').value;
    const guesses = [parseInt(guess1), parseInt(guess2), parseInt(guess3), parseInt(guess4)];
    let red = 0;
    let blue = 0;

    if (guess1 < 10 && guess2 < 10 && guess3 < 10 && guess4 < 10) {
        e.preventDefault();
        results.innerHTML += `Guess ${counter.toString().padStart(2, 0)} - ${guesses}`;
        counter++;
    } else {
        return;
    }

    for (let i = 0; i < 4; ++i) {
        if (guesses[i] === checker[i]) {
            checker[i] = null;
            guesses[i] = null;
            red++;
        }
    }

    for (let i = 0; i < 4; ++i) {
        if (guesses[i] !== null && checker.indexOf(guesses[i]) !== -1) {
            checker[checker.indexOf(guesses[i])] = null;
            guesses[i] = null;
            blue++;
        }
    }

    results.innerHTML += ` - <span style="color:red;">${red} Red</span>`;
    results.innerHTML += ` <span style="color:blue;">${blue} Blue</span><br>`;

    if (red === 4) {
        alert(`You are a ${--counter} move MASTERMIND! Refresh to play again!`);
        results.innerHTML += 'Won';
        submit.style.display = 'none';
        return;
    }

    if (counter === 11) {
        alert(`You are out of guesses. The solution is ${solution}. Refresh to play again!`);
        results.innerHTML += 'Lost';
        submit.style.display = 'none';
    }

    return [red, blue];
});
