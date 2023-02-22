let main = document.querySelector('#main')

let addUser = document.querySelector('#add-user')
let ul = document.createElement('ul')

let double = document.querySelector('#double')

let showMillionaires = document.querySelector('#show-millionaires')

let sort = document.querySelector('#sort')

let calculateWealth = document.querySelector('#calculate-wealth')

let data = []


function addData(obj) {
    data.push(obj);
    updateDOM()
}
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

function updateDOM(providedData = data) {
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
            item.money
        )}`
        main.appendChild(element)

    })
}

addUser.addEventListener('click', async function () {
    const res = await fetch('https://randomuser.me/api')
    const data = await res.json();
    console.log(data);
    const user = data.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }
    addData(newUser)
    updateDOM()
})

double.addEventListener('click', function () {
    data = data.map(user => {
        return { ...user, money: user.money * 2 }
    })
    updateDOM()
})

showMillionaires.addEventListener('click', function () {
    data = data.filter(user => user.money > 1000000)
    updateDOM()
})


sort.addEventListener('click', function () {
    data = data.sort((a, b) => b.money - a.money)
    updateDOM()
})

calculateWealth.addEventListener('click', function () {
    let wealth = 0;
    for (let i = 0; i < data.length; i++) {
        wealth = wealth + data[i].money
    }
    let wealthEl = document.createElement('div')
    wealthEl.innerHTML = `
    <h3>Total Wealth: <strong>${formatMoney(
        wealth
    )}</strong></h3>`;
    main.appendChild(wealthEl)

})


