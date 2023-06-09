const conn = require('./db');

module.exports = {

    getAll: async () => {
        const query = 'SELECT * FROM tasks'

        const [ tasks ] = await conn.execute(query);
        
        return tasks;
    },

    createTask: async (task) => {
        const {titulo, status = 'Pendente'} = task;
        const dataInsert = new Date(Date.now()).toUTCString();

        const query = 'INSERT INTO tasks (titulo, status, data_insert) VALUES (?, ?, ?)';

        const [create] = await conn.execute(query, [titulo, status, dataInsert]);

        return {insertId: create.insertId, task: {titulo, status, dataInsert}};
    },

    updateTask: async (id, task) => {
        const query = 'UPDATE tasks SET titulo = ?, status = ?, data_update = ? WHERE id = ?';

        const dataUpdate = new Date(Date.now()).toUTCString();
        const { titulo, status } = task;

        const [ update ] = await conn.execute(query, [titulo, status,  dataUpdate, id]);

        return update;
    },

    deleteTask: async (id) => {
        const query = 'DELETE FROM tasks WHERE id = ?';

        const [ remove ] = await conn.execute(query, [id]);

        return remove;
    }
}