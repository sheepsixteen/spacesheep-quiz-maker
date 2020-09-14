import { useState, useEffect } from 'react'
import Head from 'next/head'

import styles from './quiz.module.sass'

export default function Home() {
  const [code, setCode] = useState('')
  const [question, setQuestion] = useState('')
  const [answers, setAnswers] = useState([
    { title: "", isCorrect: false }
  ])

  useEffect(() => {
    // Generate code
    const answersCode = answers.map(x => 
      `
      <details class="answer answer-${x.isCorrect ? 'correct' : 'wrong'}">
        <summary>${x.title}</summary>

        <div class="answer-text">
          ${x.isCorrect
            ? 'Correct!'
            : `Sorry, that's wrong
              <div class="answer-cta-text">Try Again</div>`
            }
        </div>
      </details>
      `
    ).join('')

    const code = `
      <div markdown="0" class="quiz">
        <div class="question">
          ${question}
        </div>
        <div class="answers">
          ${answersCode}
        </div>
      </div>
    `

    setCode(code)

  }, [question, answers])

  const addAnswer = () => {
    setAnswers(answers => [...answers, { title: "", isCorrect: false }])
  }

  const updateAnswerTitle = (index, e) => {
    const updatedAnswer = {
      ...answers[index],
      title: e.target.value
    }

    setAnswers(answers => {
      const newAnswers = [...answers]
      newAnswers[index] = updatedAnswer
      return newAnswers
    })
  }

  const updateAnswerIsCorrect = (index, e) => {
    const updatedAnswer = {
      ...answers[index],
      isCorrect: e.target.checked
    }

    setAnswers(answers => {
      const newAnswers = [...answers]
      newAnswers[index] = updatedAnswer
      return newAnswers
    })
  }

  const removeAnswer = (index) => {
    setAnswers(answers => {
      const newAnswers = [...answers]
      newAnswers.splice(index, 1)
      return newAnswers
    })
  }

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossorigin="anonymous" />
      </Head>

      <div className="container my-5">
        <h1 className="h2 mb-3">SpaceSheep quiz builder </h1>
        <div className="form-group">
          <label htmlFor="question">
            Question
          </label>
          <input
            id="question"
            value={question}
            onChange={e =>
              setQuestion(e.target.value)
            }
            className="form-control"
            type="text"
            placeholder="Type your question here..."
          />
        </div>

        {answers.map((x, i) => 
          <div key={i} className="form-group row mt-3 border-top pt-3">
            <label className="col-sm-2 col-form-label" htmlFor={"name-" + i}>Answer number {i}</label>
            <div className="col-sm-10">
              <input
                value={answers[i].title}
                onChange={e => updateAnswerTitle(i, e)}
                id={"name-" + i}
                type="text"
                className="form-control"
                placeholder="Title of the answer... "
              />
              <div className="form-check mt-3">
                <input
                  checked={answers[i].isCorrect}
                  onChange={e => updateAnswerIsCorrect(i, e)}
                  type="checkbox"
                  className="form-check-input"
                  id={"isCorrect-" + i}
                />
                <label
                  className="form-check-label"
                  htmlFor={"isCorrect-" + i}
                >
                  Is this answer correct?
                </label>
              </div>
              <div className="form-text">
                <a onClick={e => removeAnswer(i)} className="text-danger d-flex align-items-center" style={{ cursor: 'pointer' }}>
                  <svg style={{ fill: 'currentColor', marginRight: '4px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fillRule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path></svg>
                  Remove this answer
                </a>
              </div>
            </div>
          </div>
        )}

        <button onClick={addAnswer} className="btn mt-3 d-flex align-items-center">
          <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16
          16" width="16" height="16"><path fillRule="evenodd" d="M8 2a.75.75 0
            01.75.75v4.5h4.5a.75.75 0 010 1.5h-4.5v4.5a.75.75 0 01-1.5
            0v-4.5h-4.5a.75.75 0 010-1.5h4.5v-4.5A.75.75 0 018
          2z"></path></svg>
          <span>
            Add an answer
          </span>
        </button>

        <h2 className="h5 mt-5">Preview</h2>

        <div className={styles.quiz}>
          <div className={styles.question}>
            {question}
          </div>

          <div className={styles.answers}>
            {answers.map((x, i) => 
              <details
                key={i}
                className={`
                  ${styles.answer}
                  ${x.isCorrect
                      ? styles.answer_correct
                      : styles.answer_wrong}`}
              >
                <summary>
                  {x.title || 'Title of the answer...'}
                </summary>

                <div className={styles.answer_text}>
                  {x.isCorrect
                    ? 'Correct!'
                    : <>Sorry, that's wrong<div className={styles.answer_cta_text}>Try again</div></>
                  }
                </div>
              </details>
            )}
          </div>
        </div>

        <h2 className="h5 mt-5">Code (copy and paste into markdown)</h2>
        <textarea rows="4" readOnly className="form-control" value={code}/>

      </div>
    </>
  )
}
