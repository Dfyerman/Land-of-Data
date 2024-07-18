SELECT e.first_name, e.last_name, r.title
FROM employee e
JOIN roles r ON e.role_id = r.id;