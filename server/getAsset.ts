import { Request, Response } from 'express';
import sql from 'mssql';

export async function getAssets(user: any, req: Request, res: Response, pool: sql.ConnectionPool) {
    const userID = user.UserID;

    try {
        console.log("Fetching portfolio IDs for user:", userID);

        // Step 1: Fetch all portfolio IDs for the user
        const portfolioResult = await pool.request()
            .input('userID', sql.Int, userID)
            .query('SELECT * FROM portfolios WHERE UserID = @userID');

        if (portfolioResult.recordset.length === 0) {
            return res.status(404).json({ message: 'No portfolios found for user' });
        }

        const portfolioMap: Record<number, string> = {};
        portfolioResult.recordset.forEach(row => {
            portfolioMap[row.PortfolioID] = row.PortfolioName;
        });

        const portfolioIDs = Object.keys(portfolioMap).map(id => Number(id)); // Extract PortfolioIDs
        console.log("Portfolio IDs:", portfolioIDs);

        // Check if no portfolio IDs were found
        if (portfolioIDs.length === 0) {
            return res.status(404).json({ message: 'No portfolios found for user' });
        }

        // Step 2: Dynamically construct the SQL query for fetching assets
        const query = `
            SELECT A.*, P.*
            FROM Assets A
            JOIN portfolios P ON A.PortfolioID = P.PortfolioID
            WHERE A.PortfolioID IN (${portfolioIDs.map(id => `'${id}'`).join(',')})
        `;
        console.log("Generated Query:", query); // Debugging: Log the query

        // Fetch the assets
        const assetResult = await pool.request().query(query);

        if (assetResult.recordset.length === 0) {
            return res.status(404).json({ message: 'No assets found for user portfolios' });
        }

        console.log("Assets fetched:", assetResult.recordset);

        // Step 3: Return the assets as the response
        res.status(200).json({
            user: user,
            assets: assetResult.recordset,
        });
    } catch (error) {
        console.error("Error fetching assets:", error);
        res.status(500).json({ message: 'Error fetching assets', error });
    }
}
