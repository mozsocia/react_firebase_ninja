dashboard.js
```js
import React, { useEffect, useState } from 'react'
import GoalForm from '../components/GoalForm'
import Spinner from '../components/Spinner'
import { db } from '../firebase/config'


function Dashboard() {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleDelete = (id) => {
    try {
      await db.collection('books').doc(id).delete()
    } catch (err) {
      console.log(err);
    }

  }

  useEffect(() => {
    setIsLoading(true)

    db.collection('books').onSnapshot((alldata) => {

      if (alldata.empty) {
        setError('No Books is found')
        setIsLoading(false)
      } else {

        let results = []

        alldata.docs.forEach(doc => {
          results.push({ id: doc.id, ...doc.data() })
        })
        setData(results)
        setIsLoading(false)
      }
    }, (err) => {
      setError(err.message)
      setIsLoading(false)

    })
  }, [])


  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
      <GoalForm />
      <hr />
      <section className='content'>

        {data?.length > 0 ? (
          <div className='goals'>
            {data.map((item) => (
              <div className='goal' key={item.id}>
                <h2>{item.name}</h2>
                <h3>{item.author}</h3>
                <button className='btn' onClick={() => handleDelete(item.id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}

      </section>
    </>
  )
}


export default Dashboard

```

GoalForm.js
```js
import { useEffect, useState } from 'react'
import { db } from '../firebase/config'
import firebase from "firebase/app";  // include the Firebase module



function GoalForm() {
    const [error, setError] = useState(null)
    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')


    const onSubmit = async (e) => {
        e.preventDefault()
        if (!name || !author) {
            setError('Please Provide all field')
            return
        }
        try {
            let doc = { name, author, created: firebase.firestore.Timestamp.now().toDate().toString() }
            await db.collection('books').add(doc)
            setName('')
            setAuthor('')

        } catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {
        setTimeout(() => {
            setError(null)
        }, 6000)

    }, [error])

    return (
        <section className='form'>

            <form onSubmit={onSubmit}>
                <div className='form-group'>

                    <input
                        type='text'
                        name='name'
                        id='name'
                        value={name}
                        placeholder='Enter Name'
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='form-group'>

                    <input
                        type='text'
                        name='author'
                        id='author'
                        value={author}
                        placeholder='Enter Author'
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <button className='btn btn-block' type='submit'>
                        Add Goal
                    </button>
                </div>
                {error && <p className='error'><b>{error}</b></p>}
            </form>
        </section>
    )
}

export default GoalForm
```
