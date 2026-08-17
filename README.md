# Task API

A simple CRUD API for managing to-do tasks, built with Node.js and Express.

## How to Install & Run

```bash
npm install
node server.js
```

The server starts on `http://localhost:3000`. Swagger UI is available at `http://localhost:3000/docs`.

## Endpoints

| Method | Endpoint | Description | Status Codes |
|--------|----------|-------------|-------------|
| GET | `/` | API info (name, version, endpoints) | 200 |
| GET | `/health` | Health check | 200 |
| GET | `/tasks` | List all tasks | 200 |
| GET | `/tasks/:id` | Get a single task by ID | 200, 404 |
| POST | `/tasks` | Create a new task | 201, 400 |
| PUT | `/tasks/:id` | Update a task's title and/or done status | 200, 400, 404 |
| DELETE | `/tasks/:id` | Delete a task | 204, 404 |

## Example curl Output

```
$ curl -i http://localhost:3000/tasks/1

HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8

{"id":1,"title":"Buy groceries","done":false}
```

## Swagger UI

Open `http://localhost:3000/docs` in your browser. Use the "Try it out" button to test the full CRUD cycle interactively.
