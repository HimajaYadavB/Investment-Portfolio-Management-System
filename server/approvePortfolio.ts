import { Request, Response } from 'express';
import sql from 'mssql';

export async function approvePortfolio(req:Request, res: Response, pool: sql.ConnectionPool) {
    const {portfolioId} = req.body;
    try {
        await pool.request()
            .input('portfolioId', sql.Int, portfolioId)
            .query('UPDATE Portfolios SET IsApproved = 1 WHERE PortfolioID = @portfolioId');

        res.status(200).json({ message: 'Portfolio approved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error approving portfolio', error });
    }
}