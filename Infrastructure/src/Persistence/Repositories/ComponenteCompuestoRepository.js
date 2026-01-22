"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponenteCompuestoRepository = void 0;
const Models_1 = require("../Models");
class ComponenteCompuestoRepository {
    async assign(id_padre, id_hijo) {
        const [row, created] = await Models_1.ComponenteCompuestoModel.findOrCreate({
            where: { id_padre, id_hijo },
            defaults: { id_padre, id_hijo },
        });
        return { created };
    }
    async unassign(id_padre, id_hijo) {
        await Models_1.ComponenteCompuestoModel.destroy({ where: { id_padre, id_hijo } });
    }
    async getAll() {
        const rows = await Models_1.ComponenteCompuestoModel.findAll();
        return rows.map((row) => ({
            id_padre: row.id_padre,
            id_hijo: row.id_hijo,
        }));
    }
}
exports.ComponenteCompuestoRepository = ComponenteCompuestoRepository;
