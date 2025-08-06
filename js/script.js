let wheels = [];
let wheelValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let timerInterval = 0;
let timeLeft = 0;
let timerStarted = false;

function createWheels() {
    const container = document.getElementById('lockContainer');

    for (let i = 0; i < 10; i++) {
        const wheel = document.createElement('div');
        wheel.className = 'wheel';
        wheel.setAttribute('data-wheel', i);
    }

    wheel.appendChild(wheelNumbers);
    container.appendChild(wheel);
    wheels.push({element: wheel, numbersElement: wheelNumbers, currentValue: 0});

    addWheelListeners(wheel, i);
}