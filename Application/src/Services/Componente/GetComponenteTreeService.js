"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetComponenteTreeService = void 0;
class GetComponenteTreeService {
    constructor(componenteRepository, compuestoRepository) {
        this.componenteRepository = componenteRepository;
        this.compuestoRepository = compuestoRepository;
    }
    async execute(id_padre) {
        const root = await this.componenteRepository.getById(id_padre);
        if (!root) {
            throw new Error("COMPONENTE_NOT_FOUND");
        }
        const [componentes, relaciones] = await Promise.all([
            this.componenteRepository.getAll(),
            this.compuestoRepository.getAll(),
        ]);
        const componentesMap = new Map();
        componentes.forEach((componente) => {
            componentesMap.set(componente.id_componente, componente);
        });
        componentesMap.set(root.id_componente, root);
        const childrenByParent = new Map();
        relaciones.forEach((rel) => {
            if (!childrenByParent.has(rel.id_padre)) {
                childrenByParent.set(rel.id_padre, []);
            }
            childrenByParent.get(rel.id_padre).push(rel.id_hijo);
        });
        const buildTree = (id, visited) => {
            if (visited.has(id)) {
                return null;
            }
            visited.add(id);
            const componente = componentesMap.get(id);
            if (!componente) {
                return null;
            }
            const hijos = (childrenByParent.get(id) || [])
                .map((childId) => buildTree(childId, visited))
                .filter((node) => Boolean(node));
            return {
                ...componente,
                hijos,
            };
        };
        const tree = buildTree(root.id_componente, new Set());
        if (!tree) {
            throw new Error("COMPONENTE_NOT_FOUND");
        }
        return tree;
    }
}
exports.GetComponenteTreeService = GetComponenteTreeService;
