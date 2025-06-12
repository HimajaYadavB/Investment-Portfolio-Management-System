import { Response, Request } from 'express';
import sql from 'mssql';

export async function getPendingAssets(req: Request, res: Response, pool: sql.ConnectionPool) {
    const {userId} = req.body; 
    try {
        const result = await pool.request()
            .input('userId', sql.Int, userId)
            .query('SELECT a.*, p.PortfolioName FROM Assets a JOIN Portfolios p on a.PortfolioID=p.PortfolioID WHERE a.IsApproved = 0 AND p.UserID != @userId');

        return res.status(200).json({ assets: result.recordset });
    } catch (error) {
        console.error("Error fetching assets:", error);
        res.status(500).json({ message: 'Error fetching assets', error });
    }
}
