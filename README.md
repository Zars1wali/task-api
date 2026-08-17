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

## AI vs Me — Stage 7

### My Prompt

> Build a CRUD API for managing to-do tasks using Node.js and Express on port 3000. The API should have these endpoints: GET /tasks (list all), GET /tasks/:id (get one), POST /tasks (create, returns 201), PUT /tasks/:id (update), DELETE /tasks/:id (returns 204). Each task has id, title, and done fields. Validate input — if title is missing or empty, return 400. If a task ID doesn't exist, return 404 with a JSON error message. Use an in-memory array, pre-filled with 3 example tasks. Include a GET / endpoint returning API info and a GET /health endpoint.

### What the AI Did Better

- Cleaner destructuring in POST handler: `const { title } = req.body` instead of `req.body.title`
- Added inline comments above each route (// Get all tasks, // Create a new task, etc.)
- Used `completed` instead of `done` — arguably a clearer field name

### What the AI Got Wrong or Ignored

1. **Missing `/` and `/health` endpoints** — I explicitly asked for them in the prompt, but the AI silently dropped them
2. **No Swagger UI** — completely omitted even though it was part of the assignment context
3. **No title validation on PUT** — `task.title = req.body.title || task.title` allows empty strings through; sending `{"title": ""}` sets the title to `""` instead of rejecting it
4. **No title trimming** — whitespace-only titles like `"  "` pass validation
5. **Wrong error JSON key** — uses `{ message: "..." }` instead of `{ error: "..." }`, inconsistent with common API conventions
6. **Field name mismatch** — uses `completed` instead of `done`, which breaks any client expecting the spec's field names
7. **No input validation on PUT body** — accepts any garbage without checking if title is empty string

### What My Prompt Forgot to Specify

- Didn't specify the exact JSON error key (`error` vs `message`) — the AI chose `message`
- Didn't specify that title should be trimmed — the AI didn't trim
- Didn't emphasize that PUT must also validate empty titles — the AI skipped it
- Didn't specify the exact field name should be `done` not `completed` — the AI chose its own convention

### One Sentence Summary

> The AI produces clean, readable code but silently drops requirements it considers "次要" and makes its own design choices when the prompt is even slightly ambiguous — you must specify every detail or accept its defaults.
