import { Request, Response } from 'express';
import sql from 'mssql';

export async function registerBroker(req: Request, res: Response, pool: sql.ConnectionPool) {
    const { brokerName, contactDetails, commissionRate, licenseNumber, password, email } = req.body;

    try {
        
        await pool.request()
            .input('brokerName', sql.VarChar, brokerName)
            .input('contactDetails', sql.VarChar, contactDetails)
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, password)
            .input('commissionRate', sql.Int, commissionRate)
            .input('licenseNumber', sql.VarChar, licenseNumber)
            .input('isApproved', sql.Bit, 0) 
            .query('INSERT INTO Brokers (BrokerName, ContactDetails, Email, password, CommissionRate, LicenseNumber, IsApproved) VALUES (@brokerName, @contactDetails, @email, @password, @commissionRate, @licenseNumber, @isApproved)');

        res.status(201).json({ message: 'Registration Approval Pending' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering broker', error });
    }
}
