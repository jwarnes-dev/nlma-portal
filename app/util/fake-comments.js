
const { faker } = require('@faker-js/faker');
const fs = require('fs');
const path = require('path');

function generateFakeComment() {
  return {
    fname: faker.person.firstName(),
    lname: faker.person.lastName(),
    text: faker.lorem.words({ min: 10, max: 50 }),
    email: faker.internet.email(),
    town: faker.location.city(),
    date: faker.date.between({ from: '2022-01-01', to: new Date().toISOString()}),
    id: faker.string.uuid()
  };
}


const numberOfComments = 50;
const comments = Array.from({ length: numberOfComments }, generateFakeComment);

const filePath = path.join(__dirname, 'mock.comments.json');
fs.writeFileSync(filePath, JSON.stringify(comments, null, 2), 'utf-8');

console.log(`Comments saved to ${filePath}`);