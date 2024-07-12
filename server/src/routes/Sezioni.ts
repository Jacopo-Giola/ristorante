import express from 'express';
import { Sezione } from '../entity/Sezione';
import AppDataSource from './../index';

const router = express.Router();

// Create Sezione
router.post('/', async (req, res) => {
  const { nome, userId } = req.body;

  const sezione = new Sezione();
  sezione.nome = nome;
  sezione.user = userId;

  await AppDataSource.getRepository(Sezione).save(sezione);

  res.status(201).json(sezione);
});

// Read all Sezioni
router.get('/', async (req, res) => {
  const sezioni = await AppDataSource.getRepository(Sezione).find();
  res.json(sezioni);
});

// Update Sezione
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;

  const sezione = await AppDataSource.getRepository(Sezione).findOneBy({ id: Number(id) });

  if (!sezione) {
    return res.status(404).json({ message: 'Sezione not found' });
  }

  sezione.nome = nome;

  await AppDataSource.getRepository(Sezione).save(sezione);

  res.json(sezione);
});

// Delete Sezione
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  await AppDataSource.getRepository(Sezione).delete(id);

  res.status(204).send();
});

export default router;