const express = require("express");
const app = express();
const employees = require("./models/employees");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1 style='text-align:center'>The Api is working :)<h1>");
});

app.get("/api/employees", (req, res) => {
  if (req.query.user) {
    const userEmployees = employees.filter(
      (employee) => employee.privileges === "user"
    );
    res.json(userEmployees);
  } else if (req.query.page) {
    const page = parseInt(req.query.page);
    const limit = 2;
    const start = 2 * (page - 1);
    const end = start + limit;

    const results = employees.slice(start, end);

    res.json(results);
  } else if (req.query.badges) {
    const badgeEmployees = employees.filter(
      (employee) =>
        employee.badges && employee.badges.includes(req.query.badges)
    );
    res.json(badgeEmployees);
  } else {
    res.json(employees);
  }
});

app.get("/api/employees/oldest", (req, res) => {
  let oldestEmployee = employees[0];

  for (let i = 1; i < employees.length; i++) {
    if (employees[i].age > oldestEmployee.age) {
      oldestEmployee = employees[i];
    }
  }

  res.json(oldestEmployee);
});

app.get("/api/employees/:name", (req, res) => {
  const name = req.params.name;
  const employee = employees.find((employee) => employee.name === name);

  if (!employee) {
    return res.status(404).json({ code: "not_found" });
  }

  res.json(employee);
});

app.post("/api/employees", (req, res) => {
  const newEmployee = req.body;
  if (
    !newEmployee.name ||
    !newEmployee.age ||
    !newEmployee.phone ||
    !newEmployee.badges
  ) {
    return res.status(400).json({ code: "bad_request" });
  }
  employees.push(newEmployee);
  res.json(newEmployee);
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
