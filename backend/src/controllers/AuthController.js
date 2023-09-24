const Auth = require('../models/UserDB');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    async login (req, res){
        const { email, password } = req.body;
        
        // validations
        if (!email) {
          return res.status(422).json({ msg: "O email é obrigatório!" });
        }
    
        if (!password) {
          return res.status(422).json({ msg: "A senha é obrigatória!" });
        }
    
        // check if user exists
        const user = await Auth.findOne({ email: email });
        
        if (!user) {
          return res.status(404).json({ msg: "Usuário não encontrado!" });
        }
    
        // check if password match
        const checkPassword = await bcrypt.compare(password, user.password);
        const userId = user.id;

        
        if (!checkPassword) {
          return res.status(422).json({ msg: "Senha inválida" });
        }
    
        try {
          const secret = process.env.SECRET;
          
          const token = jwt.sign(
            {
              id: user._id,
            },
            secret
          );
        
          res.status(200).json({ msg: "Autenticação realizada com sucesso!", token, userId});

        } catch (error) {
          res.status(500).json({ msg: error });
        }
    },

    async userCheck (req, res){
        const id = req.params.id;
    
        // check if user exists
        const user = await Auth.findById(id, "-password");
    
        if (!user) {
          return res.status(404).json({ msg: "Usuário não encontrado!" });
        }
    
        res.status(200).json({ user });
    },
    
    async register (req, res){
        const { name, email, password, confirmpassword } = req.body;
    
        // validations
        if (!name) {
          return res.status(422).json({ msg: "O nome é obrigatório!" });
        
        }
    
        if (!email) {
          return res.status(422).json({ msg: "O email é obrigatório!" });
        }
    
        if (!password) {
          return res.status(422).json({ msg: "A senha é obrigatória!" });
        }
    
        if (password != confirmpassword) {
          return res
            .status(422)
            .json({ msg: "A senha e a confirmação precisam ser iguais!" });
        }
    
        // check if user exists
        const userExists = await Auth.findOne({ email: email });
    
        if (userExists) {
          return res.status(422).json({ msg: "Por favor, utilize outro e-mail!" });
        }
    
        // create password
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);
    
        // create user
        const user = new Auth({
          name,
          email,
          password: passwordHash,
        });
    
        try {
          await user.save();
        
          res.status(201).json({ msg: "Usuário criado com sucesso!" });
        } catch (error) {
          res.status(500).json({ msg: error });
        }
    },
    
    /*async listUser (req, res){
        const username = req.params.username;
    
        try {
          // Buscar usuário pelo nome de usuário
          const user = await Auth.findOne({ name: username }, "-password");
        
          if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado!" });
          }
      
          res.status(200).json({ user });
        } catch (error) {
          res.status(500).json({ msg: res.error });
        }
        if (!user) {
          return res.status(404).json({ msg: "Usuário não encontrado!" });
        }
    
        res.status(200).json({ user });
    },*/
}
  
  
  
  