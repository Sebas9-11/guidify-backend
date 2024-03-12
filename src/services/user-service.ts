import crypto from 'crypto'
import { User } from '../../types'
import { connection } from '../db/connection'

export const getAllUsers = async () => {
  const query = `
    SELECT * FROM users
  `
  const response = await connection.query(query)
  return response.rows
}

export const getUser = async (id: number) => {
  const query = `
    SELECT * FROM users
    WHERE id = ${id}
  `
  try {
    const response = await connection.query(query)
    return response.rows
  } catch (err) {
    return err
  }
}

export const createUser = async (user: User) => {
  const {
    name,
    last_name,
    phone,
    email,
    document,
    diploma,
    professional_card,
    photo,
    city_id,
    department_id,
    rol_id,
    password
  } = user

  const hashedPassword = crypto.createHash('sha256').update(password).digest('base64')

  const query = `
    INSERT INTO users (name, last_name, phone, email, document, diploma, professional_card, photo, city_id, department_id, rol_id, password)
    VALUES ('${name}', '${last_name}', '${phone}', '${email}', '${document}', '${diploma}', '${professional_card}', '${photo}', ${city_id}, ${department_id}, ${rol_id}, '${hashedPassword}')
  `
  try {
    const response = await connection.query(query)
    return response.rows
  } catch (err) {
    return err
  }
}

export const updateUser = async (user: User, id: number) => {
  const {
    name,
    last_name,
    phone,
    email,
    document,
    diploma,
    professional_card,
    photo,
    city_id,
    department_id,
    rol_id,
    password
  } = user
  const query = `
    UPDATE users
    SET name = '${name}', last_name = '${last_name}', phone = '${phone}', email = '${email}', document = '${document}', diploma = '${diploma}', professional_card = '${professional_card}', photo = '${photo}', city_id = ${city_id}, department_id = ${department_id}, rol_id = ${rol_id}, password = '${password}'
    WHERE id = ${id}
  `
  try {
    const response = await connection.query(query)
    return response.rows
  } catch (err) {
    return err
  }
}

export const deleteUser = async (id: number) => {
  const query = `
    DELETE FROM users
    WHERE id = ${id}
  `
  try {
    const response = await connection.query(query)
    return response.rows
  } catch (err) {
    return err
  }
}

export const getUserSupplier = async () => {
  const query = `
    SELECT * FROM users
    WHERE rol_id = 1
  `
  const response = await connection.query(query)
  return response.rows
}

export const getUserCostumer = async () => {
  const query = `
    SELECT * FROM users
    WHERE rol_id = 2
  `
  const response = await connection.query(query)
  return response.rows
}

export const getUserAll = async () => {
  const query = `
    SELECT * FROM users
    WHERE rol_id = 3
  `
  const response = await connection.query(query)
  return response.rows
}
