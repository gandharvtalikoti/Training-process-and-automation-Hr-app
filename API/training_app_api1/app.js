const express = require('express');
// const productRoutes = require('./routes/productRoutes');
const db = require('./db');
const bodyParser = require('body-parser');
const cors = require('cors');
const employeeRoutes = require('./src/routes/employeeRoutes');
const loginRoutes = require('./src/routes/loginRoutes');
const departmentRoutes = require('./src/routes/departmentRoutes');
const skillRoutes = require('./src/routes/skillRoutes')
const subSkillRoutes = require('./src/routes/subSkillRoutes')

const app = express();
const port = 3001;
app.use(cors());
app.use(bodyParser.json());

app.use('/employee', employeeRoutes);
app.use('/login', loginRoutes);
app.use('/department', departmentRoutes);
app.use('/skill', skillRoutes);
app.use('/subSkill', subSkillRoutes);

// app.use('/api', productRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
