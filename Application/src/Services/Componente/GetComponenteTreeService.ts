import { Componente } from "@proodos/domain/Entities/Componente";
import { IComponenteRepository } from "../../Interfaces/IComponenteRepository";
import { IComponenteCompuestoRepository } from "../../Interfaces/IComponenteCompuestoRepository";

export type ComponenteTreeNode = Componente & { hijos: ComponenteTreeNode[] };

export class GetComponenteTreeService {
  constructor(
    private readonly componenteRepository: IComponenteRepository,
    private readonly compuestoRepository: IComponenteCompuestoRepository
  ) {}

  async execute(id_padre: number): Promise<ComponenteTreeNode> {
    const root = await this.componenteRepository.getById(id_padre);
    if (!root) {
      throw new Error("COMPONENTE_NOT_FOUND");
    }

    const [componentes, relaciones] = await Promise.all([
      this.componenteRepository.getAll(),
      this.compuestoRepository.getAll(),
    ]);

    const componentesMap = new Map<number, Componente>();
    componentes.forEach((componente) => {
      componentesMap.set(componente.id_componente, componente);
    });
    componentesMap.set(root.id_componente, root);

    const childrenByParent = new Map<number, number[]>();
    relaciones.forEach((rel) => {
      if (!childrenByParent.has(rel.id_padre)) {
        childrenByParent.set(rel.id_padre, []);
      }
      childrenByParent.get(rel.id_padre)!.push(rel.id_hijo);
    });

    const buildTree = (id: number, visited: Set<number>): ComponenteTreeNode | null => {
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
        .filter((node): node is ComponenteTreeNode => Boolean(node));

      return {
        ...componente,
        hijos,
      };
    };

    const tree = buildTree(root.id_componente, new Set<number>());

    if (!tree) {
      throw new Error("COMPONENTE_NOT_FOUND");
    }

    return tree;
  }
}
