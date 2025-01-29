# Todo API

A RESTful API for managing todos built with Node.js, Express, and MongoDB. Features include user authentication, CRUD operations, pagination, search functionality, and UUID-based identification.

## Features

- 🔐 User authentication using JWT
- 📝 CRUD operations for todos
- 🔍 Search functionality
- 📄 Pagination support
- 🆔 UUID-based identification
- ⚡ Rate limiting
- 📚 API documentation with Swagger
- ✅ Input validation
- 🛡️ Error handling

## Prerequisites

- Node.js (v14+ recommended)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/todo-api.git
cd todo-api
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
 Create a `.env` file in the root directory:

```bash
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=your_port
```
For MONGO_URI, you can use the following URI:

```bash
mongodb://localhost:27017/todo-api
```
For JWT_SECRET, you can use any string. 
For PORT, you can use any port number.

4. Start the server:

```bash
npm start
```

5. Access the API documentation:

Open your browser and navigate to `http://localhost:3000/api-docs`.


## API Endpoints

### Authentication

#### Register a new user

```bash
http
POST /api/auth/register
Content-Type: application/json
{
"email": "user@example.com",
"password": "password123"
}
```

#### Login

```bash
http
POST /api/auth/login
Content-Type: application/json
{
"email": "user@example.com",
"password": "password123"
}
```


### Todos

#### Get all todos (with pagination and search)

```bash
http
GET /api/todos?page=1&limit=10&search=keyword
Authorization: Bearer <your_token>
```


#### Get a specific todo

```bash
http
GET /api/todos/:id
Authorization: Bearer <your_token>
```


#### Create a new todo

```bash
http
POST /api/todos
Authorization: Bearer <your_token>
Content-Type: application/json
{
"title": "New Todo",
"description": "This is a new todo"
}
```

#### Update a todo

```bash
http
PUT /api/todos/:id
Authorization: Bearer <your_token>
Content-Type: application/json
{
"title": "Updated Todo",
"description": "This is an updated todo"
}
```

#### Delete a todo

```bash
http
DELETE /api/todos/:id
Authorization: Bearer <your_token>
```


## Response Examples

### Success Response

```json
HTTP/1.1 200 OK
Content-Type: application/json
{
    "message": "Todo created successfully",
    "data": {
        ""id": "123e4567-e89b-12d3-a456-426614174000",
        "title": "Complete project",
        "description": "Finish the todo API implementation",
        "completed": false,
        "createdAt": "2024-03-14T12:00:00.000Z"
    }
}
```

### Error Response

```json
HTTP/1.1 400 Bad Request
Content-Type: application/json
{
    "message": "Invalid todo ID format"
}
```

## Pagination Response

```json
{
"todos": [...],
"currentPage": 1,
"totalPages": 5,
"totalItems": 48
}
```


## API Documentation

API documentation is available at `/api-docs` when the server is running. You can explore and test the API endpoints using the Swagger UI interface.

## Rate Limiting

The API implements rate limiting with the following defaults:
- 100 requests per 15 minutes per IP address

## Validation

Input validation is implemented for:
- Email format for registration
- Password minimum length (6 characters)
- Todo title (required, 1-100 characters)
- Todo description (optional, max 500 characters)

## Error Handling

The API implements proper error handling for:
- Invalid requests
- Authentication errors
- Database errors
- Validation errors
- Rate limiting errors

## Security Features

- JWT authentication
- Password hashing using bcrypt
- Rate limiting
- Input validation
- UUID for todo IDs

## Development

To run the server in development mode with nodemon:

```bash
npm run dev
```

This will start the server with nodemon, which will automatically restart the server when you make changes to the code.

## Testing

To run the tests:

```bash
npm test
```

This will run the tests using Jest and Supertest.


## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author
Sunny Patel
- GitHub: [@sunnythepatel](https://github.com/sunnythepatel)

## Acknowledgments

- Express.js
- MongoDB
- JWT
- UUID