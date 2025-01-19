import { Router } from "express";
import { AppDataSource } from "../database/data-source";
import Leitor from "../entities/Leitor";

const leitorRoutes = Router();

/* Cadastrar leitor */
leitorRoutes.post("/", async (req, res) => {
    try {
        const { name, email, phone_number, birthdate, address, active } = req.body;

        const leitor = new Leitor();
        leitor.name = name;
        leitor.email = email;
        leitor.phone_number = phone_number;
        leitor.birthdate = birthdate;
        leitor.address = address;
        leitor.active = active ?? true;

        const leitorRepository = AppDataSource.getRepository(Leitor);
        const salvarLeitor = await leitorRepository.save(leitor);

        return res.status(201).json(salvarLeitor);
    } catch (error: any) {
        res.status(500).json({ error: "Erro ao criar leitor", details: error.message });
    }
});

/* Buscar todos os leitores */
leitorRoutes.get("/", async (req, res) => {
    const leitorRepository = AppDataSource.getRepository(Leitor);
    const leitores = await leitorRepository.find();
    return res.json(leitores);
});

/* Buscar um leitor específico */
leitorRoutes.get("/:id", async (req, res) => {
    const { id } = req.params;
    const leitorRepository = AppDataSource.getRepository(Leitor);
    const leitor = await leitorRepository.findOneBy({ id: parseInt(id) });

    if (!leitor) {
        return res.status(404).json({ error: "Leitor não encontrado" });
    }
    return res.json(leitor);
});

/* Editar leitor */
leitorRoutes.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email, phone_number, birthdate, address, active } = req.body;

    const leitorRepository = AppDataSource.getRepository(Leitor);
    let leitor = await leitorRepository.findOneBy({ id: parseInt(id) });

    if (!leitor) {
        return res.status(404).json({ error: "Leitor não encontrado" });
    }

    leitor.name = name ?? leitor.name;
    leitor.email = email ?? leitor.email;
    leitor.phone_number = phone_number ?? leitor.phone_number;
    leitor.birthdate = birthdate ?? leitor.birthdate;
    leitor.address = address ?? leitor.address;
    leitor.active = active ?? leitor.active;

    const updatedleitor = await leitorRepository.save(leitor);
    return res.json(updatedleitor);
});

/* Deletar um leitor */
leitorRoutes.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const leitorRepository = AppDataSource.getRepository(Leitor);

    const leitor = await leitorRepository.findOneBy({ id: parseInt(id) });

    if (!leitor) {
        return res.status(404).json({ error: "Leitor não encontrado" });
    } else {
        await leitorRepository.delete(id);
        return res.status(200).json({ message: `Leitor ${leitor.name} excluído com sucesso` });
    }
});

/* Desativar um leitor */
leitorRoutes.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const leitorRepository = AppDataSource.getRepository(Leitor);

    const leitor = await leitorRepository.findOneBy({ id: parseInt(id) });

    if (!leitor) {
        return res.status(404).json({ error: "Leitor não encontrado" });
    }

    leitor.active = false;
    const updatedleitor = await leitorRepository.save(leitor);
    return res.json(updatedleitor);
});

/* Ativar um leitor */
leitorRoutes.patch("/activate/:id", async (req, res) => {
    const { id } = req.params;
    const leitorRepository = AppDataSource.getRepository(Leitor);

    const leitor = await leitorRepository.findOneBy({ id: parseInt(id) });

    if (!leitor) {
        return res.status(404).json({ error: "Leitor não encontrado" });
    }

    leitor.active = true;
    const updatedleitor = await leitorRepository.save(leitor);
    return res.json(updatedleitor);
});

export default leitorRoutes;
