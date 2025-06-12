import { Request, Response } from 'express';
import sql from 'mssql';

export async function buyAssets(user: any, req: Request, res: Response, pool: sql.ConnectionPool) {
    const userID = user.UserID;
    console.log("userID",userID)
    const { portfolioName, assetName, assetType, quantity, purchasePrice, brokerName } = req.body;
    try{
        console.log("Fetching PortfolioID for portfolio:", portfolioName);

        const portfolioQuery = await pool.request()
            .input('portfolioName', sql.VarChar, portfolioName)
            .input('userID',sql.Int,userID )
            .query('SELECT PortfolioID from portfolios where PortfolioName=@portfolioName and UserId=@userID');

        const brokerQuery = await pool.request()
            .input('brokerName', sql.VarChar, brokerName)
            .query('SELECT BrokerID from Brokers where BrokerName=@brokerName');
        
        const brokerID = brokerQuery.recordset[0].BrokerID;
        console.log("Broker ID:", brokerID)
        
        const portfolioID = portfolioQuery.recordset[0].PortfolioID;
        console.log("PortfolioID fetched:", portfolioID);

        const existingAssetQuery = await pool.request()
        .input('astname', sql.VarChar, assetName)
        .query('SELECT * from Assets where AssetName=@astname');
        
        let AssetID;
        let AssetName;

        if(existingAssetQuery.recordset.length>0){
            const existingAsset = existingAssetQuery.recordset[0];
            AssetID = existingAsset.AssetID;
            AssetName = existingAsset.AssetName;
            const newQuantity = existingAsset.Quantity + quantity;

            await pool.request()
                .input('newQuantity', sql.Int, newQuantity)
                .input('assetID', sql.Int, existingAsset.AssetID)
                .input('purchasePrice',sql.Int, purchasePrice)
                .query('UPDATE Assets SET Quantity = @newQuantity, CurrentPrice =  @purchasePrice, DatePurchased=GETDATE() WHERE AssetID = @assetID');
                console.log("Updated existing asset quantity:", newQuantity);

            // return res.status(200).json({ message: 'Asset quantity updated successfully' });
        }
        else{
            const insertAssetQuery = `
                INSERT INTO Assets (PortfolioID, AssetName, AssetType, Quantity,  CurrentPrice, DatePurchased,IsApproved)
                OUTPUT INSERTED.AssetID
                VALUES (@portfolioID, @assetName, @assetType, @quantity, @purchasePrice, GETDATE(),0)
            `;

            const insertResult = await pool.request()
                .input('portfolioID', sql.Int, portfolioID)
                .input('assetName', sql.VarChar(100), assetName)
                .input('assetType', sql.VarChar(100), assetType)
                .input('quantity', sql.Int, quantity)
                .input('purchasePrice', sql.Decimal(10, 2), purchasePrice)
                .query(insertAssetQuery);

            AssetID = insertResult.recordset[0].AssetID;
            AssetName = insertResult.recordset[0].AssetName;
            console.log("New asset inserted with AssetID:", AssetID);
        }

        console.log("Preparing data for stock purchase procedure...");

        const stockPurchaseTable = new sql.Table('StockPurchaseTableType');
        stockPurchaseTable.columns.add('UserID', sql.Int);
        stockPurchaseTable.columns.add('PortfolioID', sql.Int);
        stockPurchaseTable.columns.add('AssetID', sql.Int);
        stockPurchaseTable.columns.add('AssetName', sql.VarChar);
        stockPurchaseTable.columns.add('Quantity', sql.Int);
        stockPurchaseTable.columns.add('Price', sql.Decimal(10, 2));
        stockPurchaseTable.columns.add('BrokerID', sql.Int);

        stockPurchaseTable.rows.add(userID, portfolioID, AssetID, AssetName,quantity, purchasePrice, brokerID);
        console.log("userID",userID);
        console.log("portfolioID",portfolioID);
        console.log("AssetID",AssetID);
        console.log("AssetName",AssetName);
        console.log("quantity",quantity);
        console.log("purchasePrice",purchasePrice);
        console.log("brokerID",brokerID);

        await pool.request()
            .input('StockPurchases', stockPurchaseTable)
            .execute('BuyStock');

        console.log("Procedure executed successfully!");
        return res.status(200).json({ message: 'Stock purchase completed successfully' });

    }
    catch(error){
        console.error("Error fetching assets:", error);
        if (!res.headersSent) {
            return res.status(500).json({ message: 'Error fetching assets', error });
        }
    }
}