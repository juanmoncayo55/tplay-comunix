import React, { useState } from 'react';
import Quiz from 'react-quiz-component';

import HeadScore from '../utils/HeadScore';
import { dataTrivia } from './dataTrivia';
import "../trivia/trivia.css";

const TriviaMultiple = () => {
	const [quizResult, setQuizResult] = useState({});
	const [showResult, setShowResult] = useState(false);

	const quizResultFn = data => {
		console.log(data);
		setQuizResult(data);
		setShowResult(true);
	}

	return(
		<>
			<HeadScore title="RESPONDE LA TRIVIA ACORDE A LA INFORMACIÓN" />
			<div className="container mx-auto px-5 flex flex-col">
				{ showResult ? "" : <p className="text-azulBrillante3 text-center text-xl mt-5">con base en lo aprendido en Tángara</p>}
				<Quiz
					quiz={dataTrivia}
					disableSynopsis
					enableProgressBar={false}
					showDefaultResult={false}
					onComplete={quizResultFn}
				/>
			</div>
			{ showResult && (
				<>
					<div className="flex flex-col justify-center gap-y-2">
						<p className="text-white text-lg text-center">Preguntas Correctas: {quizResult.numberOfCorrectAnswers}</p>
						<p className="text-white text-lg text-center">Preguntas Incorrectas: {quizResult.numberOfIncorrectAnswers}</p>
						<p className="text-white text-lg text-center">Total Puntos: {quizResult.correctPoints} / {quizResult.totalPoints} </p>
					</div>
				</>
			) }
		</>
	);
}

export default TriviaMultiple