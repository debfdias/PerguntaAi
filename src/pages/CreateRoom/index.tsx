import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import illustrationImg from '../../assets/illustration.png'
import logoImg from '../../assets/logo.svg';
import { Button } from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';

import './styles.scss';

export function CreateRoom(){
  const { user } = useAuth();
  const [newRoom, setNewRoom] = useState('');
  let navigate = useNavigate();

  async function handleCreateRoom(event: FormEvent)
  {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const room = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })

    navigate(`/rooms/${room.key}`); 

  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie, pergunte e responda já!</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real.</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input 
              type="text"
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>
          Quer entrar em uma sala existente? <Link to ="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  )
}