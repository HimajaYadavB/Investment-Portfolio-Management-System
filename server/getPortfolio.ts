import { Request, Response } from 'express';
import sql from 'mssql';

export async function getPortfolios(user: any,req: Request, res: Response, pool: sql.ConnectionPool) {
    const userID = user.UserID;

    try {
        console.log("Fetching details for user from email for portfolio:", userID);

        const result = await pool.request()
            .input('userID', sql.Int, userID)
            .query('SELECT * FROM portfolios WHERE UserID = @UserID');

        if (result.recordset.length === 0) {
            return res.status(401).json({ message: 'User has no portfolios' }); 
        }

        let pfs = result.recordset;
        console.log("Portfolio IDs:", pfs.map(p => p.PortfolioID));

        for(const p of pfs){
            const countres = await pool.request()
                .input('portfolioID', sql.Int, p.PortfolioID)
                .query('SELECT COUNT(*) as asseCount FROM assets where PortfolioID = @portfolioID');
            p.AssetCount = countres.recordset[0].asseCount;

            console.log("countres",countres);
            console.log("countres.recordset[0]",countres.recordset[0])
            console.log("countres.recordset",countres.recordset) 
            console.log("countres.recordsets",countres.recordsets)           
        }

        


        console.log("Final portfolios with asset counts:", pfs);
        
        res.status(200).json({ 
            recordset: result.recordset, 
            user: user
        });
        console.log("From portfolio server",result);
        console.log("From portfolio server",user.FirstName);
         
    } catch (error) {
        console.error("Error fetching user details:", error);
        res.status(500).json({ message: 'Error fetching user portfolios', error });
        
    }
}
