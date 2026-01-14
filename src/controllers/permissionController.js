const pool = require('../config/db');

//create permission

const createPermission = async (req, res) => {
    try {

        //input
        const { name, resource, action, description } = req.body;
        //validation

        if (!name || !resource || !action) {
            return res.status(400).json({ message: "required data are missing" });
        }

        const result = await pool.query("INSERT INTO permissions (name,resource,action,description) VALUES($1,$2,$3,$4)RETURNING *", [name, resource, action, description]);
        res.status(201).json(result.rows[0])
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "eeror message" });
    }
};

//getAllpermission

const getAllpermission = async (req, res) => {
    try {

        const result = await pool.query("SELECT * FROM permissions");
        res.status(200).json(result.rows[0]);
    } catch {
        res.status(500).json({ message: "err message" });
    }
};

//updatepermission

const updatePermission = async (req, res) => {
    try {

        let { id } = req.params;
        const { name } = req.body;

        if (!id || !name) {
            return res.status(400).json({ message: "data are not found" });
        }



        // remove trailing spaces/newlines
        //id = id.trim();




        const result = await pool.query(
            "UPDATE permissions SET name = $1 WHERE id = $2 RETURNING *",
            [name, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "permission not found" });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "err msg" });
    }
}


//delete permissions

const deletePermission = async (req, res) => {
    try {
        const { id } = req.params;

        //validation

        if (!id) {
            return res.status(400).json({
                message: "id is required"
            })
        }
        const result = await pool.query("DELETE TABLE permissions WHERE id=$1");


        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Permission not found"
            });
        }

        res.status(200).json({
      message: "Permission deleted successfully",
      data: result.rows[0]
    });


    } catch (error) {
        res.status(500).json({ message: "error message" });
    }
}

//assignpermission

const assignPermission = async (req, res) => {
  try {
    const { role_id, permission_id } = req.body;

    // validation
    if (!role_id || !permission_id) {
      return res.status(400).json({
        message: "role_id and permission_id are required"
      });
    }

    // insert mapping
    const result = await pool.query(
      `INSERT INTO role_permissions (role_id, permission_id)
       VALUES ($1, $2)
       RETURNING *`,
      [role_id.trim(), permission_id.trim()]
    );

    res.status(201).json({
      message: "Permission assigned to role successfully",
      data: result.rows[0]
    });

  } catch (error) {
    
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createPermission, getAllpermission, updatePermission, deletePermission,assignPermission };
