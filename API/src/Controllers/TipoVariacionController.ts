import { Router } from "express";
import {
  CreateTipoVariacionUseCase,
  GetAllTiposVariacionUseCase,
  GetTipoVariacionByIdUseCase,
  GetVariacionesByTipoComponenteUseCase,
  PatchTipoVariacionUseCase,
  UpdateTipoVariacionUseCase,
} from "@proodos/application/Ports/TipoVariacionUseCases";
import { handleControllerError, respondValidationError } from "./ControllerErrors";

type TipoVariacionControllerDeps = {
  createTipoVariacionService: CreateTipoVariacionUseCase;
  getAllTiposVariacionService: GetAllTiposVariacionUseCase;
  getTipoVariacionByIdService: GetTipoVariacionByIdUseCase;
  getVariacionesByTipoComponenteService: GetVariacionesByTipoComponenteUseCase;
  updateTipoVariacionService: UpdateTipoVariacionUseCase;
  patchTipoVariacionService: PatchTipoVariacionUseCase;
};

export const createTipoVariacionController = ({
  createTipoVariacionService,
  getAllTiposVariacionService,
  getTipoVariacionByIdService,
  getVariacionesByTipoComponenteService,
  updateTipoVariacionService,
  patchTipoVariacionService,
}: TipoVariacionControllerDeps) => {
  const tipoVariacionController = Router();

  /**
   * @openapi
   * /api/tipos-variacion:
   *   get:
   *     tags:
   *       - Tipos de Variación
   *     summary: Obtiene todas las variaciones o filtra por tipo de componente
   *     parameters:
   *       - name: id_tipo_componente
   *         in: query
   *         required: false
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Lista de variaciones
   */
  tipoVariacionController.get("/", async (req, res) => {
    console.log("[Controller] GET /tipos-variacion");

    const idTipoComponenteRaw = req.query?.id_tipo_componente;
    const id_tipo_componente = idTipoComponenteRaw
      ? Number(idTipoComponenteRaw)
      : undefined;

    if (
      id_tipo_componente !== undefined &&
      (Number.isNaN(id_tipo_componente) || id_tipo_componente <= 0)
    ) {
      return respondValidationError(res, "Invalid id_tipo_componente");
    }

    try {
      const result = id_tipo_componente
        ? await getVariacionesByTipoComponenteService.execute(id_tipo_componente)
        : await getAllTiposVariacionService.execute();

      return res.status(200).json({
        message: "OK",
        data: result,
      });
    } catch (error: any) {
      console.log("[Controller] ERROR:", error);
      return handleControllerError(res, error);
    }
  });

  /**
   * @openapi
   * /api/tipos-variacion/{id}:
   *   get:
   *     tags:
   *       - Tipos de Variación
   *     summary: Obtiene una variación por ID
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Variación encontrada
   *       400:
   *         description: ID inválido
   *       404:
   *         description: No encontrado
   */
  tipoVariacionController.get("/:id", async (req, res) => {
    console.log(`[Controller] GET /tipos-variacion/${req.params.id}`);

    const id = Number(req.params.id);
    if (Number.isNaN(id) || id <= 0) {
      return respondValidationError(res, "Invalid id");
    }

    try {
      const result = await getTipoVariacionByIdService.execute(id);

      if (!result) {
        return res.status(404).json({ error: "Not found" });
      }

      return res.status(200).json({
        message: "OK",
        data: result,
      });
    } catch (error: any) {
      console.log("[Controller] ERROR:", error);
      return handleControllerError(res, error);
    }
  });

  /**
   * @openapi
   * /api/tipos-variacion:
   *   post:
   *     tags:
   *       - Tipos de Variación
   *     summary: Crea una nueva variación
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - id_tipo_componente
   *               - nombre
   *             properties:
   *               id_tipo_componente:
   *                 type: integer
   *               nombre:
   *                 type: string
   *               descripcion:
   *                 type: string
   *               css_url:
   *                 type: string
   *               js_url:
   *                 type: string
   *               html:
   *                 type: string
   *     responses:
   *       200:
   *         description: Variación creada
   */
  tipoVariacionController.post("/", async (req, res) => {
    console.log("[Controller] POST /tipos-variacion");

    const { id_tipo_componente, nombre } = req.body || {};
    if (!id_tipo_componente || !nombre) {
      return respondValidationError(res, "Missing required fields", {
        required: ["id_tipo_componente", "nombre"],
      });
    }

    try {
      const result = await createTipoVariacionService.execute(req.body);

      return res.status(200).json({
        message: "OK",
        data: result,
      });
    } catch (error: any) {
      console.log("[Controller] ERROR:", error);

      if (error?.message === "TIPO_COMPONENTE_NOT_FOUND") {
        return res.status(404).json({ error: "Tipo componente not found" });
      }

      return handleControllerError(res, error);
    }
  });

  /**
   * @openapi
   * /api/tipos-variacion/{id}:
   *   put:
   *     tags:
   *       - Tipos de Variación
   *     summary: Actualiza una variación
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
   *             type: object
   *             required:
   *               - id_tipo_componente
   *               - nombre
   *             properties:
   *               id_tipo_componente:
   *                 type: integer
   *               nombre:
   *                 type: string
   *               descripcion:
   *                 type: string
   *               css_url:
   *                 type: string
   *               js_url:
   *                 type: string
   *               html:
   *                 type: string
   *     responses:
   *       200:
   *         description: Variación actualizada
   *       400:
   *         description: Request inválida
   *       404:
   *         description: No encontrado
   */
  tipoVariacionController.put("/:id", async (req, res) => {
    console.log(`[Controller] PUT /tipos-variacion/${req.params.id}`);

    const id_tipo_variacion = Number(req.params.id);
    if (Number.isNaN(id_tipo_variacion) || id_tipo_variacion <= 0) {
      return respondValidationError(res, "Invalid id");
    }

    const { id_tipo_componente, nombre } = req.body || {};
    if (!id_tipo_componente || !nombre) {
      return respondValidationError(res, "Missing required fields", {
        required: ["id_tipo_componente", "nombre"],
      });
    }

    try {
      const result = await updateTipoVariacionService.execute({
        id_tipo_variacion,
        ...req.body,
      });

      return res.status(200).json({
        message: "OK",
        data: result,
      });
    } catch (error: any) {
      console.log("[Controller] ERROR:", error);

      if (error?.message === "TIPO_COMPONENTE_NOT_FOUND") {
        return res.status(404).json({ error: "Tipo componente not found" });
      }
      if (String(error?.message || "").includes("not found")) {
        return res.status(404).json({ error: "Not found" });
      }

      return handleControllerError(res, error);
    }
  });

  /**
   * @openapi
   * /api/tipos-variacion/{id}:
   *   patch:
   *     tags:
   *       - Tipos de Variación
   *     summary: Actualiza parcialmente una variación
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
   *             type: object
   *             properties:
   *               id_tipo_componente:
   *                 type: integer
   *               nombre:
   *                 type: string
   *               descripcion:
   *                 type: string
   *               css_url:
   *                 type: string
   *               js_url:
   *                 type: string
   *               html:
   *                 type: string
   *     responses:
   *       200:
   *         description: Variación actualizada
   *       400:
   *         description: Request inválida
   *       404:
   *         description: No encontrado
   */
  tipoVariacionController.patch("/:id", async (req, res) => {
    console.log(`[Controller] PATCH /tipos-variacion/${req.params.id}`);

    const id_tipo_variacion = Number(req.params.id);
    if (Number.isNaN(id_tipo_variacion) || id_tipo_variacion <= 0) {
      return respondValidationError(res, "Invalid id");
    }

    try {
      const result = await patchTipoVariacionService.execute(
        id_tipo_variacion,
        req.body || {}
      );

      return res.status(200).json({
        message: "OK",
        data: result,
      });
    } catch (error: any) {
      console.log("[Controller] ERROR:", error);

      if (error?.message === "TIPO_COMPONENTE_NOT_FOUND") {
        return res.status(404).json({ error: "Tipo componente not found" });
      }
      if (String(error?.message || "").includes("not found")) {
        return res.status(404).json({ error: "Not found" });
      }
      if (String(error?.message || "").includes("No fields provided")) {
        return respondValidationError(res, "No fields provided");
      }

      return handleControllerError(res, error);
    }
  });

  return tipoVariacionController;
};
