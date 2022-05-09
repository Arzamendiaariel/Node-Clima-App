const inquirer = require('inquirer');
require('colors');

const questions = [
  {
    type: 'list',
    name: 'option',
    message: 'What do you want to do?',
    choices: [
      {
        value: 1,
        name: `${'1.'.cyan} Search City `,
      },
      {
        value: 2,
        name: `${'2.'.cyan} Record`,
      },
      {
        value: 0,
        name: `${'0.'.cyan} Exit`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log('================================'.green);
  console.log('        Select an Option'.red);
  console.log('================================\n'.green);

  const { option } = await inquirer.prompt(questions);
  return option;
};

const pause = async () => {
  const question = [
    {
      type: 'input',
      name: 'enter',
      message: `Press ${'ENTER'.rainbow} to continue`,
    },
  ];
  console.log('\n');
  await inquirer.prompt(question);
};

const readInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Please type a message';
        }
        return true;
      },
    },
  ];
  const { desc } = await inquirer.prompt(question);
  return desc;
};

const placesList = async (places = []) => {
  const choices = places.map((place, i) => {
    const idx = `${i + 1}.`.green;

    return {
      value: place.id,
      name: `${idx} ${place.name}`,
    };
  });
  choices.unshift({
    value: '0',
    name: '0'.green + 'Cancel',
  });
  const questions = [
    {
      type: 'list',
      name: 'id',
      message: 'Select Place',
      choices,
    },
  ];
  const { id } = await inquirer.prompt(questions);
  return id;
};

const confirm = async (message) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message,
    },
  ];
  const { ok } = await inquirer.prompt(question);
  return ok;
};

const showChecklist = async (toDos = []) => {
  const choices = toDos.map((toDo, i) => {
    const idx = `${i + 1}.`.green;

    return {
      value: toDo.id,
      name: `${idx} ${toDo.desc}`,
      checked: toDo.completedIn ? true : false,
    };
  });

  const question = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Select',
      choices,
    },
  ];
  const { ids } = await inquirer.prompt(question);
  return ids;
};

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  placesList,
  confirm,
  showChecklist,
};
