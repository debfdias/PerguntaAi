import { FormEvent, useState } from 'react';
import { useNavigate  } from 'react-router-dom';

import illustrationImg from '../../assets/illustration.png'
import logoImg from '../../assets/logo.png';
import googleIconImg from '../../assets/google_icon.png';
import { Button } from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';

import './styles.scss';

export function Home(){
  let navigate = useNavigate();
  let { signInGoogle, user } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom(){
     if (!user){
       await signInGoogle();
     }

    navigate('/room/create');    
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert('Room does not exist!');
      return;
    }

    if (roomRef.val().endedAt) {
      alert('Room closed.');
      return;
    }

    navigate(`/rooms/${roomCode}`);
  }

  return(
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie, pergunte e responda já!</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real.</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button onClick={handleCreateRoom} className='create-room'>
            <img src={googleIconImg} alt="Logo do Google" style={ {height: 24}} />
            Crie sua sala com o Google
          </button>
          <div className='line'>ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input 
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}