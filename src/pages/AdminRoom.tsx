import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

import '../styles/room.scss';
import { Question } from '../components/Question/index';
import { useRoom } from '../hooks/useRoom';






type RoomParams = {
    id: string;
}

export function AdminRoom() {
    const { user } = useAuth()
    const history = useHistory()
    const params = useParams<RoomParams>()
    const roomId = params.id;
    const { questions, title } = useRoom(roomId)


    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        })

        history.push('/')

    }

    async function handleDeleteQuestion(quetionId: string) {
       if (window.confirm('Tem certeza que deseja excluir essa pergunta?')){
        await database.ref(`rooms/${roomId}/questions/${quetionId}`).remove()
       }
        
    }


    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button 
                        isOutlined
                        onClick={handleEndRoom}
                        >Encerrar sala</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta{questions.length > 1 && 's'}</span>}
                </div>

                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Question
                                key={question.id}
                                content={question.content}
                                author={question.author}
                            >

                                <button
                                    type="button"
                                    onClick={() => {handleDeleteQuestion(question.id)}}
                                >
                                    <img src={deleteImg} alt="deletar pergunta" />
                                </button>
                            </Question>
                        );

                    })}
                </div>
            </main>
        </div>
    )
}