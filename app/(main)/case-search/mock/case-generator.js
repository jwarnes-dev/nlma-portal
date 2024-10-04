// Utility program to generate fake case data

const { faker } = require('@faker-js/faker');
const fs = require('fs');

const statuses = ["Open", "Completed", "Cancelled", "Hold", "In Progress", "Archive"];
const types = [
    "Civil Claim Filing", "Hearing", "Personal Matter", 
    "Prehearing Conference", "Settlement Conference", 
    "Status Conference", "Trial"
];


function generateCaseNumber() {
    return 'C' + Math.floor(100000 + Math.random() * 900000);
}


function generateCaseData() {
    const caseNumber = generateCaseNumber();
    const caseType = types[Math.floor(Math.random() * types.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    

    const dateFiled = faker.date.between({from: '2019-01-01', to: '2023-12-31'});
    const statusDate = new Date(dateFiled);
    statusDate.setDate(statusDate.getDate() + faker.number.int({ min: 30, max: 365 }));

    return {
        title: `State of ${faker.location.state()} v. ${faker.person.lastName()}`,
        case: caseNumber,
        type: caseType,
        dateFiled: dateFiled.toISOString().split('T')[0],
        status: status,
        statusDate: statusDate.toISOString().split('T')[0],
        parties: {
            appellant: faker.person.fullName(),
            respondant: `State of ${faker.location.state()}`
        }
    };
}


const casesData = [];
for (let i = 0; i < 100; i++) {
    casesData.push(generateCaseData());
}

fs.writeFile('casesData.json', JSON.stringify(casesData, null, 2), (err) => {
    if (err) throw err;
    console.log(`${casesData.length} rows have been saved to casesData.json`);
});