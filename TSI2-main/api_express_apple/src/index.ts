import server from "./server";
import { Request } from "express";

server.listen(3000, () => {
  console.log("Inicio API Express");
});

declare global {
  namespace Express {
    interface Request {
      usuario?: {
        cod_usuario: string;
        tipo_usuario: number;
      };
    }
  }
}
