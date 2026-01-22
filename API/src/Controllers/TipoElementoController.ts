import { Router } from "express";
import {
  CreateTipoElementoUseCase,
  DeleteTipoElementoUseCase,
  GetAllTiposElementoUseCase,
  GetTipoElementoByIdUseCase,
  PatchTipoElementoUseCase,
  UpdateTipoElementoUseCase,
} from "@proodos/application/Ports/TipoElementoUseCases";
import { handleControllerError, respondValidationError } from "./ControllerErrors";

type TipoElementoControllerDeps = {
  createTipoElementoService: CreateTipoElementoUseCase;
  getAllTiposElementoService: GetAllTiposElementoUseCase;
  getTipoElementoByIdService: GetTipoElementoByIdUseCase;
  updateTipoElementoService: UpdateTipoElementoUseCase;
  patchTipoElementoService: PatchTipoElementoUseCase;
  deleteTipoElementoService: DeleteTipoElementoUseCase;
};

export const createTipoElementoController = ({
  createTipoElementoService,
  getAllTiposElementoService,
  getTipoElementoByIdService,
  updateTipoElementoService,
  patchTipoElementoService,
  deleteTipoElementoService,
}: TipoElementoControllerDeps) => {
  const tipoElementoController = Router();

  /**
   * @openapi
   * /api/tipos-elemento:
   *   get:
   *     tags:
   *       - Tipos de Elemento
   *     summary: Obtiene todos los tipos de elemento
   *     responses:
   *       200:
   *         description: Lista de tipos de elemento
   */
  tipoElementoController.get("/", async (req, res) => {
    console.log("[Controller] GET /tipos-elemento");

    try {
      const result = await getAllTiposElementoService.execute();

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
   * /api/tipos-elemento/{id}:
   *   get:
   *     tags:
   *       - Tipos de Elemento
   *     summary: Obtiene un tipo de elemento por ID
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Tipo de elemento encontrado
   *       400:
   *         description: ID inválido
   *       404:
   *         description: No encontrado
   */
  tipoElementoController.get("/:id", async (req, res) => {
    console.log(`[Controller] GET /tipos-elemento/${req.params.id}`);

    const id = Number(req.params.id);
    if (Number.isNaN(id) || id <= 0) {
      return respondValidationError(res, "Invalid id");
    }

    try {
      const result = await getTipoElementoByIdService.execute(id);

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
   * /api/tipos-elemento:
   *   post:
   *     tags:
   *       - Tipos de Elemento
   *     summary: Crea un nuevo tipo de elemento
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - nombre
   *             properties:
   *               nombre:
   *                 type: string
   *     responses:
   *       200:
   *         description: Tipo de elemento creado
   */
  tipoElementoController.post("/", async (req, res) => {
    console.log("[Controller] POST /tipos-elemento");

    const { nombre } = req.body || {};
    if (!nombre) {
      return respondValidationError(res, "Missing required fields", {
        required: ["nombre"],
      });
    }

    try {
      const result = await createTipoElementoService.execute(req.body);

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
   * /api/tipos-elemento/{id}:
   *   put:
   *     tags:
   *       - Tipos de Elemento
   *     summary: Actualiza un tipo de elemento
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
   *               - nombre
   *             properties:
   *               nombre:
   *                 type: string
   *     responses:
   *       200:
   *         description: Tipo de elemento actualizado
   *       400:
   *         description: Request inválida
   *       404:
   *         description: No encontrado
   */
  tipoElementoController.put("/:id", async (req, res) => {
    console.log(`[Controller] PUT /tipos-elemento/${req.params.id}`);

    const id_tipo_elemento = Number(req.params.id);
    if (Number.isNaN(id_tipo_elemento) || id_tipo_elemento <= 0) {
      return respondValidationError(res, "Invalid id");
    }

    const { nombre } = req.body || {};
    if (!nombre) {
      return respondValidationError(res, "Missing required fields", {
        required: ["nombre"],
      });
    }

    try {
      const result = await updateTipoElementoService.execute({
        id_tipo_elemento,
        nombre,
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

  /**
   * @openapi
   * /api/tipos-elemento/{id}:
   *   patch:
   *     tags:
   *       - Tipos de Elemento
   *     summary: Actualiza parcialmente un tipo de elemento
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
   *               nombre:
   *                 type: string
   *     responses:
   *       200:
   *         description: Tipo de elemento actualizado
   *       400:
   *         description: Request inválida
   *       404:
   *         description: No encontrado
   */
  tipoElementoController.patch("/:id", async (req, res) => {
    console.log(`[Controller] PATCH /tipos-elemento/${req.params.id}`);

    const id_tipo_elemento = Number(req.params.id);
    if (Number.isNaN(id_tipo_elemento) || id_tipo_elemento <= 0) {
      return respondValidationError(res, "Invalid id");
    }

    try {
      const result = await patchTipoElementoService.execute(
        id_tipo_elemento,
        req.body || {}
      );

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
   * /api/tipos-elemento/{id}:
   *   delete:
   *     tags:
   *       - Tipos de Elemento
   *     summary: Elimina un tipo de elemento
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       204:
   *         description: Eliminado
   *       400:
   *         description: ID inválido
   */
  tipoElementoController.delete("/:id", async (req, res) => {
    console.log(`[Controller] DELETE /tipos-elemento/${req.params.id}`);

    const id_tipo_elemento = Number(req.params.id);
    if (Number.isNaN(id_tipo_elemento) || id_tipo_elemento <= 0) {
      return respondValidationError(res, "Invalid id");
    }

    try {
      await deleteTipoElementoService.execute(id_tipo_elemento);
      return res.status(204).send();
    } catch (error: any) {
      console.log("[Controller] ERROR:", error);
      return handleControllerError(res, error);
    }
  });

  return tipoElementoController;
};
