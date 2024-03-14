import { connection } from '../db/connection'

export const getDepartments = async () => {
  const query = `
    SELECT *
    FROM departments
  `
  try {
    const response = await connection.query(query)
    return response.rows
  } catch (err) {
    return err
  }
}

export const getDepartmentById = async (id: number) => {
  const query = `
    SELECT *
    FROM departments
    WHERE id = ${id}
  `
  try {
    const response = await connection.query(query)
    return response.rows
  } catch (err) {
    return err
  }
}
