import { Router } from "express";
import {
  CreateLandingPageUseCase,
  DeleteLandingPageUseCase,
  GetAllLandingPagesUseCase,
  GetLandingPageByIdUseCase,
  PatchLandingPageUseCase,
  UpdateLandingPageUseCase,
} from "@proodos/application/Ports/LandingPageUseCases";
import {
  AssignLandingComponenteUseCase,
  GetLandingComponentesUseCase,
  UnassignLandingComponenteUseCase,
} from "@proodos/application/Ports/LandingComponenteUseCases";
import { handleControllerError, respondValidationError } from "./ControllerErrors";

type LandingPageControllerDeps = {
  createLandingPageService: CreateLandingPageUseCase;
  getLandingPageByIdService: GetLandingPageByIdUseCase;
  getAllLandingPagesService: GetAllLandingPagesUseCase;
  updateLandingPageService: UpdateLandingPageUseCase;
  patchLandingPageService: PatchLandingPageUseCase;
  deleteLandingPageService: DeleteLandingPageUseCase;
  assignLandingComponenteService: AssignLandingComponenteUseCase;
  unassignLandingComponenteService: UnassignLandingComponenteUseCase;
  getLandingComponentesService: GetLandingComponentesUseCase;
};

export const createLandingPageController = ({
  createLandingPageService,
  getLandingPageByIdService,
  getAllLandingPagesService,
  updateLandingPageService,
  patchLandingPageService,
  deleteLandingPageService,
  assignLandingComponenteService,
  unassignLandingComponenteService,
  getLandingComponentesService,
}: LandingPageControllerDeps) => {
  const landingPageController = Router();


/**
 * @openapi
 * /api/landings:
 *   get:
 *     tags:
 *       - Landing Pages
 *     summary: Obtiene todas las landing pages
 *     responses:
 *       200:
 *         description: Lista de landing pages
 */
  landingPageController.get("/", async (req, res) => {
  console.log("[Controller] GET /landings");

  try {
    const result = await getAllLandingPagesService.execute();

    return res.json({
      message: "OK",
      data: result
    });
  } catch (error) {
    console.log("[Controller] ERROR:", error);
    return handleControllerError(res, error);
  }
  });

/**
 * @openapi
 * /api/landings/{id}:
 *   get:
 *     tags:
 *       - Landing Pages
 *     summary: Obtiene landing page por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la landing page
 *     responses:
 *       200:
 *         description: Landing encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   $ref: '#/components/schemas/LandingPageDTO'
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 code:
 *                   type: string
 *                   example: VALIDATION_ERROR
 *                 message:
 *                   type: string
 *                   example: Invalid id
 *       404:
 *         description: Landing no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: LandingPage not found
 */
  landingPageController.get("/:id", async (req, res) => {
  console.log(`[Controller] GET /landings/${req.params.id}`);

  const landingId = Number(req.params.id);
  if (Number.isNaN(landingId) || landingId <= 0) {
    return respondValidationError(res, "Invalid id");
  }

  try {
    const result = await getLandingPageByIdService.execute(landingId);

    if (!result) {
      return res.status(404).json({ error: "LandingPage not found" });
    }

    return res.json({
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
 * /api/landings:
 *   post:
 *     tags:
 *       - Landing Pages
 *     summary: Crea una nueva landing page
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - URL
 *               - estado
 *               - segmento
 *             properties:
 *               URL:
 *                 type: string
 *                 example: "https://www.movistar.com.ar/landing/oferta"
 *               estado:
 *                 type: string
 *                 example: "ACTIVA"
 *               segmento:
 *                 type: string
 *                 example: "HOGAR"
 *     responses:
 *       200:
 *         description: Landing creada
 *       400:
 *         description: Request inválida
 */
  landingPageController.post("/", async (req, res) => {
  console.log("[Controller] POST /landings");
  console.log("[Controller] Body:", req.body);

  const { URL, estado, segmento } = req.body || {};

  // Validación mínima
  if (!URL || !estado || !segmento) {
    return respondValidationError(res, "Missing required fields", {
      required: ["URL", "estado", "segmento"],
    });
  }

  try {
    const result = await createLandingPageService.execute(req.body);

    return res.json({
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
 * /api/landings/{id}:
 *   put:
 *     tags:
 *       - Landing Pages
 *     summary: Actualiza una landing page
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
 *               - URL
 *               - estado
 *               - segmento
 *             properties:
 *               URL:
 *                 type: string
 *               estado:
 *                 type: string
 *               segmento:
 *                 type: string
 *     responses:
 *       200:
 *         description: Landing actualizada
 *       400:
 *         description: Request inválida
 *       404:
 *         description: Landing no encontrada
 */
  landingPageController.put("/:id", async (req, res) => {
  console.log(`[Controller] PUT /landings/${req.params.id}`);

  const id_landing = Number(req.params.id);
  if (Number.isNaN(id_landing) || id_landing <= 0) {
    return respondValidationError(res, "Invalid id");
  }

  const { URL, estado, segmento } = req.body || {};

  if (!URL || !estado || !segmento) {
    return respondValidationError(res, "Missing required fields", {
      required: ["URL", "estado", "segmento"],
    });
  }

  try {
    const result = await updateLandingPageService.execute({
      id_landing,
      URL,
      estado,
      segmento,
    });

    return res.json({
      message: "OK",
      data: result,
    });
  } catch (error: any) {
    console.log("[Controller] ERROR:", error);
    if (error?.message === "LANDING_NOT_FOUND") {
      return res.status(404).json({ error: "LandingPage not found" });
    }
    return handleControllerError(res, error);
  }
  });

/**
 * @openapi
 * /api/landings/{id}:
 *   patch:
 *     tags:
 *       - Landing Pages
 *     summary: Actualiza parcialmente una landing page
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
 *               URL:
 *                 type: string
 *               estado:
 *                 type: string
 *               segmento:
 *                 type: string
 *     responses:
 *       200:
 *         description: Landing actualizada parcialmente
 *       400:
 *         description: Request inválida
 *       404:
 *         description: Landing no encontrada
 */
  landingPageController.patch("/:id", async (req, res) => {
  console.log(`[Controller] PATCH /landings/${req.params.id}`);

  const id_landing = Number(req.params.id);
  if (Number.isNaN(id_landing) || id_landing <= 0) {
    return respondValidationError(res, "Invalid id");
  }

  try {
    const result = await patchLandingPageService.execute(id_landing, req.body || {});

    return res.json({
      message: "OK",
      data: result,
    });
  } catch (error: any) {
    console.log("[Controller] ERROR:", error);
    if (error?.message === "LANDING_NOT_FOUND") {
      return res.status(404).json({ error: "LandingPage not found" });
    }
    if (String(error?.message || "").includes("No fields provided")) {
      return respondValidationError(res, "No fields provided");
    }
    return handleControllerError(res, error);
  }
  });

/**
 * @openapi
 * /api/landings/{id}:
 *   delete:
 *     tags:
 *       - Landing Pages
 *     summary: Elimina una landing page
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Eliminada
 *       400:
 *         description: Request inválida
 */
  landingPageController.delete("/:id", async (req, res) => {
  console.log(`[Controller] DELETE /landings/${req.params.id}`);

  const id_landing = Number(req.params.id);
  if (Number.isNaN(id_landing) || id_landing <= 0) {
    return respondValidationError(res, "Invalid id");
  }

  try {
    await deleteLandingPageService.execute(id_landing);
    return res.status(204).send();
  } catch (error: any) {
    console.log("[Controller] ERROR:", error);
    return handleControllerError(res, error);
  }
  });

/**
 * @openapi
 * /api/landings/{id}/componentes:
 *   post:
 *     tags:
 *       - Landing Pages
 *     summary: Asocia un componente a una landing
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
 *             properties:
 *               id_componente:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Asociación ya existente o creada (idempotente)
 *       201:
 *         description: Asociación creada
 *       400:
 *         description: Request inválida
 *       404:
 *         description: Landing o componente inexistente
 */
  landingPageController.post("/:id/componentes", async (req, res) => {
  console.log(`[Controller] POST /landings/${req.params.id}/componentes`);

  const id_landing = Number(req.params.id);
  const id_componente = Number(req.body?.id_componente);

  if (Number.isNaN(id_landing) || id_landing <= 0) {
    return respondValidationError(res, "Invalid landing id");
  }
  if (Number.isNaN(id_componente) || id_componente <= 0) {
    return respondValidationError(res, "Invalid id_componente");
  }

  try {
    const result = await assignLandingComponenteService.execute(id_landing, id_componente);

    return res.status(result.existed ? 200 : 201).json({ message: "OK", data: result.data });
  } catch (error: any) {
    if (error?.message === "LANDING_NOT_FOUND") return res.status(404).json({ error: "Landing not found" });
    if (error?.message === "COMPONENTE_NOT_FOUND") return res.status(404).json({ error: "Componente not found" });

    console.log("[Controller] ERROR:", error);
    return handleControllerError(res, error);
  }
  });

/**
 * @openapi
 * /api/landings/{id}/componentes:
 *   get:
 *     tags:
 *       - Landing Pages
 *     summary: Lista los componentes asociados a una landing
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de asociaciones landing-componente
 *       400:
 *         description: ID inválido
 */
  landingPageController.get("/:id/componentes", async (req, res) => {
  console.log(`[Controller] GET /landings/${req.params.id}/componentes`);

  const id_landing = Number(req.params.id);
  if (Number.isNaN(id_landing) || id_landing <= 0) {
    return respondValidationError(res, "Invalid landing id");
  }

  try {
    const result = await getLandingComponentesService.execute(id_landing);

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
 * /api/landings/{id}/componentes/{id_componente}:
 *   delete:
 *     tags:
 *       - Landing Pages
 *     summary: Desasocia un componente de una landing
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *       - name: id_componente
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Desasociado
 *       400:
 *         description: Request inválida
 */
  landingPageController.delete("/:id/componentes/:id_componente", async (req, res) => {
  console.log(
    `[Controller] DELETE /landings/${req.params.id}/componentes/${req.params.id_componente}`
  );

  const id_landing = Number(req.params.id);
  const id_componente = Number(req.params.id_componente);

  if (Number.isNaN(id_landing) || id_landing <= 0) {
    return respondValidationError(res, "Invalid landing id");
  }
  if (Number.isNaN(id_componente) || id_componente <= 0) {
    return respondValidationError(res, "Invalid id_componente");
  }

  try {
    await unassignLandingComponenteService.execute(id_landing, id_componente);
    return res.status(204).send();
  } catch (error) {
    console.log("[Controller] ERROR:", error);
    return handleControllerError(res, error);
  }
  });

  return landingPageController;
};
