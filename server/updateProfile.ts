import { Request, Response } from 'express';
import sql from 'mssql';

export async function updateProfile(req:Request,res: Response, pool: sql.ConnectionPool){
    const {userId, firstName, lastName, phone}= req.body;
  try {
    const result = await pool.request()
        .input('userId', sql.Int, userId)
      .input('firstName', sql.VarChar, firstName)
      .input('lastName', sql.VarChar, lastName)
      .input('phone', sql.VarChar, phone)
      .query(`
        UPDATE Users
        SET FirstName = @firstName,
            LastName = @lastName,
            PhoneNumber = @phone
        WHERE UserID = @userId
      `);
      console.log("Profile updated:",result.recordset);
    return res.status(200).json({ message: 'Profile updated' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error });
  }
}