import Express from "express";
import router from "./router";
import db from "./config/database";
import cors, { corsOptions } from "cors";

const server = Express()

//CONEXION A LA BD
async function conectarBD() {
  try {
    await db.authenticate();
    db.sync();
    console.log("CONEXION A BD EXITOSA");
  } catch (error) {
    console.log("NO SE PUDO CONECTAR A LA BD");
    console.log(error);
  }
}

conectarBD();

//REGLA DE CORS, PARA QUE EL CLIENTE PUEDA CONECTAR AL API Y OBTENER RECURSOS, SIN ESTO EL REACT NO VA A OBTENER DATOS
const corsOptions: corsOptions = {
  origin: function (origin, callback) {
    //SI ES QUE NO TIENE UN DOMINIO O VIENE DEL DOMINIO AUTORIZADO POR NOSOTROS
    if (!origin || origin === process.env.FRONTEND_URL) {
      //PERMITIR
      callback(null, true);
    } else {
      //DENEGAR
      callback(new Error("Error de cors"), false);
    }
  },
};

server.use(cors(corsOptions));

//HABILITAR LA LECTURA DE JSON ENVIADO DESDE EL CLIENTE
server.use(Express.json());

//TODOS LOS REQUEST QUE COMIENZE CON /API SE DEBEN DERIVAR A ROUTER.TS
server.use("/api", router);

export default server