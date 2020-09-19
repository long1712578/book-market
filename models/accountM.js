const db=require('../utils/db');
const tbName='nguoi_dung';

module.exports = {
    add: async user => {
        const id = db.add(tbName, user);
        return id;
    },
    countBuyer:async()=>{
        const sql=`SELECT count(*) AS total FROM ${tbName} WHERE loai=1`;
        const rows=await db.load(sql);
        return rows[0].total;
    },
    countSeller:async()=>{
        const sql=`SELECT count(*) AS total FROM ${tbName} WHERE loai=2`;
        const rows=await db.load(sql);
        return rows[0].total;
    }
}