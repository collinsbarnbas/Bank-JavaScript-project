'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Chandrabhan Bhardwaj',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2023-10-25T17:01:17.194Z',
    '2023-10-28T23:36:17.929Z',
    '2023-10-30T10:51:36.790Z',
  ],
  label: 'en-IN',
  currency: 'INR',
  pin: 1111,
};

const account2 = {
  owner: 'Abhishek Tiwari',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-10-25T14:11:59.604Z',
    '2020-10-27T17:01:17.194Z',
    '2020-10-28T23:36:17.929Z',
    '2020-10-30T10:51:36.790Z',
  ],
  label: 'en-GB',
  currency: 'GBP',
  pin: 2222,
};

const account3 = {
  owner: 'Shivam Sharma',
  movements: [200, -200, 340, -300, -20, 50, 400],
  interestRate: 0.7,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-10-25T14:11:59.604Z',
    '2020-10-27T17:01:17.194Z',
    '2020-10-28T23:36:17.929Z',
    '2020-10-30T10:51:36.790Z',
  ],
  label: 'en-US',
  currency: 'USD',
  pin: 3333,
};

const account4 = {
  owner: 'Chitranshu Mishra',
  movements: [430, 1000, 700, 50, 90, 32000, -5000, -18],
  interestRate: 1,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-10-25T14:11:59.604Z',
    '2020-10-27T17:01:17.194Z',
    '2020-10-28T23:36:17.929Z',
    '2020-10-30T10:51:36.790Z',
  ],
  label: 'en-GB',
  currency: 'EUR',
  pin: 4444,
};

const account5 = {
  owner: 'Raviraj Rajput',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-10-25T14:11:59.604Z',
  ],
  label: 'fr-CH',
  currency: 'CHF',
  pin: 5555,
};

const account6 = {
  owner: 'Rishi Diwedi',
  movements: [50000, 60000, -7000, 120000, -50000, 300, -4000],
  interestRate: 1,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-10-25T14:11:59.604Z',
    '2020-10-27T17:01:17.194Z',
    '2020-10-28T23:36:17.929Z',
    '2020-10-30T10:51:36.790Z',
  ],
  label: 'en-IN',
  currency: 'INR',
  pin: 6666,
};

const accounts = [account1, account2, account3, account4, account5, account6];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

//datefunction for today,yesterday,7days
const calDayMethord = function (date, label) {
  const clacuDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));
  const daysPassed = clacuDaysPassed(new Date(), date);
  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    // const day = `${date.getDate()}`.padStart(2,0);
    // const month = `${date.getMonth() +1}`.padStart(2,0);
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;
    return Intl.DateTimeFormat(label).format(date);

    // return new Intl.DateTimeFormat(acc.label).format(now);
  }
};

//display withdrawl and diposits and current balance
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  console.log(movs);
  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);

    //date function

    const transacDate = calDayMethord(date, acc.label);
    //currency formating

    const formattingCurrency = formatedCurrMeth(acc, mov, acc.currency);

    // new Intl.NumberFormat(acc.label,{
    //   style: 'currency',
    //   currency:acc.currency,
    // }).format(mov);

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}"> ${
      i + 1
    } ${type}</div>
      <div class="movements__date">${transacDate}</div>
      <div class="movements__value">${formattingCurrency}</div>
    </div>

  `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//currencyFormatedMethord
const formatedCurrMeth = (acc, mov, i) =>
  new Intl.NumberFormat(acc.label, {
    style: 'currency',
    currency: i,
  }).format(mov);

//calculateBalance
const displayBalanceMovements = function (acc) {
  acc.balance = acc.movements.reduce((acc, curr) => acc + curr, 0);
  const formattingCurrencyTotal = formatedCurrMeth(
    acc,
    acc.balance,
    acc.currency
  );
  labelBalance.textContent = `${formattingCurrencyTotal}`;
};

//we will calculate summary and put it on the page
const displaySummaryMove = function (accnt) {
  //display total money deposited in account
  const deposit = accnt.movements
    .filter(mov => mov > 0)
    .reduce((acc, curnt) => acc + curnt, 0);
  labelSumIn.textContent = formatedCurrMeth(accnt, deposit, accnt.currency);
  // `${deposit.toFixed(2)}₹`

  //display total money withdrawal in account
  const withdrawal = accnt.movements
    .filter(mov => mov < 0)
    .reduce((acc, curt) => acc + curt, 0);
  labelSumOut.textContent = formatedCurrMeth(
    accnt,
    Math.abs(withdrawal),
    accnt.currency
  );
  // `${Math.abs(withdrawal).toFixed(2)}₹`;

  const intrest = accnt.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * accnt.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, curt) => acc + curt, 0);
  labelSumInterest.textContent = formatedCurrMeth(
    accnt,
    intrest,
    accnt.currency
  );
  // `${intrest.toFixed(2)}₹`
};

//user name methord
const userNameAcc = 'Steven Thomas Williams';

const userNameMethord = function (nam) {
  nam.forEach(acc => {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
userNameMethord(accounts);

//TimerFunction for logining in
const setLogOutTimer = function () {
  //set time to 5min
  let time = 300;
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    //In each call print the remaining time in the UI
    labelTimer.textContent = `${min}:${sec}`;

    //if time = 0 logout thehide the UI
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Login to get started`;
      containerApp.style.opacity = 0;
    }

    //decrease the time every Itteration
    time--;
  };
  //call timer every second
  tick();
  const timer = setInterval(tick, 1000);
};

//login into account implimentation
let currentAccount, timer;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //ui and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    inputLoginUsername.blur();

    //date function
    const now = new Date();
    const options = {
      hour: 'numeric',
      minutes: 'numeric',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
    };
    // const day = `${currentDate.getDate()}`.padStart(2, 0);
    // const month = `${currentDate.getMonth() +1}`.padStart(2,0);
    // const year = currentDate.getFullYear();
    // const hour = `${currentDate.getHours()}`.padStart(2,0);
    // const minutes = `${currentDate.getMinutes()}`.padStart(2,0);
    // labelDate.textContent =`${day}/${month}/${year} ${hour}:${minutes}`;

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.label,
      options
    ).format(now);
    if (timer) clearInterval(timer);
    timer = setLogOutTimer();
    //display movements
    updateUI(currentAccount);
  }

  //console.log(currentAccount);
});

//Implementing moneyTransfer
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receverAcc = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receverAcc &&
    currentAccount.balance >= amount &&
    receverAcc?.userName !== currentAccount.userName
  ) {
    currentAccount.movements.push(-amount);
    receverAcc.movements.push(amount);

    currentAccount.movementsDates.push(new Date().toISOString());
    receverAcc.movementsDates.push(new Date().toISOString());
  }
  inputTransferAmount.blur();

  //add transfer date

  updateUI(currentAccount);

  //reset timer
  clearInterval(timer);
  timer = setLogOutTimer();
});

const updateUI = function (acc) {
  displayMovements(acc);
  displaySummaryMove(acc);
  displayBalanceMovements(acc);
};

//implimenting closse account
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.userName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    console.log(index);
    //delete account
    accounts.splice(index, 1);

    //hidding
    containerApp.style.opacity = 0;
  }
  labelWelcome.textContent = `Log in to get started`;

  inputCloseUsername.value = inputClosePin.value = '';
});

//implimenting loan

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  setTimeout(function () {
    if (
      amount > 0 &&
      currentAccount.movements.some(mov => mov >= amount * 0.1)
    ) {
      currentAccount.movements.push(amount);

      currentAccount.movementsDates.push(new Date().toISOString());

      updateUI(currentAccount);

      //reset timer
      clearInterval(timer);
      timer = setLogOutTimer();
    }
  }, 2500);

  inputLoanAmount.value = '';
});

//implimenting sortbutton
let sort = true;
btnSort.addEventListener('click', function () {
  // const sorted = ()=> {currentAccount.movements.slice().sort((a,b)=> a-b)
  // };
  !sort
    ? displayMovements(currentAccount, sort)
    : displayMovements(currentAccount, sort);
  if (!sort) sort = true;
  else sort = false;
});
