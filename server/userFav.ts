import { Request, Response } from 'express';
import sql from 'mssql';

export async function getUserFav(req: Request,res: Response, pool: sql.ConnectionPool){
    const {userId} = req.body;
    try{
        console.log("Fetching asset types")

        const result = await pool.request()
            .input('userId', sql.Int, userId)
            .query('select f.* from UserFavoriteLinks f join UserLinksMed l on f.Id=l.LinkId where l.UserId=@userId order by l.OrderIndex');

        console.log("Selected links:",result.recordset)
        return res.status(200).json({favoriteLinks: result.recordset});
    }
    catch (error) {
        console.error("Error fetching user details:", error);
         res.status(500).json({ message: 'Error fetching asset types', error });
        
    }
}


export async function getUnselectedFav(req:Request,res: Response, pool: sql.ConnectionPool){
    const {userId}= req.body;
  try {
    const result = await pool.request()
        .input('userId', sql.Int, userId)
      .query('select f.* from UserFavoriteLinks f where f.Id not in (select LinkId from UserLinksMed where UserId=@userId)');

      console.log("Unselected links:",result.recordset);
    return res.status(200).json({ favoriteLinks: result.recordset });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching unselected favorites', error });
  }
}

export async function selectFavLink(req: Request, res: Response, pool: sql.ConnectionPool) {
    const {userId, linkId} = req.body;
  try {
    
    const result = await pool.request()
      .input('userId', sql.Int, userId)
      .input('linkId', sql.Int, linkId)
      .query(`
        DECLARE @maxOrder INT = (
          SELECT ISNULL(MAX(OrderIndex), 0)
          FROM UserLinksMed
          WHERE UserId = @userId
        );

        INSERT INTO UserLinksMed (UserId, LinkId, OrderIndex)
        VALUES (@userId, @linkId, @maxOrder + 1)
      `);
    
    return res.status(200).json({ message: 'Favorite marked as selected' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating favorite', error });
  }
}

export async function delFavLink(req: Request, res: Response, pool: sql.ConnectionPool) {
    const {userId, linkId} = req.body;
  try {
    
    const result = await pool.request()
      .input('userId', sql.Int, userId)
      .input('linkId', sql.Int, linkId)
      .query('DELETE FROM UserLinksMed WHERE UserId=@userId AND LinkId=@linkId');
    
    return res.status(200).json({ message: 'Favorite deselected' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting favorite', error });
  }
}
export async function updateOrderIndex(req: Request, res: Response, pool: sql.ConnectionPool) {
  const { userId, orderedLinkIds } = req.body;

  console.log(`🛠️ Starting order update for userId=${userId}`);
  console.log('📦 Received orderedLinkIds:', orderedLinkIds);

  const transaction = new sql.Transaction(pool);
  try {
    await transaction.begin();
    console.log('🔄 Transaction started');

    for (let i = 0; i < orderedLinkIds.length; i++) {
      const linkId = orderedLinkIds[i];
      const orderIndex = i + 1;

      console.log(`➡️ Updating LinkId=${linkId} with OrderIndex=${orderIndex}`);

      await transaction.request()
        .input('userId', sql.Int, userId)
        .input('linkId', sql.Int, linkId)
        .input('orderIndex', sql.Int, orderIndex)
        .query(`
          UPDATE UserLinksMed
          SET OrderIndex = @orderIndex
          WHERE UserId = @userId AND LinkId = @linkId
        `);
    }

    await transaction.commit();
    console.log('✅ Transaction committed');
    return res.status(200).json({ message: 'Order updated successfully' });

  } catch (err) {
    console.error('❌ Error occurred, rolling back transaction:', err);
    await transaction.rollback();
    return res.status(500).json({ message: 'Failed to update order', error: err });
  }
}
