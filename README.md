User Management API
This project is a simple Express.js application providing RESTful APIs for managing users. It includes routes for retrieving, updating, deleting, and creating users. The user data is stored in a JSON file named MOCK_DATA.json.

Installation
To run this project locally, follow these steps:

Clone this repository to your local machine.
Navigate to the project directory in your terminal.
Install the dependencies by running npm install.
Start the server by running node app.js.
The server will start on port 8000.
Routes
GET /users: Returns an HTML list of all users' first names.
GET /api/users: Returns a JSON array of all users.
GET /api/users/:id: Returns the user with the specified ID.
PATCH /api/users/:id: Updates the user with the specified ID.
DELETE /api/users/:id: Deletes the user with the specified ID.
POST /api/users: Creates a new user.
Usage
Retrieving Users
To retrieve all users, send a GET request to /api/users. To retrieve a specific user, send a GET request to /api/users/:id, replacing :id with the user's ID.

Updating Users
To update a user's information, send a PATCH request to /api/users/:id with the updated data in the request body.

Deleting Users
To delete a user, send a DELETE request to /api/users/:id, replacing :id with the ID of the user to be deleted.

Creating Users
To create a new user, send a POST request to /api/users with the user's information in the request body.

Data Format
The user data is stored in a JSON file named MOCK_DATA.json. Each user object has the following properties:

id: The unique identifier for the user.
first_name: The user's first name.
last_name: The user's last name.
email: The user's email address.
gender: The user's gender.
ip_address: The user's IP address.
Dependencies
This project uses the following dependencies:

express: For building the RESTful API.
fs: For interacting with the file system to read and write user data.
