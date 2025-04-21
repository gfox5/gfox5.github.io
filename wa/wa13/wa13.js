// Problem 1
console.log("Problem 1");
const employees = [
    {
        firstName: "Sam",
        department: "Tech",
        designation: "Manager",
        salary: 40000,
        raiseEligible: true
    },
    {
        firstName: "Mary",
        department: "Finance",
        designation: "Trainee",
        salary: 18500,
        raiseEligible: true
    },
    {
        firstName: "Bill",
        department: "HR",
        designation: "Executive",
        salary: 21200,
        raiseEligible: false
    }
];
console.log(employees);

// Problem 2
console.log("Problem 2");
const company = {
    companyName: "Tech Stars",
    website: "www.techstars.site",
    employees: employees
};
console.log(company);

// Problem 3
console.log("Problem 3");
const newEmployee = {
    firstName: "Anna",
    department: "Tech",
    designation: "Executive",
    salary: 25600,
    raiseEligible: false
};
company.employees.push(newEmployee);
console.log(company);

// Problem 4
console.log("Problem 4");
const totalSalary = company.employees.reduce((sum, employee) => sum + employee.salary, 0);
console.log(`Total Salary: $${totalSalary}`);

// Problem 5
console.log("Problem 5");
function processRaises(companyData) {
    companyData.employees.forEach(employee => {
        if (employee.raiseEligible) {
            employee.salary = employee.salary * 1.1;
            employee.raiseEligible = false;
        }
    });
    return companyData;
}

const updatedCompany = processRaises(company);
console.log(updatedCompany);

// Problem 6
console.log("Problem 6");
const workingFromHome = ['Anna', 'Sam'];

company.employees.forEach(employee => {
    employee.wfh = workingFromHome.includes(employee.firstName);
});

console.log(company);