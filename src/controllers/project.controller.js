import Project from '../models/Projects';

export async function createProject(req, res) {

    const { name, priority, description, deliverydate } = req.body;

    try {

        //  modelo.create({datos},{String fields:['arregloDeCamposQueSeQuiereInsertar']}): metodo para crear un nuevo registro
        let newProject = await Project.create({
            name,
            priority,
            description,
            deliverydate
        },
        {
            fields:[
            'name',
            'priority',
            'description',
            'deliverydate'
            ]
        });

        if (newProject) {
            return res.json({
                message: 'Project created succesfully',
                data: newProject

            });
        }
    } catch (e) {

            res.status(500).json({
                message:'Somethin goes wrong',
                data:{}
            });

        }


    }

export async function getProjects(req,res){

    try {
            let listProjects = await Project.findAll();

            res.json({
                data:listProjects
            });        
    } catch (e) {

        res.status(500).json({
            message:'Somethin goes wrong',
            data : {}
        })
        
    }

}    

export async function getOneProject(req,res){
   let idProj =  req.params.id;
try {
    let project = await Project.findOne({
        where:{
            id:idProj
        }
    });
    res.json({
        data:project
    });
} catch (e) {

    res.status(500).json({
        message:'Somethin goes wrong',
        data:{}
    });
    
}

}

export async function deleteProject(req,res){
    let idProj =  req.params.id;

    try {
       let deleteRowCount  = await Project.destroy({
        where:{
            id:idProj
            }
        });

        res.json({

            message: 'Project deleted succesfully',
            count: deleteRowCount
        })

    } catch (e) {

        res.status(500).json({
            message:"Somethin goes wrong",
            data:{}
        });
        
    }
    
    

}

export async function updateProject(req,res){
    let idProj = req.params.id;

    const {name,priority,description,deliverydate} =  req.body;
    
    try {
        
       const listProject = await Project.findAll({
            attributes:['id','name','priority','description','deliverydate'], // popiedad para indicar los campos deseados
            where:{
                id:idProj
            }
        });

        if(listProject.length>0){

            listProject.forEach(async pro => {

                await pro.update({
                    name,priority,description,deliverydate
                });

                
            });

        }

        return res.json({
            message:"Project updated Succesfully",
            data:listProject
        });

    } catch (e) {

        res.status(500).json({
            message:"Somethin goes wrong",
            data:{}
        });
        
    }
}
    
