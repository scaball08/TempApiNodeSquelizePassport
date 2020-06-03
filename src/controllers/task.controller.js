import Task from '../models/Tasks';


export async function createTask(req, res) {

    const { name, done, project_id } = req.body;

    try {

        let newTask = await Task.create({
            name,
            done,
            project_id
        }, {
            fields: [
                'name',
                'done',
                'project_id'
            ]
        });

        if (newTask) {
            return res.json({
                message: 'Task created succesfully',
                data: newTask
            });
        }

    } catch (e) {

        res.status(500).json({
            message: `Somethin goes wrong error:  ${e}`,
            data: {}
        });

    }

}

export async function getTasks(req, res) {

    try {

        const listTasks = await Task.findAll({

            attributes: [
                'id',
                'name',
                'done',
                'project_id'
            ],
            order: [
                ['id', 'DESC']
            ]
        });

        console.log(listTasks);
        res.json({
            data: listTasks
        });

    } catch (e) {

        res.status(500).json({
            message: `Somethin goes wrong error:  ${e}`
        });

    }

}

export async function updateTask(req, res) {

    let id = req.params.id;
    const { name, done, project_id } = req.body;
    try {
        if (id) {
            const task = await Task.findOne({
                attributes: ['name', 'done', 'project_id', 'id'],
                where: {
                    id
                }
            });

            if (task) {
                const updatedTask = await task.update({
                    name,
                    done,
                    project_id
                }
                    // ,{
                    //     where:{
                    //         id
                    //     }
                    // }
                );

                res.status(201).json({
                    message: 'Task updated succesfully',
                    updateTask: updatedTask
                });

            } else {
                return res.status(404).json({
                    Error: 'Task not Found'
                });
            }

        } else {
            return res.status(404).json({
                Error: 'Field Id not supliyer'
            });
        }

    } catch (e) {

        res.status(500).json({
            message: `Somethin goes wrong ${e}`,
            data: {}
        });

    }


}

export async function deleteTask(req, res) {

    const idTask = req.params.id;

    try {

        const deleteRowCount = await Task.destroy({
            where: {
                id: idTask
            }
        });

        res.json({
            message: 'Task deleted succesfully',
            data: deleteRowCount
        });

    } catch (e) {

        res.status(500).json({
            message: `Somethin goes wrong error:  ${e}`,
            data: {}
        });
    }

}

export async function getOneTask(req, res) {

    let idTask = req.params.id;

    try {

        if (idTask) {
            let task = await Task.findOne({
                where: {
                    id: idTask
                }
            });

            res.json({
                message: 'Task founded Succesfully',
                data: task
            });

        } else {
            return res.status(404).json({
                Error: 'Field Id not supliyer'
            });
        }
    } catch (e) {

        res.status(404).json({
            message: 'Task not found',
            data: {}
        });

    }


}


export async function getTaskByProject(req, res) {

    let projetId =  req.params.projectid;

    try {

        if(projetId){
        let listTasks =  await Task.findAll({
            where:{
                project_id:projetId
            }
        });


        res.json({
            message:'List tasks founded',
            data:listTasks
        });
    } else {
        return res.status(404).json({
            Error: 'Field Id Project not supliyer'
        });
    }
        
    } catch (e) {

        res.status(404).json({
            message:`Tasks not exists for to this Project ${e}`,
            data:{}
        });
        
    }

}

