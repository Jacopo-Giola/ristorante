import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Sezione {
  id: number;
  nome: string;
  userId: number;
}

interface Piatto {
  id: number;
  nome: string;
  descrizione: string;
  prezzo: number;
  sezioneId: number;
}

const Menu: React.FC = () => {
  const [sezioni, setSezioni] = useState<Sezione[]>([]);
  const [piatti, setPiatti] = useState<Piatto[]>([]);
  const [editPiatto, setEditPiatto] = useState<Piatto | null>(null);
  const [editSezione, setEditSezione] = useState<Sezione | null>(null);
  const [nomeSezione, setNomeSezione] = useState('');
  const [nomePiatto, setNomePiatto] = useState('');
  const [descrizionePiatto, setDescrizionePiatto] = useState('');
  const [prezzoPiatto, setPrezzoPiatto] = useState('');
  const [selectedSezione, setSelectedSezione] = useState<number | undefined>(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const sezioniResponse = await axios.get('http://localhost:3001/sezioni', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSezioni(sezioniResponse.data);

      const piattiResponse = await axios.get('http://localhost:3001/piatti', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPiatti(piattiResponse.data);
    };

    fetchData();
  }, []);

  const handlePiattoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (editPiatto) {
        const response = await axios.put(`http://localhost:3001/piatti/${editPiatto.id}`, {
          nome: nomePiatto,
          descrizione: descrizionePiatto,
          prezzo: parseFloat(prezzoPiatto),
          sezioneId: selectedSezione
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPiatti(piatti.map(p => (p.id === response.data.id ? response.data : p)));
      } else {
        const response = await axios.post('http://localhost:3001/piatti', {
          nome: nomePiatto,
          descrizione: descrizionePiatto,
          prezzo: parseFloat(prezzoPiatto),
          sezioneId: selectedSezione
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPiatti([...piatti, response.data]);
      }
      setEditPiatto(null);
      setNomePiatto('');
      setDescrizionePiatto('');
      setPrezzoPiatto('');
      setSelectedSezione(undefined);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSezioneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (editSezione) {
        const response = await axios.put(`http://localhost:3001/sezioni/${editSezione.id}`, {
          nome: nomeSezione
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSezioni(sezioni.map(s => (s.id === response.data.id ? response.data : s)));
      } else {
        const response = await axios.post('http://localhost:3001/sezioni', {
          nome: nomeSezione
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSezioni([...sezioni, response.data]);
      }
      setEditSezione(null);
      setNomeSezione('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditPiatto = (piatto: Piatto) => {
    setEditPiatto(piatto);
    setNomePiatto(piatto.nome);
    setDescrizionePiatto(piatto.descrizione);
    setPrezzoPiatto(piatto.prezzo.toString());
    setSelectedSezione(piatto.sezioneId);
  };

  const handleEditSezione = (sezione: Sezione) => {
    setEditSezione(sezione);
    setNomeSezione(sezione.nome);
  };

  const handleDeletePiatto = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3001/piatti/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPiatti(piatti.filter(piatto => piatto.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteSezione = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3001/sezioni/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSezioni(sezioni.filter(sezione => sezione.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Sezioni</h2>
      <ul>
        {sezioni.map((sezione) => (
          <li key={sezione.id}>
            {sezione.nome}
            <button onClick={() => handleEditSezione(sezione)}>Modifica</button>
            <button onClick={() => handleDeleteSezione(sezione.id)}>Elimina</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSezioneSubmit}>
        <input
          type="text"
          placeholder="Nome Sezione"
          value={nomeSezione}
          onChange={(e) => setNomeSezione(e.target.value)}
        />
        <button type="submit">{editSezione ? 'Aggiorna Sezione' : 'Aggiungi Sezione'}</button>
      </form>

      <h2>Piatti</h2>
      <ul>
        {piatti.map((piatto) => (
          <li key={piatto.id}>
            {piatto.nome} - {piatto.descrizione} - {piatto.prezzo} €
            <button onClick={() => handleEditPiatto(piatto)}>Modifica</button>
            <button onClick={() => handleDeletePiatto(piatto.id)}>Elimina</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handlePiattoSubmit}>
        <input
          type="text"
          placeholder="Nome Piatto"
          value={nomePiatto}
          onChange={(e) => setNomePiatto(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descrizione Piatto"
          value={descrizionePiatto}
          onChange={(e) => setDescrizionePiatto(e.target.value)}
        />
        <input
          type="number"
          placeholder="Prezzo Piatto"
          value={prezzoPiatto}
          onChange={(e) => setPrezzoPiatto(e.target.value)}
        />
        <select value={selectedSezione} onChange={(e) => setSelectedSezione(Number(e.target.value))}>
          <option value="" disabled>Seleziona una sezione</option>
          {sezioni.map((sezione) => (
            <option key={sezione.id} value={sezione.id}>{sezione.nome}</option>
          ))}
        </select>
        <button type="submit">{editPiatto ? 'Aggiorna Piatto' : 'Aggiungi Piatto'}</button>
      </form>
    </div>
  );
};

export default Menu;
