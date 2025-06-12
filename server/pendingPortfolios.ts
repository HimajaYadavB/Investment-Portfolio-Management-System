import { Response, Request } from 'express';
import sql from 'mssql';

export async function getPendingPortfolios(req:Request, res: Response, pool: sql.ConnectionPool) {
    const {userId} = req.body;
    try {
        const result = await pool.request()
        .input('userId', sql.Int, userId)
            .query('SELECT * FROM Portfolios WHERE IsApproved = 0 AND UserID != @userId');

        return res.status(200).json({ portfolios: result.recordset });
    } catch (error) {
        console.error("Error fetching portfolios:", error);
        res.status(500).json({ message: 'Error fetching portfolios', error });
    }
}
