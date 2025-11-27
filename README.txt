VIT Semester Result App (React + Spring Boot + MongoDB)

Structure:
 - backend: Spring Boot (Maven). Runs on port 8080 by default.
 - frontend: React (create-react-app style). Runs on port 3000 by default.

Requirements:
 - Java 11+, Maven
 - Node.js + npm
 - MongoDB running locally (the app uses host=localhost port=27017 database=vit_results). You said you have MongoDB Compass - ensure the MongoDB server is running.

How to run backend:
 1. Open terminal in backend directory:
    cd backend
 2. Build & run:
    mvn spring-boot:run
  (or mvn package && java -jar target/vit-results-backend-0.0.1-SNAPSHOT.jar)

How to run frontend:
 1. Open another terminal in frontend directory:
    cd frontend
 2. Install and start:
    npm install
    npm start

API:
 - POST /api/students
   Payload example:
   {
     "name": "Alice",
     "rollNo": "19CS1001",
     "mse": {"CNT": 25, "ANN": 28, "CC": 30, "DAA": 27},
     "ese": {"CNT": 60, "ANN": 55, "CC": 70, "DAA": 65}
   }
 - GET /api/students/{roll}

Calculation rules (implemented):
 - Each subject total = 0.3 * MSE + 0.7 * ESE (marks assumed out of 100).
 - Overall percentage = average of 4 subject totals.
 - Passing criteria: student must have >= 40 in each subject (subject total) to PASS. Otherwise FAIL.

If you want different pass marks or different weightings, edit StudentService.java addStudent() method.

