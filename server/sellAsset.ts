import { Request, Response } from 'express';
import sql from 'mssql';

export async function sellAsset(user: any, req: Request, res: Response, pool: sql.ConnectionPool) {
    const userID = user.UserID;
    const {portfolioName, assetID, assetName, quantity, sellPrice, brokerName} = req.body;
    console.log("userID",userID);
    try{
        console.log("Starting procedure to sell asset");

        const portfolioQuery = await pool.request()
                    .input('portfolioName', sql.VarChar, portfolioName)
                    .input('userID',sql.Int,userID )
                    .query('SELECT PortfolioID from portfolios where PortfolioName=@portfolioName and UserId=@userID');

    const portfolioID = portfolioQuery.recordset[0].PortfolioID;
    console.log("PortfolioID fetched:", portfolioID);

        const brokerQuery = await pool.request()
            .input('brokerName', sql.VarChar, brokerName)
            .query('SELECT BrokerID from Brokers where BrokerName=@brokerName');
        
        const brokerID = brokerQuery.recordset[0].BrokerID;
        console.log("Broker ID:", brokerID)

        // const result = await pool.request()
        //     .input('userID',sql.Int, userID)
        //     .input('portfolioID',sql.Int, portfolioID)
        //     .input('assetID',sql.Int, assetID)
        //     .input('assetName',sql.VarChar, assetName)
        //     .input('quantity',sql.Int, quantity)
        //     .input('price',sql.Int, price)
        //     .input('brokerID',sql.Int, brokerID)
        //     .execute('UpdatedSellStock')
        
        // console.log("Procedure executed successfully!");
        // return res.status(200).json({ message: 'Stock sold successfully' });

        const stockSellTable = new sql.Table('StockPurchaseTableType');

                stockSellTable.columns.add('UserID', sql.Int);
                stockSellTable.columns.add('PortfolioID', sql.Int);
                stockSellTable.columns.add('AssetID', sql.Int);
                stockSellTable.columns.add('AssetName', sql.VarChar);
                stockSellTable.columns.add('Quantity', sql.Int);
                stockSellTable.columns.add('Price', sql.Decimal(10, 2));
                stockSellTable.columns.add('BrokerID', sql.Int);
        
                stockSellTable.rows.add(userID, portfolioID, assetID, assetName,quantity, sellPrice, brokerID);
                console.log("userID",userID);
                console.log("portfolioID",portfolioID);
                console.log("AssetID",assetID);
                console.log("AssetName",assetName);
                console.log("quantity",quantity);
                console.log("purchasePrice",sellPrice);
                console.log("brokerID",brokerID);

                await pool.request()
                .input('StockSell', stockSellTable)
                .execute('UpdatedSellStock');
    
            console.log("Procedure executed successfully!");
            return res.status(200).json({ message: 'Stock purchase completed successfully' });
    
    

    }
    catch(error){
        return res.status(500).json({ message: 'Error selling asset', error });
    }
}