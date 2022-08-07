import React from 'react'

export default function Row({ guess, currentGuess }) {

  if (guess) {
    return (
      <div className="wordle-row history">
        {guess.map((letter, index) => (
          <div key={index} className={letter.color} style={{ backgroundColor: letter.color }}>
            {letter.key}
          </div>
        ))}
      </div>
    )
  }

  if (currentGuess) {
    
    // take the current guess and map over it
    let letters = currentGuess.split('')

    // map over the letters and return a div with the letter and the color
    return (
      <div className="wordle-row current">
        {letters.map((letter, index) => (
          <div key={index} className="wordle-cell filled" style={{ backgroundColor: letter.color }}>
            {letter}
          </div>
        ))}
        {[...Array(5 - letters.length)].map((_, index) => (
          <div key={index}></div>
        ))}
      </div>
    )
  }
  return (
    <div className='wordle-row'>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
