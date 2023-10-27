const { getAuth } = require("firebase/auth")
const { collection, getDocs, getFirestore } = require("firebase/firestore")
const { initializeApp } = require("firebase/app")
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const config = {
  apiKey: process.env.GATSBY_API_KEY,
  authDomain: process.env.GATSBY_AUTH_DOMAIN,
  projectId: process.env.GATSBY_PROJECT_ID,
  storageBucket: process.env.GATSBY_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_MESSAGING_SENDER_ID,
  appId: process.env.GATSBY_APP_ID,
  measurementId: process.env.GATSBY_MEASURMENT_ID,
}

const app = initializeApp(config)
const auth = getAuth(app)
const db = getFirestore(app)

const getArticleRates = async () => {
  const snapshot = await getDocs(collection(db, "comments"))

  const result = {}

  snapshot.forEach(doc => {
    const articleId = doc.id
    const data = doc.data()

    Object.entries(data).forEach(([, comment]) => {
      if (comment.rate) {
        if (Array.isArray(result[articleId])) {
          result[articleId].push(comment.rate)
        } else {
          result[articleId] = [comment.rate]
        }
      }
    })
  })

  const ratesDict = Object.entries(result).reduce((acc, [key, rates]) => {
    const sum = rates.reduce((acc, rate) => acc + rate, 0)
    acc[key] = +(((sum / rates.length) * 100) / 100).toFixed(2)
    return acc
  }, {})

  return ratesDict
}

const getAllVotes = async () => {
  const snapshot = await getDocs(collection(db, "votes"))

  const result = {}

  snapshot.forEach(doc => {
    result[doc.id] = doc.data()
  })

  return result
}

module.exports = {
  app,
  auth,
  db,
  getArticleRates,
  getAllVotes,
}
