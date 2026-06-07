# Node.js Express Boilerplate

A production-ready REST API boilerplate built (for my freeelancing journey) with Node.js, Express, and MongoDB. Designed to be cloned and extended for any project(for my freeelancing journey).

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express
- **Database**: MongoDB + Mongoose
- **Auth**: JWT + Bcrypt
- **Validation**: Zod
- **Security**: Helmet, CORS, Rate Limiting

## Features

- JWT authentication with protected routes
- Role-based access control (user/admin)
- Request validation with Zod
- Centralized error handling
- Rate limiting on auth routes
- Password hashing with Bcrypt
- Environment-based configuration
- Admin seeding script

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB instance (local or Atlas)

### Installation

```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
PORT=5000
MONGODB_URL=your_mongodb_url
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@admin.com
ADMIN_PASSWORD=yourpassword
```

### Seed First Admin

```bash
node seed.js
```

### Run

```bash
# development
npm run dev

# production
npm start
```

## API Endpoints

### Auth
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | /api/users/create | Public |
| POST | /api/users/login | Public |

### Users
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | /api/users/fetch | Admin |
| PUT | /api/users/update/:id | Protected |
| DELETE | /api/users/delete/:id | Admin |
| PUT | /api/users/make-admin/:id | Admin |

## Project Structure