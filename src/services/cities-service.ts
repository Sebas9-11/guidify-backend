import { City } from '../../types'
import { connection } from '../db/connection'

export const getCities = async () => {
  const query = `
    SELECT *
    FROM cities
  `
  try {
    const response = await connection.query(query)
    return response.rows
  } catch (err) {
    return err
  }
}

export const getCityById = async (id: number) => {
  const query = `
    SELECT *
    FROM cities
    WHERE id = ${id}
  `

  try {
    const response = await connection.query(query)
    return response.rows
  } catch (err) {
    return err
  }
}

export const createCity = async (city: City) => {
  const { name } = city

  const query = `
    INSERT INTO cities (name)
    VALUES ('${name}')
  `
  try {
    const response = await connection.query(query)
    return response.rows
  } catch (err) {
    return err
  }
}

export const updateCity = async (id: number, city: City) => {
  const { name } = city

  const query = `
    UPDATE cities
    SET name = '${name}'
    WHERE id = ${id}
  `
  try {
    const response = await connection.query(query)
    return response.rows
  } catch (err) {
    return err
  }
}
