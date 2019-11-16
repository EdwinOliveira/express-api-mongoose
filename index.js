/* Require Package
 * express -> Will require the EXPRESS package;
 * mongoose -> Will require the MONGOOSE package;
 */
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

// Init's; //
const app = express();
app.use(cors());
app.options('*', cors());

// MongoDB Atlas Conection
mongoose.connect(`mongodb+srv://edwin:${process.env.MONGO_ATLAS_PW}@kecluster-rdlfg.mongodb.net/test?retryWrites=true&w=majority`, {
    useNewUrlParser: true
});

// Body Parser
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

// Members Api Routes
app.use('/api/tasks', require('./api/routes/tasks'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));