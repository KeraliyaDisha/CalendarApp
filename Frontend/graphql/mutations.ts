import {gql } from '@apollo/client';

export const SIGNIN=gql`
mutation SIGNIN($password: String!, $email: String!){
    signin(password: $password, email: $email){
      token
    }
  }
`

export const SIGNUP=gql`
mutation SIGNUP($password: String!, $email: String!, $lastName: String!, $firstName: String!){
    signup(password: $password, email: $email, lastName: $lastName, firstName: $firstName){
      token
    }
  }
  `

export const CREATE_EVENT = gql `
    mutation CREATE_EVENT($userId: String!, $end: DateTimeISO!, $start: DateTimeISO!, $description: String!, $title: String!){
  createEvent(userId: $userId, end: $end, start: $start, description: $description, title: $title) {
	id
	title
	description
	start
	end
  }
}
`
export const DELETE_EVENT = gql `
mutation DELETE_EVENT($id: String!){
  deleteEvent(id: $id)
}
`


export const UPDATE_EVENT  = gql `
mutation UPDATE_EVENT($id: String!, $title: String, $description: String, $start: DateTimeISO, $end: DateTimeISO){
  updateEvent(id: $id, description: $description, title: $title, start: $start, end: $end) {
	id
	title
	description
	start
	end
  }
}
`