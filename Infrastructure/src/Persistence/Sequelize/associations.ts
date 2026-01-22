import {
  ComponenteModel,
  LandingPageModel,
  LandingComponenteModel,
  TipoComponenteModel,
  TipoVariacionModel,
  ElementoComponenteModel,
  ComponenteCompuestoModel,
  PlanModel,
  TipoElementoModel,
} from "../Models";

export const initAssociations = () => {
  /**
   * COMONENTE
   * componente.id_tipo_componente → tipo_componente.id_tipo_componente
   */
  ComponenteModel.belongsTo(TipoComponenteModel, {
    foreignKey: "id_tipo_componente",
    as: "tipoComponente",
  });

  /**
   * componente.id_tipo_variacion → tipo_variacion.id_tipo_variacion
   */
  ComponenteModel.belongsTo(TipoVariacionModel, {
    foreignKey: "id_tipo_variacion",
    as: "tipoVariacion",
  });

  /**
   * componente.id_plan → plan.id_plan
   */
  ComponenteModel.belongsTo(PlanModel, {
    foreignKey: "id_plan",
    as: "plan",
  });

  /**
   * tipo_variacion.id_tipo_componente → tipo_componente.id_tipo_componente
   */
  TipoVariacionModel.belongsTo(TipoComponenteModel, {
    foreignKey: "id_tipo_componente",
    as: "tipoComponente",
  });

  /**
   * elemento_componente.id_componente → componente.id_componente
   */
  ElementoComponenteModel.belongsTo(ComponenteModel, {
    foreignKey: "id_componente",
    as: "componente",
  });

  ElementoComponenteModel.belongsTo(TipoElementoModel, {
    foreignKey: "id_tipo_elemento",
    as: "tipoElemento",
  });

  ComponenteModel.hasMany(ElementoComponenteModel, {
    foreignKey: "id_componente",
    as: "elementos",
  });

  TipoElementoModel.hasMany(ElementoComponenteModel, {
    foreignKey: "id_tipo_elemento",
    as: "elementos",
  });

  /**
   * componente_compuesto (padre-hijo)
   * componente_compuesto.id_padre → componente.id_componente
   * componente_compuesto.id_hijo → componente.id_componente
   */
  ComponenteCompuestoModel.belongsTo(ComponenteModel, {
    foreignKey: "id_padre",
    as: "padre",
  });

  ComponenteCompuestoModel.belongsTo(ComponenteModel, {
    foreignKey: "id_hijo",
    as: "hijo",
  });

  ComponenteModel.hasMany(ComponenteCompuestoModel, {
    foreignKey: "id_padre",
    as: "hijos",
  });

  ComponenteModel.hasMany(ComponenteCompuestoModel, {
    foreignKey: "id_hijo",
    as: "padres",
  });

  /**
   * LANDING PAGE
   * landing_page.id_landing → landing_componente.id_landing
   */
  LandingPageModel.hasMany(LandingComponenteModel, {
    foreignKey: "id_landing",
    as: "landingComponentes",
  });

  LandingComponenteModel.belongsTo(LandingPageModel, {
    foreignKey: "id_landing",
    as: "landing",
  });

  /**
   * COMPONENTE <-> LANDING_COMOPNENTE
   * componente.id_componente → landing_componente.id_componente
   */
  ComponenteModel.hasMany(LandingComponenteModel, {
    foreignKey: "id_componente",
    as: "usosEnLandings",
  });

  LandingComponenteModel.belongsTo(ComponenteModel, {
    foreignKey: "id_componente",
    as: "componente",
  });
};
