import { Request, Response } from 'express';
import sql from 'mssql';

export async function registerUser(req: Request, res: Response, pool: sql.ConnectionPool) {
    const { firstName, lastName, email, password, dob, address, phone } = req.body;

    try {
        

        await pool.request()
            .input('firstName', sql.VarChar, firstName)
            .input('lastName', sql.VarChar, lastName)
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, password)
            .input('dob', sql.VarChar, dob)
            .input('address', sql.VarChar, address)
            .input('phone', sql.VarChar, phone)
            .query('INSERT INTO Users (FirstName, LastName, Email, Password, DateOfBirth, Address, PhoneNumber) VALUES (@firstName, @lastName, @email, @password, @dob, @address, @phone)');

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
}
