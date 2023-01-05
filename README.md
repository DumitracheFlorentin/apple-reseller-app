# AppStore

## Usage

### Env Variables

add .env file in then root and add the following

```
PORT = xxxx ( e.g 5000 )
PROJECT_TYPE = xxxx ( You have to choose between 'production' and 'development' )
MONGO_URI = YOUR_MONGO_URI
JWT_SECRET = YOUR_JWT_SECRET
```

### Install Dependencies

```
npm install
```

### Run The Application

#### Run backend + frontend
```
npm run dev 
```

#### Run backend
```
npm run server 
```

#### Run frontend
```
npm run client
```

## Streams

### Register
- Navbar -> Sign Up -> Register Page

### Auth
- Navbar -> Log In -> Login Page
- Add product to cart / favorite -> Modal Login
- If user has JWT in local storage -> Login without login page -> Main Page

### Cart
- Products Page -> Add product to cart -> Cart Page
- Product Page -> Add product to cart -> Cart Page
- Main Page -> Add product to cart -> Cart Page
- Navbar -> Cart btn -> Cart Page

### Modify user info
- Client Page
- Forgot / Change password

### Administrator
- Navbar -> Dashboard

### Review
Main Page -> Products Page -> Product Page -> Put review

## APIs

- path: api/v1/...

### Client

- GET: api/v1/users             // get users

- GET: api/v1/users/:id         // get user

- POST: api/v1/users/register   // register user

- POST: api/v1/users/auth       // auth user

- POST: api/v1/users/:id        // change user data (e.g password, cart and so on..)

- DELETE: api/v1/users/:id      // delete user

### Product

- GET: api/v1/products             // get products

- GET: api/v1/products/:id         // get product

- POST: api/v1/products/register   // register product

- POST: api/v1/products/:id        // change product data (e.g stock)

- DELETE: api/v1/products/:id      // delete product