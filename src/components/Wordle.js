import React, { useEffect } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid'
import Keypad from './Keypad'

export default function Wordle({ solution }) {

  const { currentGuess,
          isCorrect,
          turn,
          handleKeyupEvent,
          guesses,
          usedKeys
        } = useWordle(solution)
  
  useEffect(() => {
    window.addEventListener('keyup', handleKeyupEvent)
  
    return () => {
      window.removeEventListener('keyup', handleKeyupEvent)
    }
  }, [handleKeyupEvent])

  useEffect(() => {
    
    // if turn is at 6 and isCorrect is false
    // then the user has lost
    if (turn === 6 && !isCorrect) {
      alert('You lost!')
      window.removeEventListener('keyup', handleKeyupEvent)
    }
    
    // anytime isCorrect is true, alert
    // the user they have won
    if (isCorrect) {
      alert('You won!')
      window.removeEventListener('keyup', handleKeyupEvent)
    }

  }, [guesses, turn, isCorrect, handleKeyupEvent])
  
  return (
    <div className="wordle">
      <Grid currentGuess={currentGuess} 
            guesses={guesses}
            turn={turn}
      >
      </Grid>
      <Keypad usedKeys={usedKeys} />
    </div>
  )
}
