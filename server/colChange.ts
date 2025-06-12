import { Request, Response } from 'express';
import sql from 'mssql';

export async function getColumnOrder(req:Request,res: Response, pool: sql.ConnectionPool){
    const {userId, tableName}= req.body;
  try {
    const result = await pool.request()
        .input('userId', sql.Int, userId)
        .input('tableName', sql.VarChar, tableName)
      .query(`
        SELECT ColumnOrder FROM UserColumnPreferences
        WHERE UserId = @userId AND TableName = @tableName
      `);

      if (result.recordset.length > 0) {
        console.log("res", result.recordset[0].columnOrder);
      res.json(JSON.parse(result.recordset[0].ColumnOrder));
    } else {
      res.json(null); 
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: 'Error fetching Column Order', error });
  }
}

export async function setColumnOrder(req:Request,res: Response, pool: sql.ConnectionPool){
    const {userId, tableName, colOrder}= req.body;
  try {
    const result = await pool.request()
        .input('userId', sql.Int, userId)
        .input('tableName', sql.VarChar, tableName)
        .input('colOrder', sql.NVarChar, JSON.stringify(colOrder))
      .query(`
        IF EXISTS(
            SELECT 1 FROM UserColumnPreferences WHERE UserId=@userId AND TableName = @tableName
        )
        UPDATE UserColumnPreferences
        SET ColumnOrder =  @colOrder
        WHERE UserId=@userId AND TableName=@tableName
        ELSE
        INSERT INTO UserColumnPreferences (UserId, TableName, ColumnOrder)
        VALUES (@userId, @tableName, @colOrder)
      `);

      res.json({ message: 'Column order saved successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Error inserting Column Order', error });
  }
}