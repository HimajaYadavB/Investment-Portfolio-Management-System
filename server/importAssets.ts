import { Request, Response } from 'express';
import sql from 'mssql';

export async function importAssets(req: Request, res: Response, pool: sql.ConnectionPool) {
  const {assets} = req.body;

  if (!Array.isArray(assets)) {
    return res.status(400).json({ message: 'Invalid data format. Expected an array of assets.' });
  }

  try {
    const tvp = new sql.Table(); // Define TVP for bulk insertion

    
    tvp.columns.add('PortfolioID', sql.Int);
    tvp.columns.add('AssetName', sql.VarChar(100));
    tvp.columns.add('AssetType', sql.VarChar(100));
    tvp.columns.add('Quantity', sql.Int);
    tvp.columns.add('CurrentPrice', sql.Decimal(10, 2));
    tvp.columns.add('DatePurchased', sql.DateTime);
    tvp.columns.add('IsApproved', sql.Int);

    for (const asset of assets) {
      const { UserID, PortfolioName, AssetName, AssetType, Quantity, CurrentPrice } = asset;

      // Fetch PortfolioID using UserID and PortfolioName
      const portfolioResult = await pool.request()
        .input('UserID', sql.Int, UserID)
        .input('PortfolioName', sql.VarChar(100), PortfolioName)
        .query('SELECT PortfolioID FROM Portfolios WHERE UserID = @UserID AND PortfolioName = @PortfolioName');

      if (portfolioResult.recordset.length === 0) {
        console.warn(`Portfolio not found for user ${UserID} and name '${PortfolioName}'`);
        continue; // skip this asset if no portfolio found
      }

      const portfolioID = portfolioResult.recordset[0].PortfolioID;

      tvp.rows.add(
        portfolioID,
        AssetName,
        AssetType,
        Quantity,
        CurrentPrice,
        new Date(),
        0 // IsApproved = false
      );
    }

    await pool.request()
      .input('AssetsTVP', tvp)
      .execute('InsertAssetsBulk'); // your stored procedure name

    return res.status(201).json({ message: 'Assets imported successfully' });

  } catch (error) {
    console.error('Error importing assets:', error);
    return res.status(500).json({ message: 'Error during asset import', error });
  }
}
