# ATTS Jewellery Assessment

## Run the project

1. Clone the repo using git

```sh
git clone https://github.com/GokilaSundar/atts-jewellery-assessment.git
```

2. Open terminal within the cloned project & install node modules

```sh
cd client
npm install
cd ../server
npm install
```

3. Add `.env` with following content in server folder

```dotenv
# URI to connect to mongodb. From local or MongoDB atlas
MONGO_URI=

# Secret for signing JWT
JWT_SECRET=SomeSecret#123
```

3. Run the server

```sh
npm run dev
```

4. Run the client in seperate terminal

```sh
cd client
npm run dev
```

5. Access frontend from the url shown by vite. Defaults to `http://localhost:5173`
