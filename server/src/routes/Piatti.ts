import express from 'express';
import { Piatto } from '../entity/Piatto';
import AppDataSource from './../index';

const router = express.Router();

// Create Piatto
router.post('/', async (req, res) => {
  const { nome, descrizione, prezzo, sezioneId, userId } = req.body;

  const piatto = new Piatto();
  piatto.nome = nome;
  piatto.descrizione = descrizione;
  piatto.prezzo = prezzo;
  piatto.sezione = sezioneId;
  piatto.user = userId;

  await AppDataSource.getRepository(Piatto).save(piatto);

  res.status(201).json(piatto);
});

// Read all Piatti
router.get('/', async (req, res) => {
  const piatti = await AppDataSource.getRepository(Piatto).find();
  res.json(piatti);
});

// Update Piatto
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, descrizione, prezzo, sezioneId } = req.body;

  const piatto = await AppDataSource.getRepository(Piatto).findOneBy({ id: Number(id) });

  if (!piatto) {
    return res.status(404).json({ message: 'Piatto not found' });
  }

  piatto.nome = nome;
  piatto.descrizione = descrizione;
  piatto.prezzo = prezzo;
  piatto.sezione = sezioneId;

  await AppDataSource.getRepository(Piatto).save(piatto);

  res.json(piatto);
});

// Delete Piatto
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  await AppDataSource.getRepository(Piatto).delete(id);

  res.status(204).send();
});

export default router;