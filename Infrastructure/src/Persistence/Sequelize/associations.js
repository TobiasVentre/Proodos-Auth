"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initAssociations = void 0;
const Models_1 = require("../Models");
const initAssociations = () => {
    /**
     * COMONENTE
     * componente.id_tipo_componente → tipo_componente.id_tipo_componente
     */
    Models_1.ComponenteModel.belongsTo(Models_1.TipoComponenteModel, {
        foreignKey: "id_tipo_componente",
        as: "tipoComponente",
    });
    /**
     * componente.id_tipo_variacion → tipo_variacion.id_tipo_variacion
     */
    Models_1.ComponenteModel.belongsTo(Models_1.TipoVariacionModel, {
        foreignKey: "id_tipo_variacion",
        as: "tipoVariacion",
    });
    /**
     * componente.id_plan → plan.id_plan
     */
    Models_1.ComponenteModel.belongsTo(Models_1.PlanModel, {
        foreignKey: "id_plan",
        as: "plan",
    });
    /**
     * tipo_variacion.id_tipo_componente → tipo_componente.id_tipo_componente
     */
    Models_1.TipoVariacionModel.belongsTo(Models_1.TipoComponenteModel, {
        foreignKey: "id_tipo_componente",
        as: "tipoComponente",
    });
    /**
     * elemento_componente.id_componente → componente.id_componente
     */
    Models_1.ElementoComponenteModel.belongsTo(Models_1.ComponenteModel, {
        foreignKey: "id_componente",
        as: "componente",
    });
    Models_1.ElementoComponenteModel.belongsTo(Models_1.TipoElementoModel, {
        foreignKey: "id_tipo_elemento",
        as: "tipoElemento",
    });
    Models_1.ComponenteModel.hasMany(Models_1.ElementoComponenteModel, {
        foreignKey: "id_componente",
        as: "elementos",
    });
    Models_1.TipoElementoModel.hasMany(Models_1.ElementoComponenteModel, {
        foreignKey: "id_tipo_elemento",
        as: "elementos",
    });
    /**
     * componente_compuesto (padre-hijo)
     * componente_compuesto.id_padre → componente.id_componente
     * componente_compuesto.id_hijo → componente.id_componente
     */
    Models_1.ComponenteCompuestoModel.belongsTo(Models_1.ComponenteModel, {
        foreignKey: "id_padre",
        as: "padre",
    });
    Models_1.ComponenteCompuestoModel.belongsTo(Models_1.ComponenteModel, {
        foreignKey: "id_hijo",
        as: "hijo",
    });
    Models_1.ComponenteModel.hasMany(Models_1.ComponenteCompuestoModel, {
        foreignKey: "id_padre",
        as: "hijos",
    });
    Models_1.ComponenteModel.hasMany(Models_1.ComponenteCompuestoModel, {
        foreignKey: "id_hijo",
        as: "padres",
    });
    /**
     * LANDING PAGE
     * landing_page.id_landing → landing_componente.id_landing
     */
    Models_1.LandingPageModel.hasMany(Models_1.LandingComponenteModel, {
        foreignKey: "id_landing",
        as: "landingComponentes",
    });
    Models_1.LandingComponenteModel.belongsTo(Models_1.LandingPageModel, {
        foreignKey: "id_landing",
        as: "landing",
    });
    /**
     * COMPONENTE <-> LANDING_COMOPNENTE
     * componente.id_componente → landing_componente.id_componente
     */
    Models_1.ComponenteModel.hasMany(Models_1.LandingComponenteModel, {
        foreignKey: "id_componente",
        as: "usosEnLandings",
    });
    Models_1.LandingComponenteModel.belongsTo(Models_1.ComponenteModel, {
        foreignKey: "id_componente",
        as: "componente",
    });
};
exports.initAssociations = initAssociations;
