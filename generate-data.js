var faker = require('faker');
const fs = require('fs');

faker.locale = 'vi';

const randomInterRestRate = () => {
  const INTEREST_RATE = [2.4, 5, 8, 15, 20];
  const randomIndex = Math.trunc(Math.random() * INTEREST_RATE.length);
  return INTEREST_RATE[randomIndex];
};

const getDiffDays = (startDate, endDate) => {
  if (startDate !== null && endDate !== null) {
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    let diffInTime = endDate.getTime() - startDate.getTime();
    return diffInTime / (1000 * 3600 * 24);
  }
};

const getLiabilities = (oweMoney, interestPercent, startDate, endDate) => {
  if (oweMoney && interestPercent && startDate && endDate) {
    parseFloat((interestPercent = interestPercent / 100));
    const diffDays = getDiffDays(startDate, endDate);
    return +oweMoney + +oweMoney * diffDays * interestPercent;
  }
};

const randomDebtList = (size) => {
  if (size <= 0) return [];

  const debtList = [];

  Array.from(new Array(size)).forEach(() => {
    const debt = {
      id: faker.datatype.uuid(),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      interestRate: randomInterRestRate(),
      startDate: faker.date.past(),
      endDate: faker.date.future(),
      oweMoney: faker.finance.account(),
      isComplete: faker.datatype.boolean(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const liabilities = getLiabilities(
      debt.oweMoney,
      debt.interestRate,
      debt.startDate,
      debt.endDate
    );
    console.log(typeof debt.startDate);
    const newDebt = { ...debt, liabilities };
    debtList.push(newDebt);
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
