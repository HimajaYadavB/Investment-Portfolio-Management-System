import  { Application, Request, Response } from 'express';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sql from 'mssql';
import dotenv from 'dotenv';
import { registerUser } from './server/register';
import { loginUser } from './server/login';
import { getUserDetails } from './server/getUser';
import { getPortfolios } from './server/getPortfolio';
import { getAssets } from './server/getAsset';
import { getDividends } from './server/getDividends';
import { buyAssets } from './server/buyAsset';
import { getAssetType } from './server/getAssetType';
import { addPortfolio } from './server/addPortfolio';
import { getPortfolioType } from './server/getPortfolioType';
import { getBrokers } from './server/getBrokers';
import { sellAsset } from './server/sellAsset';
import { getTaxes } from './server/getTaxes';
import { loginBroker } from './server/brokerlogin';
import { registerBroker } from './server/brokerRegister';
import { loginAdmin } from './server/adminLogin';
import { approveBroker } from './server/approveBroker';
import { getPendingBrokers } from './server/pendingBrokers';
import { rejectBroker } from './server/rejectBroker';
import { approvePortfolio } from './server/approvePortfolio';
import { approveAsset } from './server/approveAsset';
import { getPendingPortfolios } from './server/pendingPortfolios';
import { getPendingAssets } from './server/pendingAssets';
import { rejectPortfolio } from './server/rejectPortfolio';
import { rejectAsset } from './server/rejectAsset';
import { importPortfolios } from './server/importPortfolios';
import { importAssets } from './server/importAssets';
import { delFavLink, getUnselectedFav, getUserFav, selectFavLink, updateOrderIndex } from './server/userFav';
import { getColumnOrder, setColumnOrder } from './server/colChange';
import { updateProfile } from './server/updateProfile';
dotenv.config(); // Load environment variables

const dbConfig: sql.config = {
  server: "BR-2252380165",
  database:"Portfolio_management",
  user: "BheemanathamH",
  password: "Bvmlatha#1369123456789",
  port: 1433, // Ensure correct port
  options: {
    encrypt: true, // Set to false if using local SQL Server without SSL
    trustServerCertificate: true, // Needed for local development
  }
};



const app: Application = express();
app.use(cors({ origin: true }));
app.use(bodyParser.json());



const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then(pool => {
      console.log('Connected to SQL Server');
      return pool;
  })
  .catch(err => {
      console.error('Database connection failed!', err);
      process.exit(1);
  });

// Authentication Routes
app.post('/user-register', async (req, res) => {
  const pool = await poolPromise;
  registerUser(req, res, pool);
});

app.post('/user-login', async (req, res) => {
  const pool = await poolPromise;
  loginUser(req, res, pool);
});

app.post('/admin-login', async(req,res)=>{
  const pool=await poolPromise;
  loginAdmin(req,res,pool);
});

app.get('/pending-brokers', async (req, res) => {
  const pool = await poolPromise;
  getPendingBrokers(res, pool);
});

app.post('/pending-portfolios', async (req, res) => {
  const pool = await poolPromise;
  getPendingPortfolios(req, res, pool);
});

app.post('/pending-assets', async (req, res) => {
  const pool = await poolPromise;
  getPendingAssets(req, res, pool);
});

app.post('/approve-brokers', async (req, res) => {
  const pool = await poolPromise;
  approveBroker(req, res, pool);
});

app.post('/approve-portfolios', async (req, res) => {
  const pool = await poolPromise;
  approvePortfolio(req, res, pool);
});

app.post('/approve-assets', async (req, res) => {
  const pool = await poolPromise;
  approveAsset(req, res, pool);
});

app.post('/reject-broker', async (req, res) => {
  const pool = await poolPromise;
  rejectBroker(req, res, pool);
});

app.post('/reject-portfolio', async (req, res) => {
  const pool = await poolPromise;
  rejectPortfolio(req, res, pool);
});

app.post('/reject-asset', async (req, res) => {
  const pool = await poolPromise;
  rejectAsset(req, res, pool);
});

app.post('/broker-login', async (req, res) => {
  const pool = await poolPromise;
  loginBroker(req, res, pool);
});
app.post('/broker-register', async (req, res) => {
  const pool = await poolPromise;
  registerBroker(req, res, pool);
});

// Fetch User Details Route
app.post('/get-user-details', async (req, res) => {
  const pool = await poolPromise;
  getUserDetails(req, res, pool);
});

app.post('/import-portfolios', async(req,res)=>{
  const pool = await poolPromise;
  importPortfolios(req,res,pool);
});

app.post('/user-fav', async (req, res) => {
  const pool = await poolPromise;
  getUserFav(req, res, pool);
});

app.post('/user-fav-config', async (req, res) => {
  const pool = await poolPromise;
  getUnselectedFav(req,res, pool);
});

app.post('/select-fav-link', async (req, res) => {
  const pool = await poolPromise;
  selectFavLink(req, res, pool);
});
app.post('/delete-fav-link', async (req, res) => {
  const pool = await poolPromise;
  delFavLink(req, res, pool);
});

app.post('/update-order-index', async (req, res) => {
  const pool = await poolPromise;
  updateOrderIndex(req, res, pool);
});

app.post('/import-assets', async(req,res)=>{
  const pool = await poolPromise;
  importAssets(req,res,pool);
})

app.post('/get-asset-type', async (req, res) => {
  const pool = await poolPromise;
  getAssetType(res, pool);
});

app.post('/get-column-order', async (req, res) => {
  const pool = await poolPromise;
  getColumnOrder(req, res, pool);
});

app.post('/insert-column-order', async (req, res) => {
  const pool = await poolPromise;
  setColumnOrder(req, res, pool);
});

app.post('/update-profile', async (req, res) => {
  const pool = await poolPromise;
  updateProfile(req, res, pool);
});

app.post('/get-portfolio-type', async (req, res) => {
  const pool = await poolPromise;
  getPortfolioType(res, pool);
});

app.post('/get-brokers', async (req, res) => {
  const pool = await poolPromise;
  getBrokers(res, pool);
});

// Dashboard Route (Uses getUserDetails)
app.post('/user-portfolio', async (req, res) => {
  try {
      const pool = await poolPromise;
      const user = await getUserDetails(req, res, pool); // Await user details
      console.log("From main server",user);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      await getPortfolios(user, req, res, pool); // Pass user details to portfolio function

  } catch (error) {
      res.status(500).json({ message: 'Error in user dashboard', error });
  }
});

app.post('/user-asset', async (req, res) => {
  try {
      const pool = await poolPromise;
      const user = await getUserDetails(req, res, pool); // Await user details
      console.log("From main server",user);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      await getAssets(user, req, res, pool); // Pass user details to portfolio function

  } catch (error) {
      res.status(500).json({ message: 'Error in user dashboard', error });
  }
});

app.post('/user-dividend', async (req, res) => {
  try {
      const pool = await poolPromise;
      const user = await getUserDetails(req, res, pool); // Await user details
      console.log("From main server",user);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      await getDividends(user, req, res, pool); // Pass user details to portfolio function

  } catch (error) {
      res.status(500).json({ message: 'Error in user dashboard', error });
  }
});

app.post('/buy-asset', async(req,res)=>{
  try{
    const pool = await poolPromise;
    const user = await getUserDetails(req, res, pool); // Await user details
    console.log("From main server",user);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    await buyAssets(user, req, res, pool);
  }
  catch(error){
    res.status(500).json({ message: 'Error in buying asset', error });
  
  }
});

app.post('/sell-asset', async(req,res)=>{
  try{
    const pool = await poolPromise;
    const user = await getUserDetails(req, res, pool); // Await user details
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    await sellAsset(user, req, res, pool);
  }
  catch(error){
    res.status(500).json({ message: 'Error in selling asset', error });
  
  }
});

app.post('/add-portfolio', async(req,res)=>{
  try{
    const pool = await poolPromise;
    const user = await getUserDetails(req, res, pool); // Await user details
    console.log("From main server",user);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    await addPortfolio(user, req, res, pool);
  }
  catch(error){
    res.status(500).json({ message: 'Error in adding portfolio', error });
  
  }
});


app.post('/user-taxes', async(req,res)=>{
  try{
    const pool = await poolPromise;
    const user = await getUserDetails(req, res, pool); // Await user details
    console.log("From main server",user);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    await getTaxes(user, req, res, pool);
  }
  catch(error){
    res.status(500).json({ message: 'Error in fetching taxes', error });
  
  }
});


// Start Server
const PORT = 9000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

