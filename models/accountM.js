const db=require('../utils/db');
const tbName='nguoi_dung';

module.exports = {
    add: async user => {
        const id = db.add(tbName, user);
        return id;
    },
}