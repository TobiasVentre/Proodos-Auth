import { Router } from "express";
import {
  CreatePlanUseCase,
  GetAllPlansUseCase,
  GetPlanByIdUseCase,
  PatchPlanUseCase,
  UpdatePlanUseCase,
} from "@proodos/application/Ports/PlanUseCases";
import { GetComponentesByPlanUseCase } from "@proodos/application/Ports/ComponenteUseCases";
import { handleControllerError, respondValidationError } from "./ControllerErrors";

const requiredPlanFields = [
  "nombre",
  "capacidad",
  "capacidad_anterior",
  "precio_full_price",
  "precio_oferta",
  "aumento",
  "precio_sin_iva",
];

type PlanControllerDeps = {
  createPlanService: CreatePlanUseCase;
  getAllPlansService: GetAllPlansUseCase;
  getPlanByIdService: GetPlanByIdUseCase;
  patchPlanService: PatchPlanUseCase;
  updatePlanService: UpdatePlanUseCase;
  getComponentesByPlanService: GetComponentesByPlanUseCase;
};

export const createPlanController = ({
  createPlanService,
  getAllPlansService,
  getPlanByIdService,
  patchPlanService,
  updatePlanService,
  getComponentesByPlanService,
}: PlanControllerDeps) => {
  const planController = Router();

  /**
   * @openapi
   * /api/planes:
   *   get:
   *     tags:
   *       - Planes
   *     summary: Obtiene todos los planes
   *     responses:
   *       200:
   *         description: Lista de planes
   */
  planController.get("/", async (req, res) => {
    console.log("[Controller] GET /planes");

    try {
      const result = await getAllPlansService.execute();

      return res.status(200).json({
        message: "OK",
        data: result,
      });
    } catch (error) {
      console.log("[Controller] ERROR:", error);
      return handleControllerError(res, error);
    }
  });

  /**
   * @openapi
   * /api/planes/{id}:
   *   get:
   *     tags:
   *       - Planes
   *     summary: Obtiene un plan por ID
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Plan encontrado
   *       400:
   *         description: ID inválido
   *       404:
   *         description: No encontrado
   */
  planController.get("/:id", async (req, res) => {
    console.log(`[Controller] GET /planes/${req.params.id}`);

    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id) || id <= 0) {
        return respondValidationError(res, "Invalid id");
      }

      const result = await getPlanByIdService.execute(id);

      if (!result) {
        return res.status(404).json({ error: "Not found" });
      }

      return res.status(200).json({
        message: "OK",
        data: result,
      });
    } catch (error) {
      console.log("[Controller] ERROR:", error);
      return handleControllerError(res, error);
    }
  });

  /**
   * @openapi
   * /api/planes/{id}/componentes:
   *   get:
   *     tags:
   *       - Planes
   *     summary: Obtiene los componentes asociados a un plan
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Lista de componentes
   *       400:
   *         description: ID inválido
   *       404:
   *         description: Plan no encontrado
   */
  planController.get("/:id/componentes", async (req, res) => {
    console.log(`[Controller] GET /planes/${req.params.id}/componentes`);

    const id = Number(req.params.id);
    if (Number.isNaN(id) || id <= 0) {
      return respondValidationError(res, "Invalid id");
    }

    try {
      const plan = await getPlanByIdService.execute(id);

      if (!plan) {
        return res.status(404).json({ error: "Not found" });
      }

      const result = await getComponentesByPlanService.execute(id);

      return res.status(200).json({
        message: "OK",
        data: result,
      });
    } catch (error) {
      console.log("[Controller] ERROR:", error);
      return handleControllerError(res, error);
    }
  });

  /**
   * @openapi
   * /api/planes:
   *   post:
   *     tags:
   *       - Planes
   *     summary: Crea un nuevo plan
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreatePlanDTO'
   *     responses:
   *       200:
   *         description: Plan creado
   */
  planController.post("/", async (req, res) => {
    console.log("[Controller] POST /planes");

    const missingFields = requiredPlanFields.filter(
      (field) => req.body?.[field] === undefined
    );

    if (missingFields.length > 0) {
      return respondValidationError(res, "Missing required fields", {
        required: missingFields,
      });
    }

    try {
      const result = await createPlanService.execute(req.body);

      return res.status(200).json({
        message: "OK",
        data: result,
      });
    } catch (error) {
      console.log("[Controller] ERROR:", error);
      return handleControllerError(res, error);
    }
  });

  /**
   * @openapi
   * /api/planes/{id}:
   *   patch:
   *     tags:
   *       - Planes
   *     summary: Actualiza parcialmente un plan
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/PatchPlanDTO'
   *     responses:
   *       200:
   *         description: Plan actualizado parcialmente
   *       400:
   *         description: Request inválida
   *       404:
   *         description: No encontrado
   */
  planController.patch("/:id", async (req, res) => {
    console.log(`[Controller] PATCH /planes/${req.params.id}`);

    const id = Number(req.params.id);
    if (Number.isNaN(id) || id <= 0) {
      return respondValidationError(res, "Invalid id");
    }

    try {
      const result = await patchPlanService.execute(id, req.body);

      return res.status(200).json({
        message: "OK",
        data: result,
      });
    } catch (error: any) {
      console.log("[Controller] ERROR:", error);

      if (String(error?.message || "").includes("not found")) {
        return res.status(404).json({ error: "Not found" });
      }
      if (String(error?.message || "").includes("No fields provided")) {
        return respondValidationError(res, "No fields provided");
      }

      return handleControllerError(res, error);
    }
  });

  /**
   * @openapi
   * /api/planes/{id}:
   *   put:
   *     tags:
   *       - Planes
   *     summary: Actualiza un plan
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdatePlanDTO'
   *     responses:
   *       200:
   *         description: Plan actualizado
   *       400:
   *         description: Request inválida
   *       404:
   *         description: No encontrado
   */
  planController.put("/:id", async (req, res) => {
    console.log(`[Controller] PUT /planes/${req.params.id}`);

    const id = Number(req.params.id);
    if (Number.isNaN(id) || id <= 0) {
      return respondValidationError(res, "Invalid id");
    }

    const missingFields = requiredPlanFields.filter(
      (field) => req.body?.[field] === undefined
    );

    if (missingFields.length > 0) {
      return respondValidationError(res, "Missing required fields", {
        required: missingFields,
      });
    }

    try {
      const result = await updatePlanService.execute({
        id_plan: id,
        ...req.body,
      });

      return res.status(200).json({
        message: "OK",
        data: result,
      });
    } catch (error: any) {
      console.log("[Controller] ERROR:", error);

      if (String(error?.message || "").includes("not found")) {
        return res.status(404).json({ error: "Not found" });
      }

      return handleControllerError(res, error);
    }
  });

  return planController;
};
