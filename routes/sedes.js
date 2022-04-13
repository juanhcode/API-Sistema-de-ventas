const {Router} = require('express');
const router = Router();
const connection = require('../db/db');

router.get('/sedes', async (req, res) => {
    try{
        const [rows] = await connection.query('SELECT * FROM sedes;');
        console.log(rows);
        return res.status(200).json(rows);
    }catch(e){
        console.log(e);
        res.status(500).json({error:"Internal server error"}); 
    }
})

router.post('/sedes', async (req, res) => {
    try{
        const {nombre,calle,carrera,nomenclatura,barrio,ciudad,descripcion} = req.body;
        
        //await connection.query(`INSERT INTO sedes (nombre,calle,carrera,nomenclatura,barrio,ciudad,descripcion)
        //VALUES ('${nombre}', '${calle}', '${carrera}', '${nomenclatura}', '${barrio}', '${ciudad}', '${descripcion}')`);
        const fields = Object.keys(req.body);
        await connection.query(`INSERT INTO sedes (${fields.join()})
        VALUES (?,?,?,?,?,?,?)`,Object.values(req.body));
        
        const [rows] = await connection.query(`SELECT * FROM sedes WHERE nombre = '${nombre}';`);
        console.log(rows);
        return res.status(200).json(rows);
    }catch(e){
        console.log(e);
        res.status(500).json({error:"Internal server error"});
    }
})

router.patch('/sedes/:id', async (req, res)=>{
    try {
        
        const fields = Object.keys(req.body);
        const fieldsQuery = fields.map(field =>{
            if (typeof req.body[`${field}`] === 'string'){
                return `${field} = '${req.body[`${field}`]}'`;
            }else{
                return `${field} = ${req.body[`${field}`]}`;
            }
        })
        const result = await connection.query(`UPDATE sedes SET ${fieldsQuery.join()} WHERE id=${req.params.id}`);
        const [rows] = await connection.query(`SELECT * FROM sedes WHERE id = ${req.params.id};`);
        console.log(rows);
        return res.status(200).json(rows);
    } catch (e) {
        console.log(e);
        res.status(500).json({error:"Internal server error"});  
    }
})

router.delete('/sedes/:id', async (req, res)=>{
    try{
        await connection.query(`DELETE FROM sedes WHERE id = ${req.params.id};`);
        return res.status(200).json('registro eliminado correctamente');
    }catch(e){
        console.log(e);
        res.status(500).json({error:"Internal server error"}); 
    }
})

module.exports = router;