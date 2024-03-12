import { Service } from '../../types'
import { connection } from '../db/connection'

export const getAllService = async () => {
  const query = `
    SELECT * FROM service
  `
  const response = await connection.query(query)
  return response.rows
}

export const createService = async (service: Service) => {
  const {
    title,
    description,
    date,
    in_person,
    virtual,
    city_id,
    department_id,
    payment_id,
    user_id
  } = service

  const query = `
    INSERT INTO service (title, description, date, in_person, virtual, city_id, department_id, payment_id, user_id)
    VALUES ('${title}', '${description}', '${date}', '${in_person}', '${virtual}', ${city_id}, ${department_id}, ${payment_id}, ${user_id})
  `
  try {
    const response = await connection.query(query)
    return response.rows
  } catch (err) {
    return err
  }
}

export const getServiceById = async (id: number) => {
  const query = `
    SELECT s.title, s.description, TO_CHAR(s.date, 'YYYY-MM-DD') as date, u.name as "name", u.last_name as "last_name", c.name as "city", d.name as "departament", p.name as "payment"
    FROM service s
    left join cities c on s.city_id = c.id
    left join departments d on s.department_id = d.id
    left join users u on s.user_id = u.id
    left join payment p on s.payment_id = p.id
    WHERE s.id = $1
  `

  try {
    const response = await connection.query(query, [id])
    return response.rows
  } catch (err) {
    return err
  }
}
export const createServiceUser = async (service: Service) => {
  const {
    title,
    description,
    date,
    in_person,
    virtual,
    city_id,
    department_id,
    payment_id,
    user_id
  } = service

  const query = `
    INSERT INTO service (title, description, date, in_person, virtual, city_id, department_id, payment_id, user_id)
    VALUES ('${title}', '${description}', '${date}', '${in_person}', '${virtual}', ${city_id}, ${department_id}, ${payment_id}, ${user_id})
  `
  try {
    const response = await connection.query(query)
    return response.rows
  } catch (err) {
    return err
  }
}
