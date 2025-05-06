import { Request, Response } from 'express';
import sql from 'mssql';

export async function getUserDetails(req: Request, res: Response, pool: sql.ConnectionPool) {
    const {email} = req.body;

    try {
        console.log("Fetching details for Email:", email);

        const result = await pool.request()
            .input('email', sql.VarChar, email)
            .query('SELECT * FROM Users WHERE Email = @email');

        //console.log(result);
        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "User not found" }); // Return null if user not found
        }
        console.log("From get user server:",result.recordset[0]);
        return result.recordset[0]; // Return user details
        //res.status(200).json(result.recordset[0]);
    } catch (error) {
        console.error("Error fetching user details:", error);
         res.status(500).json({ message: 'Error fetching user details', error });
        
    }
}
