"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandingComponenteRepository = void 0;
const Models_1 = require("../Models");
const LandingComponenteMapper_1 = require("../../Mappers/LandingComponenteMapper");
class LandingComponenteRepository {
    async assign(entity) {
        await Models_1.LandingComponenteModel.create({
            id_landing: entity.id_landing,
            id_componente: entity.id_componente,
        });
        const created = await Models_1.LandingComponenteModel.findOne({
            where: { id_landing: entity.id_landing, id_componente: entity.id_componente },
            include: [
                { model: Models_1.LandingPageModel, as: "landing", required: false },
                { model: Models_1.ComponenteModel, as: "componente", required: false },
            ],
        });
        if (!created) {
            throw new Error("LANDING_COMPONENTE_NOT_FOUND");
        }
        return LandingComponenteMapper_1.LandingComponenteMapper.toDomain(created);
    }
    async unassign(id_landing, id_componente) {
        await Models_1.LandingComponenteModel.destroy({
            where: { id_landing, id_componente },
        });
    }
    async getByLanding(id_landing) {
        const rows = await Models_1.LandingComponenteModel.findAll({
            where: { id_landing },
            include: [
                { model: Models_1.LandingPageModel, as: "landing", required: false },
                { model: Models_1.ComponenteModel, as: "componente", required: false },
            ],
        });
        return rows.map((r) => LandingComponenteMapper_1.LandingComponenteMapper.toDomain(r));
    }
    async getByComponente(id_componente) {
        const rows = await Models_1.LandingComponenteModel.findAll({
            where: { id_componente },
            include: [
                { model: Models_1.LandingPageModel, as: "landing", required: false },
                { model: Models_1.ComponenteModel, as: "componente", required: false },
            ],
        });
        return rows.map((r) => LandingComponenteMapper_1.LandingComponenteMapper.toDomain(r));
    }
    async exists(id_landing, id_componente) {
        const row = await Models_1.LandingComponenteModel.findOne({
            where: { id_landing, id_componente },
        });
        return row !== null;
    }
    async existsByComponente(id_componente) {
        const row = await Models_1.LandingComponenteModel.findOne({
            where: { id_componente },
        });
        return row !== null;
    }
}
exports.LandingComponenteRepository = LandingComponenteRepository;
