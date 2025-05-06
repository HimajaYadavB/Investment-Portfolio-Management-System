import { Request, Response } from 'express';
import sql from 'mssql';

export async function getDividends(user: any, req: Request, res: Response, pool: sql.ConnectionPool) {
    const userID = user.UserID;

    try{
        console.log("Fetching portfolio IDs for user:", userID);
 

        // const AdivResult = await pool.request()
        //     .input('userID', sql.Int, userID)
        //     .query(Adivquery);
        const AdivResult = await pool.request()
            .input('userID', sql.Int, userID)
            .execute('GetAssetDividends');  // Calling stored procedure

        // Call stored procedure for Portfolio Dividends
        const PdivResult = await pool.request()
            .input('userID', sql.Int, userID)
            .execute('GetPortfolioDividends'); 

        if (AdivResult.recordset.length === 0) {
            return res.status(404).json({ message: 'No Dividends received by the user' });
        }

        // const PdivResult = await pool.request()
        // .input('userID', sql.Int, userID)
        // .query(Pdivquery);

        res.status(200).json({
            user: user,
            Adividend: AdivResult.recordset,
            Pdividend: PdivResult.recordset
        });

    }
    catch(error){
        console.error("Error fetching dividends:", error);
        res.status(500).json({ message: 'Error fetching dividends', error });
    
    }

}