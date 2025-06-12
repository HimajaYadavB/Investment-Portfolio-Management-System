import { Request, Response } from 'express';
import sql from 'mssql';

export async function rejectPortfolio(req: Request, res: Response, pool: sql.ConnectionPool) {
    const { portfolioId } = req.body;
    console.log('Received portfolioId for rejection:', portfolioId);
    try {
        await pool.request()
            .input('portfolioId', sql.Int, portfolioId)
            .query('DELETE FROM Portfolios WHERE PortfolioID = @portfolioId');

        res.status(200).json({ message: 'Portfolio rejected and deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error rejecting portfolio', error });
    }
}