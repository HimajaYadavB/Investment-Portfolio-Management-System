import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as sql from 'mssql';
import * as dotenv from 'dotenv';

dotenv.config();

export async function loginAdmin(req: Request, res: Response, pool: sql.ConnectionPool) {
    const { email, password } = req.body;

    try {
        //console.log("Received Email:", email);
        //console.log("Received Password:", password);

        const result = await pool.request()
            .input('email', sql.VarChar, email)
            .query('SELECT * FROM Admins WHERE Email = @email');

            //console.log("Query result:", result.recordset);

        if (result.recordset.length === 0) {
            return res.status(401).json({ message: 'Admin Not Found' });
        }

        const admin = result.recordset[0];
        const isPasswordValid = password === admin.Password;

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }


        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
}
