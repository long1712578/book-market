const db=require('../utils/db');
const tbCategory='loai_san_pham';

module.exports={
    all: async()=>{
        const sql=`SELECT *FROM ${tbCategory}`;
        const rows=await db.load(sql);
        return rows;
    },
    add: async cat => {
        const id = db.add(tbCategory, cat);
        return id;
    },

};