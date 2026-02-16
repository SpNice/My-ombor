// app.js

// Import required libraries
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const CSVWriter = require('csv-writer').createObjectCsvWriter;
const { GoogleSpreadsheet } = require('google-spreadsheet');

const app = express();
app.use(bodyParser.json());
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));

// MongoDB model schemas (simplified)
const UserSchema = new mongoose.Schema({ username: String, password: String });
const ProductSchema = new mongoose.Schema({ name: String, quantity: Number, price: Number });
const AttendanceSchema = new mongoose.Schema({ userId: String, date: Date, status: String });

const User = mongoose.model('User', UserSchema);
const Product = mongoose.model('Product', ProductSchema);
const Attendance = mongoose.model('Attendance', AttendanceSchema);

// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/warehouse_management', { useNewUrlParser: true, useUnifiedTopology: true });

// User authentication
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
        req.session.userId = user._id;
        res.send('Login successful');
    } else {
        res.status(401).send('Unauthorized');
    }
});

// Product management endpoints
app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.send('Product added');
});

app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// Attendance tracking
app.post('/attendance', async (req, res) => {
    const attendance = new Attendance(req.body);
    await attendance.save();
    res.send('Attendance recorded');
});

// Report functionality
app.get('/reports', async (req, res) => {
    const attendanceRecords = await Attendance.find();
    res.json(attendanceRecords);
});

// Google Sheets integration
app.post('/sync-to-sheets', async (req, res) => {
    const doc = new GoogleSpreadsheet('your_google_sheet_id');
    await doc.useServiceAccountAuth(require('./path/to/creds.json'));
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];

    const records = await Attendance.find();
    const rows = records.map(record => ({ user: record.userId, date: record.date, status: record.status }));

    await sheet.addRows(rows);
    res.send('Data synced to Google Sheets');
});

// CSV export
app.get('/export-csv', async (req, res) => {
    const records = await Attendance.find();
    const csvWriter = CSVWriter({ path: 'attendance.csv', header: [{ id: 'userId', title: 'User ID' }, { id: 'date', title: 'Date' }, { id: 'status', title: 'Status' }] });
    await csvWriter.writeRecords(records);
    res.send('CSV export completed');
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
