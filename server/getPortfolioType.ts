import { Request, Response } from 'express';
import sql from 'mssql';

export async function getPortfolioType(res: Response, pool: sql.ConnectionPool) {
    try{
        console.log("Fetching portfolio types")

        const result = await pool.request()
            .query('SELECT PortfolioType from PortfolioTypes');

        console.log("Portfolio types:",result.recordset)
        return res.status(200).json({portfolioTypes: result.recordset});
    }
    catch (error) {
        console.error("Error fetching user details:", error);
         res.status(500).json({ message: 'Error fetching portfolio types', error });
        
    }
}