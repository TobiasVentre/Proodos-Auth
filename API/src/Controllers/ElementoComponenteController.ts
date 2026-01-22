import { Router } from "express";
import {
  CreateElementoComponenteUseCase,
  DeleteElementoComponenteUseCase,
  GetAllElementosComponenteUseCase,
  GetElementoComponenteByIdUseCase,
  GetElementosByComponenteUseCase,
  PatchElementoComponenteUseCase,
  UpdateElementoComponenteUseCase,
} from "@proodos/application/Ports/ElementoComponenteUseCases";
import { handleControllerError, respondValidationError } from "./ControllerErrors";

type ElementoComponenteControllerDeps = {
  createElementoComponenteService: CreateElementoComponenteUseCase;
  getAllElementosComponenteService: GetAllElementosComponenteUseCase;
  getElementoComponenteByIdService: GetElementoComponenteByIdUseCase;
  getElementosByComponenteService: GetElementosByComponenteUseCase;
  updateElementoComponenteService: UpdateElementoComponenteUseCase;
  patchElementoComponenteService: PatchElementoComponenteUseCase;
  deleteElementoComponenteService: DeleteElementoComponenteUseCase;
};

export const createElementoComponenteController = ({
  createElementoComponenteService,
  getAllElementosComponenteService,
  getElementoComponenteByIdService,
  getElementosByComponenteService,
  updateElementoComponenteService,
  patchElementoComponenteService,
  deleteElementoComponenteService,
}: ElementoComponenteControllerDeps) => {
  const elementoComponenteController = Router();

  /**
   * @openapi
   * /api/elementos-componente:
   *   get:
   *     tags:
   *       - Elementos de Componente
   *     summary: Obtiene todos los elementos o filtra por componente
   *     parameters:
   *       - name: id_componente
   *         in: query
   *         required: false
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Lista de elementos
   */
  elementoComponenteController.get("/", async (req, res) => {
    console.log("[Controller] GET /elementos-componente");

    const idComponenteRaw = req.query?.id_componente;
    const id_componente = idComponenteRaw ? Number(idComponenteRaw) : undefined;

    if (
      id_componente !== undefined &&
      (Number.isNaN(id_componente) || id_componente <= 0)
    ) {
      return respondValidationError(res, "Invalid id_componente");
    }

    try {
      const result = id_componente
        ? await getElementosByComponenteService.execute(id_componente)
        : await getAllElementosComponenteService.execute();

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
   * /api/elementos-componente/{id}:
   *   get:
   *     tags:
   *       - Elementos de Componente
   *     summary: Obtiene un elemento por ID
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Elemento encontrado
   *       400:
   *         description: ID inválido
   *       404:
   *         description: No encontrado
   */
  elementoComponenteController.get("/:id", async (req, res) => {
    console.log(`[Controller] GET /elementos-componente/${req.params.id}`);

    const id = Number(req.params.id);
    if (Number.isNaN(id) || id <= 0) {
      return respondValidationError(res, "Invalid id");
    }

    try {
      const result = await getElementoComponenteByIdService.execute(id);

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
   * /api/elementos-componente:
   *   post:
   *     tags:
   *       - Elementos de Componente
   *     summary: Crea un nuevo elemento de componente
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - id_componente
   *               - id_tipo_elemento
   *               - nombre
   *               - icono_img
   *               - descripcion
   *               - link
   *               - orden
   *               - css_url
   *             properties:
   *               id_componente:
   *                 type: integer
   *               id_tipo_elemento:
   *                 type: integer
   *               nombre:
   *                 type: string
   *               icono_img:
   *                 type: string
   *               descripcion:
   *                 type: string
   *               link:
   *                 type: string
   *               orden:
   *                 type: integer
   *               css_url:
   *                 type: string
   *     responses:
   *       200:
   *         description: Elemento creado
   */
  elementoComponenteController.post("/", async (req, res) => {
    console.log("[Controller] POST /elementos-componente");

    const {
      id_componente,
      id_tipo_elemento,
      nombre,
      icono_img,
      descripcion,
      link,
      orden,
      css_url,
    } = req.body || {};

    if (
      !id_componente ||
      !id_tipo_elemento ||
      !nombre ||
      !icono_img ||
      !descripcion ||
      !link ||
      orden === undefined ||
      !css_url
    ) {
      return respondValidationError(res, "Missing required fields", {
        required: [
          "id_componente",
          "id_tipo_elemento",
          "nombre",
          "icono_img",
          "descripcion",
          "link",
          "orden",
          "css_url",
        ],
      });
    }

    try {
      const result = await createElementoComponenteService.execute(req.body);

      return res.status(200).json({
        message: "OK",
        data: result,
      });
    } catch (error: any) {
      console.log("[Controller] ERROR:", error);

      if (error?.message === "COMPONENTE_NOT_FOUND") {
        return res.status(404).json({ error: "Componente not found" });
      }
      if (error?.message === "TIPO_ELEMENTO_NOT_FOUND") {
        return res.status(404).json({ error: "Tipo elemento not found" });
      }

      return handleControllerError(res, error);
    }
  });

  /**
   * @openapi
   * /api/elementos-componente/{id}:
   *   put:
   *     tags:
   *       - Elementos de Componente
   *     summary: Actualiza un elemento de componente
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
   *               - id_componente
   *               - id_tipo_elemento
   *               - nombre
   *               - icono_img
   *               - descripcion
   *               - link
   *               - orden
   *               - css_url
   *             properties:
   *               id_componente:
   *                 type: integer
   *               id_tipo_elemento:
   *                 type: integer
   *               nombre:
   *                 type: string
   *               icono_img:
   *                 type: string
   *               descripcion:
   *                 type: string
   *               link:
   *                 type: string
   *               orden:
   *                 type: integer
   *               css_url:
   *                 type: string
   *     responses:
   *       200:
   *         description: Elemento actualizado
   *       400:
   *         description: Request inválida
   *       404:
   *         description: No encontrado
   */
  elementoComponenteController.put("/:id", async (req, res) => {
    console.log(`[Controller] PUT /elementos-componente/${req.params.id}`);

    const id_elemento = Number(req.params.id);
    if (Number.isNaN(id_elemento) || id_elemento <= 0) {
      return respondValidationError(res, "Invalid id");
    }

    const {
      id_componente,
      id_tipo_elemento,
      nombre,
      icono_img,
      descripcion,
      link,
      orden,
      css_url,
    } = req.body || {};

    if (
      !id_componente ||
      !id_tipo_elemento ||
      !nombre ||
      !icono_img ||
      !descripcion ||
      !link ||
      orden === undefined ||
      !css_url
    ) {
      return respondValidationError(res, "Missing required fields", {
        required: [
          "id_componente",
          "id_tipo_elemento",
          "nombre",
          "icono_img",
          "descripcion",
          "link",
          "orden",
          "css_url",
        ],
      });
    }

    try {
      const result = await updateElementoComponenteService.execute({
        id_elemento,
        ...req.body,
      });

      return res.status(200).json({
        message: "OK",
        data: result,
      });
    } catch (error: any) {
      console.log("[Controller] ERROR:", error);

      if (error?.message === "COMPONENTE_NOT_FOUND") {
        return res.status(404).json({ error: "Componente not found" });
      }
      if (error?.message === "TIPO_ELEMENTO_NOT_FOUND") {
        return res.status(404).json({ error: "Tipo elemento not found" });
      }
      if (String(error?.message || "").includes("not found")) {
        return res.status(404).json({ error: "Not found" });
      }

      return handleControllerError(res, error);
    }
  });

  /**
   * @openapi
   * /api/elementos-componente/{id}:
   *   patch:
   *     tags:
   *       - Elementos de Componente
   *     summary: Actualiza parcialmente un elemento de componente
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
   *               id_componente:
   *                 type: integer
   *               id_tipo_elemento:
   *                 type: integer
   *               nombre:
   *                 type: string
   *               icono_img:
   *                 type: string
   *               descripcion:
   *                 type: string
   *               link:
   *                 type: string
   *               orden:
   *                 type: integer
   *               css_url:
   *                 type: string
   *     responses:
   *       200:
   *         description: Elemento actualizado
   *       400:
   *         description: Request inválida
   *       404:
   *         description: No encontrado
   */
  elementoComponenteController.patch("/:id", async (req, res) => {
    console.log(`[Controller] PATCH /elementos-componente/${req.params.id}`);

    const id_elemento = Number(req.params.id);
    if (Number.isNaN(id_elemento) || id_elemento <= 0) {
      return respondValidationError(res, "Invalid id");
    }

    try {
      const result = await patchElementoComponenteService.execute(
        id_elemento,
        req.body || {}
      );

      return res.status(200).json({
        message: "OK",
        data: result,
      });
    } catch (error: any) {
      console.log("[Controller] ERROR:", error);

      if (error?.message === "COMPONENTE_NOT_FOUND") {
        return res.status(404).json({ error: "Componente not found" });
      }
      if (error?.message === "TIPO_ELEMENTO_NOT_FOUND") {
        return res.status(404).json({ error: "Tipo elemento not found" });
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

  /**
   * @openapi
   * /api/elementos-componente/{id}:
   *   delete:
   *     tags:
   *       - Elementos de Componente
   *     summary: Elimina un elemento de componente
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
  elementoComponenteController.delete("/:id", async (req, res) => {
    console.log(`[Controller] DELETE /elementos-componente/${req.params.id}`);

    const id_elemento = Number(req.params.id);
    if (Number.isNaN(id_elemento) || id_elemento <= 0) {
      return respondValidationError(res, "Invalid id");
    }

    try {
      await deleteElementoComponenteService.execute(id_elemento);
      return res.status(204).send();
    } catch (error: any) {
      console.log("[Controller] ERROR:", error);
      return handleControllerError(res, error);
    }
  });

  return elementoComponenteController;
};
