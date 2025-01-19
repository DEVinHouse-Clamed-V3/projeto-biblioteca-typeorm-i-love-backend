import { Router } from "express";
import { AppDataSource } from "../database/data-source";
import Autor from "../entities/Autor";

const autorRoutes = Router();

autorRoutes.post("/", async (req, res) => {
  const { name, birthdate, biography, nationality, active } = req.body;

  try {
    const authorRepository = AppDataSource.getRepository(Autor);

    if (!name || !nationality) {
      return res
        .status(400)
        .json({ error: "Nome e nacionalidade são obrigatórios." });
    }

    const newAuthor = authorRepository.create({
      name,
      birthdate,
      biography,
      nationality,
      active: active ?? true,
    });

    await authorRepository.save(newAuthor);
    return res.status(201).json(newAuthor);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao criar autor." });
  }
});

autorRoutes.get("/", async (_, res) => {
  try {
    const authorRepository = AppDataSource.getRepository(Autor);
    const authors = await authorRepository.find();
    return res.json(authors);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar autores." });
  }
});

autorRoutes.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const authorRepository = AppDataSource.getRepository(Autor);
    const author = await authorRepository.findOne({
      where: { id: parseInt(id, 10) },
    });

    if (!author) {
      return res.status(404).json({ error: "Autor não encontrado." });
    }

    return res.json(author);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar o autor." });
  }
});

autorRoutes.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, birthdate, biography, nationality, active } = req.body;

  try {
    const authorRepository = AppDataSource.getRepository(Autor);
    const author = await authorRepository.findOne({
      where: { id: parseInt(id, 10) },
    });

    if (!author) {
      return res.status(404).json({ error: "Autor não encontrado." });
    }

    if (name) author.name = name;
    if (birthdate) author.birthdate = birthdate;
    if (biography) author.biography = biography;
    if (nationality) author.nationality = nationality;
    if (active !== undefined) author.active = active;

    await authorRepository.save(author);
    return res.json(author);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao atualizar o autor." });
  }
});

autorRoutes.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const authorRepository = AppDataSource.getRepository(Autor);
    const author = await authorRepository.findOne({
      where: { id: parseInt(id, 10) },
    });

    if (!author) {
      return res.status(404).json({ error: "Autor não encontrado." });
    }

    await authorRepository.remove(author);
    return res
      .status(200)
      .json({ message: `Autor ${author.name} excluído com sucesso` });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao deletar o autor." });
  }
});

export default autorRoutes;
