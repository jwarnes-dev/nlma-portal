
const { faker } = require('@faker-js/faker');
const fs = require('fs');
const path = require('path');

const types = ["Zoom" ]
const titles = ["Prehearing Conference", "Informational Public", "Status Conference", "Public Comment Hearing", "Evidentiary Hearing"]


const getRandomItem = (arr) =>  arr[Math.floor(Math.random() * arr.length)]

function generateFakeEvent() {
  return {
    id: faker.string.uuid(),
    title: getRandomItem(titles),
    date: faker.date.between({ from: '2024-10-01', to: '2025-03-01'}),
    location: getRandomItem(types),
    info: faker.lorem.words({ min: 10, max: 50 }),
  };
}



const items = Array.from({ length: 50 }, generateFakeEvent);

const filePath = path.join(__dirname, 'mock.events.json');
fs.writeFileSync(filePath, JSON.stringify(items, null, 2), 'utf-8');

console.log(`Items saved to ${filePath}`);


// can ane vent be associated to more than one case?