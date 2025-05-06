import { Request, Response } from 'express';
import sql from 'mssql';

export async function addPortfolio(user: any, req: Request, res: Response, pool: sql.ConnectionPool) {
    const userID = user.UserID;
    const {portfolioName, portfolioType} = req.body;

    try{
        console.log("Starting to add portfolio....")

        const result = await pool.request()
            .input('userID', sql.Int, userID)
            .input('PortfolioName', sql.VarChar, portfolioName)
            .input('PortfolioType', sql.VarChar, portfolioType)
            .query('INSERT INTO Portfolios(UserID,PortfolioName,PortfolioType,DateCreated) values(@userID,@PortfolioName, @PortfolioType, GETDATE())')
        
        res.status(201).json({ message: 'Portfolio added successfully' });
    }
    catch(error){
        console.error("Error adding portfolio:", error);
        res.status(500).json({ message: 'Error adding portfolio', error });
    }

}