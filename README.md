
# Introduction
This app builds a secure and scalable RESTful API that allows users to create, read, update, and delete notes. The application  also allow users to share their notes with other users and search for notes based on keywords.



## API endpoints

### Authentication Endpoints

- POST /api/v1/signup: create a new user account.
- POST /api/v1/login: log in to an existing user account and receive an access token.
### Note Endpoints
- GET /api/v1/getNotes: get a list of all notes for the authenticated user.
- GET /api/v1/getNotes/:id get a note by ID for the authenticated user.
- POST /api/v1/createNewNote: create a new note for the authenticated user.
- PUT /api/v1/updateNote/:id update an existing note by ID for the authenticated user.
- DELETE /api/v1/deleteNote/:id delete a note by ID for the authenticated user.
- POST /api/v1/share/:id: share a note with another user for the authenticated user.
- GET /api/v1/search?keyword=xyz: search for notes based on keywords for the authenticated user. 




## TechStack used

- Database- MongoDB
- Framework- expressJs
- Authentication and Authorization: JWT (JSON Web Tokens)
- Testing: Jest for Node.js,Postman
- Deployement: AWS (includes Dockerfile and Docker-compose.yml)
- Version Control: Git
## Run the code 

### Locally
- git clone <-repoUrl->
- npm init 
- set a .env file with (PORT, DATABASE_URL, JWT_SECRET, EXPIRES_IN)
- npm start

### On AWS EC2
- start an instance
- sudo apt install docker.io
- sudo usermod -aG docker ubuntu (adding the user to group)
- git clone <-repoUrl->
- vim .env 
- set all the env variables in it 
- docker build -t <-image name-> .
- docker run -p <-port exposed->:<-app port-> <-image name->
- also remember to allow traffic on your exposed port from the security group if the instance

#### or 
- after setting env file in above instance you can run below command
- docker-compose down && docker-compose up 


