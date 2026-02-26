import { Router } from "express";
import { RolesService } from "@proodos/application/Services/Auth/RolesService";
import { authenticateJWT, getAdminRoles, requireAnyRole } from "@proodos/api/Middleware/auth";

interface RolesControllerDeps {
  rolesService: RolesService;
}

export const createRolesController = ({ rolesService }: RolesControllerDeps) => {
  const router = Router();
  const adminRoles = getAdminRoles();

  router.use(authenticateJWT);

  /**
   * @openapi
   * /api/roles:
   *   get:
   *     summary: Listar roles disponibles.
   *     tags:
   *       - Roles
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Lista de roles.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Role'
   */
  router.get("/", async (_req, res) => {
    try {
      const roles = await rolesService.listRoles();
      return res.status(200).json({ data: roles });
    } catch (error) {
      return res.status(500).json({ error: true, message: "No se pudieron listar roles." });
    }
  });

  /**
   * @openapi
   * /api/roles:
   *   post:
   *     summary: Crear un rol.
   *     tags:
   *       - Roles
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Role'
   *     responses:
   *       201:
   *         description: Rol creado.
   */
  router.post("/", requireAnyRole(adminRoles), async (req, res) => {
    try {
      const { name, description } = req.body as { name?: string; description?: string };
      const role = await rolesService.createRole(name ?? "", description ?? null);
      return res.status(201).json({ data: role });
    } catch (error) {
      return res.status(400).json({ error: true, message: (error as Error).message });
    }
  });

  /**
   * @openapi
   * /api/roles/assign:
   *   post:
   *     summary: Asignar un rol a un usuario LDAP.
   *     tags:
   *       - Roles
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/RoleAssignmentRequest'
   *     responses:
   *       201:
   *         description: Asignación creada.
   */
  router.post("/assign", requireAnyRole(adminRoles), async (req, res) => {
    try {
      const { username, roleId } = req.body as { username?: string; roleId?: number };
      const assignment = await rolesService.assignRole(username ?? "", Number(roleId));
      return res.status(201).json({ data: assignment });
    } catch (error) {
      return res.status(400).json({ error: true, message: (error as Error).message });
    }
  });

  return router;
};
