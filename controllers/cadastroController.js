const Cadastros  = require('../models/cadastros.js');

module.exports =  {

    async login(req, res) {
        const { email,senha, online } = req.body;
       
        const user = await Usuarios.findOne({ where: { email } });
    
        if (!user) {
            return res.status(400).send({
                status: 0,
                message: 'E-mail ou senha incorreto! 1 IF  ',
                user: {}
            });
        }
        /*
        const senhaChecada = await bcrypt.compare(senha, user.senha);
        if (!senhaChecada) {
        return res.status(400).send({
            status: 0,
            message: 'E-mail ou senha incorreto! 2 IF',
            user: {}
        });

        }*/
        
        const user_id = user.id;
        
        await Usuarios.update({
            online
        }, {
            where: {
                id: user_id
            }
        });

        },
       
        async index(req, res){
            const cadastro = await Cadastros.findAll();
            if(cadastro == '' || cadastro == null){
               
                return res.status(200).send({message: 'Nenhum usuário cadastrado'})
            }
            return res.status(200).send({cadastro});

        },
        async store(req, res){
            const {nomeCompleto,email, senha, confirmarSenha} = req.body;
        const cadastro = await Cadastros.create({
            nomeCompleto,email, senha, confirmarSenha});
            return res.status(200).send({
            status:1,
            message: 'Usuário cadastrado ', cadastro })

        },
       
        async update(req, res){
            const {nomeCompleto,email, senha, confirmarSenha} = req.body;
            const {cadastro_id} = req.params;
            await Cadastros.update({
                nomeCompleto,email, senha, confirmarSenha
            }, {
                where: {
                    id:cadastro_id
                } 
    
        });
        return res.status(200).send({
            status:1,
            message: 'Usuário atualizado'});

        },

    
            async delete(req, res){
            const {cadastro_id} = req.params;
            await Cadastros.destroy({
                where:{
                    id:cadastro_id
                }
            });
           
            return res.status(200).send({
                status:1,
                message: 'Usuário deletado'});
            }

}




    
    
    