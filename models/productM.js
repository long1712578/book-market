const db=require('../utils/db');
const tbProduct='san_pham';

module.exports={
    all: async()=>{
        const sql=`SELECT *FROM ${tbProduct}`;
        const rows=await db.load(sql);
        return rows;
    },
};