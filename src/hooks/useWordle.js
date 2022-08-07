import { useState } from 'react'

const useWordle = (solution) => {

  const MAX_GUESSES = 6
  const WORD_LENGTH = 5

  const [turn, setTurn] = useState(0)
  const [currentGuess, setCurrentGuess] = useState('')

  // since each guess is an array
  const [guesses, setGuesses] = useState([...Array(MAX_GUESSES)])

  // since each guess is a string
  const [history, setHistory] = useState([])

  const [isCorrect, setIsCorrect] = useState(false)

  // {a: 'green', b: 'yellow', c: 'gray'}
  // all keys are gray by default
  const [usedKeys, setUsedKeys] = useState({})

  // format a guess into an array of letter objects
  // e.g [{key: 'a'}, {color: 'green'}]

  const formatGuess = () => {

    let solutionArr = [...solution]
    let formattedGuess = [...currentGuess].map(letter => {
      return {
        key: letter,
        color: 'gray'
      }
    })

    // loop through the solution and compare each letter to the guess
    // if the letter is in the guess, set the color to green
    formattedGuess.forEach((letter, index) => {
      if (letter.key === solutionArr[index]) {
        formattedGuess[index].color = 'green'
        solutionArr[index] = null
      }
    })

    // find any yellow colors
    formattedGuess.forEach((letter, index) => {
      if (solutionArr.includes(letter.key) && letter.color !== 'green') {
        formattedGuess[index].color = 'yellow'
        solutionArr[solutionArr.indexOf(letter.key)] = null
      }
    })

    // return the formatted guess
    return formattedGuess
  }

  // add a new guess to the guesses state
  // update the isCorrect state if the guess is correct
  // add one to the turn state

  const addNewGuess = (_guess) => {

    // check if the guess is correct
    if (currentGuess === solution) {
      setIsCorrect(true)
    }

    // add the new guess to the guesses state
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses]
      newGuesses[turn] = _guess
      return newGuesses
    })

    // add the new guess to the history state
    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess]
    })

    // add one to the turn state
    setTurn((prevTurn) => {
      return prevTurn + 1
    })

    setUsedKeys(() => {
      let newUsedKeys = {...usedKeys}

      _guess.forEach(letter => {
        const currentColor = newUsedKeys[letter.key]

        if (letter.color === 'green') {
          newUsedKeys[letter.key] = 'green'
          return
        }
        else if (letter.color === 'yellow' && currentColor !== 'green') {
          newUsedKeys[letter.key] = 'yellow'
          return
        } else if (letter.color === 'gray' && currentColor !== 'green' && currentColor !== 'yellow') {
          newUsedKeys[letter.key] = 'gray'
          return
        }
      })

      return newUsedKeys
    
    })

    // reset the current guess state
    setCurrentGuess('')

    
  }

  // handle keyup event and track current guess
  // if user presses enter, add the new guess

  const handleKeyupEvent = ({ key }) => {
    // check if key is
    // Shift, Enter, Escape, Backspace

    if (/^[A-ZAa-z]$/.test(key)) {
      if (currentGuess.length < WORD_LENGTH) {
        setCurrentGuess((prev) => {
          return prev + key
        })
      }
    }
    else if (key === "Backspace") {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1)
      })
    }
    else if (key === "Enter") {
      
      // if turn is less than 6, add the new guess
      if (turn < 6) {

        // do not allow duplicate guesses
        if (!history.includes(currentGuess)) {

          // if the word is 5 characters long, add the new guess
          if (currentGuess.length === WORD_LENGTH) {
            
            // all checks have passed,
            // so we can format the guess

            // add the guess once formatted
            addNewGuess(formatGuess())


          } else {
            return
          }
        } else {
          return
        }
      } else {
        return
      }
    }
  }

  return {
    turn,
    currentGuess,
    guesses,
    isCorrect,
    usedKeys,
    handleKeyupEvent
  }
}


export default useWordle
