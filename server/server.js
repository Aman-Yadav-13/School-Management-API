// require('dotenv').config();

const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
  origin: [process.env.VERCEL_URL, process.env.REACT_APP_URL],
  methods: ['GET', 'POST']
}));
console.log(process.env.REACT_APP_URL, process.env.VERCEL_URL)

async function startServer() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });

    console.log('Connected to the database.');

    app.get('/', async (req, res) => {
      try {
        let query = `CREATE TABLE IF NOT EXISTS SCHOOL (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          address VARCHAR(255) NOT NULL,
          latitude FLOAT NOT NULL,
          longitude FLOAT NOT NULL
        )`;

        const [response] = await connection.execute(query);

        console.log(response);

        // await connection.execute(`delete from SCHOOL`)

        query = `SELECT * FROM SCHOOL`;

        const[rows] = await connection.execute(query);
        res.send(rows);
      } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error creating table');
      }
    });

    app.get('/listSchools', async (req, res) => {
      try{
        const latitude = req.query.latitude;
        const longitude = req.query.longitude;

        const query = `SELECT *, 
        SQRT(POW(LATITUDE - ?, 2) + POW(LONGITUDE - ?, 2)) AS DISTANCE
        FROM SCHOOL
        ORDER BY DISTANCE ASC`;

        const [rows] = await connection.execute(query, [latitude, longitude]);

        return res.status(200).json({data : rows});
      }catch(error){
        console.error('Error:', error);
        res.status(500).send('Error fetching rows');
      }
    })

    app.post('/addSchool', async (req, res) => {
      try{
        const {name, address, latitude, longitude} = req.body;

        const query = `INSERT INTO SCHOOL (name, address, latitude, longitude)
        VALUEs(?, ?, ?, ?)`;

        const response = await connection.execute(query, [name, address, latitude, longitude]);

        return res.status(200).json({data : 'School added scuccessfully'});
      }catch(error){
        return res.status(400).json({message : 'unable to add school'});
      }
    })

    app.get('/allSchool', async (req, res) => {
      try{
        const query = `SELECT * FROM SCHOOL`;

        const [rows] = await connection.execute(query);

        return res.status(200).json({data : rows})
      }catch(error){
        console.log('Error : ', error);
      }
    })

    // Start the server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

// Call the async function to start the server
startServer();
