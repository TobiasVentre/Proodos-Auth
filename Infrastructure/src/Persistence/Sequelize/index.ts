import { sequelize } from "../../Config/SequelizeConfig";
import * as models from "../Models";
import { initAssociations } from "./associations";



export const initModels = async () => {
  await sequelize.authenticate();
  console.log("[DB] authenticate OK");
  Object.values(models).forEach((m: any) => {
    if (typeof m.initModel === "function") m.initModel(sequelize);
  });

  initAssociations();
};

export { sequelize };
