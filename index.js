const express = require('express');
const app = express();
const employeeRoutes = require('./routes/employeeRoutes');

app.use(express.json());
app.use('/api', employeeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));