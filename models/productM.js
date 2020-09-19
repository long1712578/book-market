const db=require('../utils/db');
const tbProduct='san_pham';
const tbProductLike='san_pham_yeu_thich';
const tbProductNew='san_pham_moi';

const pageSize=6;

module.exports={
    all: async()=>{
        const sql=`SELECT *FROM ${tbProduct}`;
        const rows=await db.load(sql);
        return rows;
    },
    allLike: async()=>{
        const sql=`SELECT *FROM ${tbProduct},${tbProductLike} WHERE ${tbProduct}.ma_so=${tbProductLike}.ma_so_sach`;
        const rows=await db.load(sql);
        return rows;
    },
    countPro:async()=>{
        const sql=`SELECT count(*) AS total FROM ${tbProduct}`;
        const rows=await db.load(sql);
        return rows[0].total;
    },

    allByPaging: async (page)=>{
        let sql= `SELECT count(*) AS total FROM ${tbProduct}`;
        const rs= await db.load(sql);
        const totalPage=rs[0].total;
        //console.log(totalPage);
        const pageTotal=Math.floor(totalPage / pageSize)+1;
        const offset= (page -1)* pageSize;
        sql= `SELECT * FROM ${tbProduct} LIMIT ${pageSize} OFFSET ${offset}`;
        const rows= await db.load(sql);
        return {
            pageTotal: pageTotal,
            products: rows
        };
    },

    allByIdPaging: async (id,page)=>{
        let sql= `SELECT count(*) AS total FROM ${tbProduct} WHERE loai_san_pham=${id}`;
        const rs= await db.load(sql);
        const totalPage=rs[0].total;
        const pageTotal=Math.floor(totalPage / pageSize)+1;
        const offset= (page -1)* pageSize;
        sql= `SELECT * FROM ${tbProduct} WHERE loai_san_pham= ${id} LIMIT ${pageSize} OFFSET ${offset}`;
        const rows= await db.load(sql);
        return {
            pageTotal: pageTotal,
            products: rows
        };
    },
    allSearchNameProALL: async(name)=>{
        let sql =`SELECT * FROM ${tbProduct} WHERE ten_san_pham LIKE '%${name}%'`;
        const rows=await db.load(sql);
        return rows;
    },
    allByProId: async i=>{
        const sql=`SELECT *FROM ${tbProduct} WHERE ma_so=${i}`;
        const rows=await db.load(sql);
        return rows;
    },
};