var faker = require('faker');
const fs = require('fs');

faker.locale = 'vi';

const randomInterRestRate = () => {
  const INTEREST_RATE = [2.4, 5, 8, 15, 20];
  const randomIndex = Math.trunc(Math.random() * INTEREST_RATE.length);
  return INTEREST_RATE[randomIndex];
};

const randomDebtList = (size) => {
  if (size <= 0) return [];

  const debtList = [];

  Array.from(new Array(size)).forEach(() => {
    const debt = {
      id: faker.datatype.uuid(),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      interestRate: randomInterRestRate(),
      startDate: new Date(faker.date.past()),
      endDate: new Date(faker.date.future()),
      oweMoney: faker.finance.account(),
      isComplete: faker.datatype.boolean(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    debtList.push(debt);
  });

  return debtList;
};

// IIFE
(function () {
  const debtList = randomDebtList(50);
  const db = {
    debts: {
      dataDebts: debtList,
      isFilterActive: false,
      filterDebts: [],
    },
  };
  fs.writeFile('db.json', JSON.stringify(db), () => {
    console.log('Successfully');
  });
})();
