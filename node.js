const { Client } = require('pg');

const inquirer = require('inquirer');
//console.table




// Create a new PostgreSQL client
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'employees_db',
  password: 'dfyerman',
  port: 5432, // Default PostgreSQL port is 5432
});

// Connect to the PostgreSQL database
client.connect();

// Function to retrieve all departments
async function getAllDepartments() {
  try {
    const result = await client.query('SELECT * FROM department');
    console.table(result.rows); // Display the results in a table format
  } catch (error) {
    console.error('Error executing query:', error);
  } 
}

async function getAllEmployees() {
  try {
    const result = await client.query('SELECT * FROM employee');
    console.table(result.rows); // Display the results in a table format
  } catch (error) {
    console.error('Error executing query:', error);
  } 
}

async function updateEmployeeRole() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'employeeId',
      message: 'Enter the ID of the employee you want to update:'
    },
    {
      type: 'input',
      name: 'newRoleId',
      message: 'Enter the new role ID for the employee:',
    }
  ]);

  const employeeId = answers.employeeId;
  const newRoleId = answers.newRoleId;

  try {
    const query = {
      text: 'UPDATE employee SET role_id = $1 WHERE id = $2',
      values: [newRoleId, employeeId],
    }
    await client.query(query);
    console.log('Employee role updated succesfully!');
  } catch (error) {
    console.log('Error updating employee role:', error)
  }
}

async function getAllRoles() {
  try {
    const result = await client.query('SELECT * FROM roles');
    console.table(result.rows); // Display the results in a table format
  } catch (error) {
    console.error('Error executing query:', error);
  } 
}

async function addDepartment() {
  try {
    const department = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the new department',
      }
    ]);
    const result = await client.query('INSERT INTO department (name) VALUES ($1) RETURNING *', [department.name]);
    console.log('New Department Added:');
    console.table(result.rows);
  } catch (error) {
    console.error('Error adding department:', error);
  } 
}

async function deleteDepartment() {
  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'departmentId',
      message: 'Enter the ID of the department you want to delete:',
    }
  ]);

  const departmentId = answer.departmentId;

  try {
    // Delete the department
    const deleteDepartmentQuery = {
      text: 'DELETE FROM department WHERE id = $1',
      values: [departmentId],
    };
    await client.query(deleteDepartmentQuery);

    // Delete associated employees
    const deleteEmployeesQuery = {
      text: 'DELETE FROM employee WHERE id = $1',
      values: [departmentId],
    };
    await client.query(deleteEmployeesQuery);

    // Delete associated roles
    const deleteRolesQuery = {
      text: 'DELETE FROM roles WHERE id = $1',
      values: [departmentId],
    };
    await client.query(deleteRolesQuery);

    console.log('Department, associated roles, and employees deleted successfully');
  } catch (error) {
    console.error('Error deleting department:', error);
  }
}

async function addRole() {
  try {
    const roleDetails = await inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter the title of the new role:',
      },
      {
        type: 'number',
        name: 'salary',
        message: 'Enter the salary of the new role:',
      },
      {
        type: 'number',
        name: 'department_id',
        message: 'Enter the department ID of the new role:',
      }
    ]);

    const { title, salary, department_id } = roleDetails;

    const result = await client.query('INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *', [title, salary, department_id]);
    console.log('New Role Added:');
    console.table(result.rows);
  } catch (error) {
    console.error('Error adding role:', error);
  } 
}


async function addEmployee() {
  try {
    const employeeDetails = await inquirer.prompt([
      {
        type: 'input',
        name: 'first_name',
        message: "Enter the employee's first name:",
      },
      {
        type: 'input',
        name: 'last_name',
        message: "Enter the employee's last name:",
      },
      {
        type: 'number',
        name: 'role_id',
        message: "Enter the employee's role ID",
      },
      {
        type: 'number',
        name: 'manager_id',
        message: "Enter the employee's manager ID",
      },
    ]);

    const { first_name, last_name, role_id, manager_id } = employeeDetails;

    const result = await client.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *', [first_name, last_name, role_id, manager_id]);
    console.log('New Employee Added:');
    console.table(result.rows);
  } catch (error) {
    console.error('Error adding employee:', error);
  } 
}


// Route to trigger the Inquirer prompt for viewing all departments
  
function inquirerPrompt() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Select an action:',
        choices: ['View all departments','View all employees','View all roles', 'Add department', 'Delete department', 'Add role', 'Add employee', 'Update employee role'],
      },
    ])
    .then(async (answers) => {
      switch (answers.action) {
        case 'View all departments':
        await getAllDepartments();
        break;
        case 'View all employees':
        await getAllEmployees();
        break;
        case 'View all roles':
        await getAllRoles();
        break;
        case 'Add department':
        await addDepartment();
        break;
        case 'Delete department':
        await deleteDepartment();
        break;
        case 'Add role':
        await addRole();
        break;
        case 'Add employee':
        await addEmployee();
        break;
        case 'Update employee role':
        await updateEmployeeRole();
        break;
        default :
          console.log('Selected action is not supported just yet');
      }
      inquirerPrompt();
    })
    
    .catch((error) => {
      console.error('Error with Inquirer prompt:', error);
    });
}

inquirerPrompt();