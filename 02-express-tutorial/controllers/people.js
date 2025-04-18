const { people } = require('../data')

let lastUsedId = -1

people.forEach((person) => {
  if (person.id > lastUsedId) {
    lastUsedId = person.id  
  }
})

const getPeople = (req, res) => {
  res.status(200).json({ success: true, data: people })
}

const addPerson = (req, res) => {
  const { name } = req.body
  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: 'Please provide a name' })
  }
  lastUsedId++
  people.push({ id: lastUsedId, name })
  res.status(201).json({ success: true, name })
}

const updatePerson = (req, res) => {
  const { id } = req.params
  const { name } = req.body

  const person = people.find((person) => person.id === Number(id))

  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${id}` })
  }
  people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name
    }
  })

  res.status(200).json({ success: true, data: people })
}

const deletePerson = (req, res) => {
  const person = people.find((person) => person.id === Number(req.params.id))
  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${req.params.id}` })
  }
  const updatedPeople = people.filter(
    (person) => person.id !== Number(req.params.id)
  )

  people.length = 0
  updatedPeople.forEach((person) => {
    people.push(person)
  })

  return res.status(200).json({ success: true, data: people })
}


module.exports = {
  addPerson,
  getPeople,
  updatePerson,
  deletePerson,
}