# 🦕 Deno Todo API

A simple and modern Todo API built with Deno, Oak framework, and EJS templating.

## Features

- RESTful API endpoints for Todo management
- Server-side rendering with EJS
- In-memory data storage
- Fast and secure with Deno runtime
- TypeScript support out of the box

## Prerequisites

- [Deno](https://deno.com/) installed

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd deno-todo-api
```

No additional installation steps needed! Deno will automatically download dependencies on first run.

## Usage

### Development Mode (with auto-reload)

```bash
deno task dev
```

### Production Mode

```bash
deno task start
```

The server will start at "http://localhost:8000"

## API Endpoints

### Get All Todos
```
GET /todos
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Deno öğren",
      "completed": false
    }
  ]
}
```

### Get Single Todo
```
GET /todos/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Deno öğren",
    "completed": false
  }
}
```

### Create Todo
```
POST /todos
Content-Type: application/json

{
  "title": "New todo item"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 3,
    "title": "New todo item",
    "completed": false
  }
}
```

### Update Todo
```
PUT /todos/:id
Content-Type: application/json

{
  "title": "Updated title",
  "completed": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Updated title",
    "completed": true
  }
}
```

### Delete Todo
```
DELETE /todos/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Deleted todo",
    "completed": false
  }
}
```

## Project Structure

```
deno-todo-api/
├── main.ts           # Application entry point
├── routes.ts         # API routes and handlers
├── types.ts          # TypeScript type definitions
├── deno.json         # Deno configuration and tasks
├── public/           # Static files
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── app.js
└── views/            # EJS templates
    └── index.ejs
```

## Dependencies

- **[@oak/oak](https://jsr.io/@oak/oak)** - Web framework for Deno
- **[ejs](https://www.npmjs.com/package/ejs)** - Embedded JavaScript templating

## Technologies

- **Deno** - Secure runtime for JavaScript and TypeScript
- **Oak** - Middleware framework for Deno's HTTP server
- **TypeScript** - Typed superset of JavaScript
- **EJS** - Templating engine

## License

MIT

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
