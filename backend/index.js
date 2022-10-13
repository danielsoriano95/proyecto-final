var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const jwt = require ('jsonwebtoken');
var cors = require('cors');

mongoose
.connect(
    "mongodb+srv://danielsoriano95:Colombia1995@cluster0.mxi4o.mongodb.net/BD_PROYECTO?retryWrites=true&w=majority"
)
.then(function(db){
    console.log("Conectado a la base de datos");
})
.catch(function(err){
    console.log(err);
})


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/estilos'));
app.use(cors());


//Modelo

var Users = require('./models/User');
const Movimiento = require("./models/movimiento");

//Rutas

app.get('/llamar_usuario/:id', async function(req, res){
  var id = req.params.id;
  var u = await Users.findById(id);
  res.send(u);
});

app.post('/validacion', async function(req, res){
  var u = req.body;
  var user = await Users.findOne({email: u.email});
  var mensaje1 = "no existe el email suministrado";
  var mensaje2 = "no es correcto";
  
  //if (!user) return res.status(401).send('El correo no existe');
  //if (u.password !== user.password) return res.status(401).send('wrong password');

  //jwt.sign({_id: user._id}, 'secretKey');
  //return res.status(200).json({token});

  if (user == null){
    res.send({
      err:mensaje1,
      acceso:false,
    });
  }else if (u.email == user.email  && u.password == user.password){
    
    res.send({acceso:true, id:user._id});
  }else {
    res.send({
      err:mensaje2,
      acceso:false,
    });
  }
});

/*
function verifyToken(req, res, next){
  if (!req.headers.authorization){
      return res.status(401).send('Unauthorize request');
  }

  const token = req.headers.authorization.split('')[1]
  if  (token === 'null'){
      return res.status(401).send('Unauthorize request');
  }
  
  const payload = jwt.verify(token, 'secretKey');
  console.log(payload);

  req.userId = payload._id;
  next();

}
*/

app.post('/crear_usuario', async function (req,res) {
  const {email, password} = req.body; 
  const user = new Users({email, password});
  await user.save();
  console.log(u) 

  const token = jwt.sign({ id:newUser._id}, 'secretKey')
  res.status(200).json({token})
})


//HOME - INGRESOS Y GASTOS

app.get('/obtener_movimiento', async function(req,res){
  var m = await Movimiento.find();
  res.send(m)
})

app.get('/obtener_grafica', async function(req,res){
  var g = await Movimiento.find().select({"concepto":1 ,"monto":1 , "_id":0});
  console.log(g)
  res.send(g)
})

app.post('/crear_movimiento', async function(req,res){
  var datos = req.body;
    console.log(datos)
    var m = new Movimiento(datos);
    await m.save();
    res.send({mensaje :"Movimiento guardado"})

})

app.delete('/eliminar_movimiento/:id',async function(req,res){
  var id_mov = req.params.id;
  await Movimiento.findByIdAndRemove(id_mov);
  res.send({mensaje : "Eliminado Correctamente"})
})

//Listener
app.listen(3000, function(){
    console.log('servidor inciado en el puerto 3000')
})