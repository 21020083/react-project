import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import client from '../../clients/core/clients'

interface UserInfo {
  name: string
  username: string
  email: string
  phone_number: string
  id: number
}

const initialVal: UserInfo = {
  name: '',
  username: '',
  email: '',
  phone_number: '',
  id: 0,
}

export default function UserForm() {
  const [user, setUser] = useState<UserInfo>(initialVal)
  const [isLoading, setIsLoading] = useState(false)

  const { id } = useParams()
  const navigator = useNavigate()

  useEffect(() => {
    if (id) {
      setIsLoading(true)
      client
        .getUserById(id)
        .then((response: any) => {
          setUser(response)
          setIsLoading(false)
        })
        .catch((error: AxiosError) => {
          console.log(error)
        })
    }
  }, [])
  console.log(user)

  async function handleSubmit(event: any) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const newUser = Object.fromEntries(formData.entries())

    if (!newUser.name || !newUser.email) {
      toast.warning('thieu thong tin dang nhap!')
      return
    }
    if (!id) {
      await client
        .postUser(newUser)
        .then(() => {
          toast.success('them user thanh cong')
          navigator('/user')
        })
        .catch((error: AxiosError) => {
          console.log(error)
        })
    } else {
      await client
        .putUser(id, newUser)
        .then(() => {
          toast.success('sua thong tin thanh cong')
          navigator('/user')
        })
        .catch((error: AxiosError) => {
          console.log(error)
        })
    }
  }
  if (isLoading) return <h1>...Loading</h1>

  return (
    <>
      {}
      <h2 className="text-center mb-3">
        {' '}
        {id ? 'Edit User' : 'Create New User'}{' '}
      </h2>
      <div className="row">
        <div className="col-lg-6 mx-auto">
          <form onSubmit={(event) => handleSubmit(event)}>
            {Object.keys(user).map((keyName: string, i: any) => (
              <div className="row mb-3" key={i}>
                <label className="col-sm-4 col-form-label">{keyName}</label>
                <div className="col-sm-8">
                  <input
                    className="form-control"
                    name={keyName}
                    defaultValue={user[keyName]}
                  />
                </div>
              </div>
            ))}
            <div className="row">
              <div className="offset-sm-4 col-sm-4 d-grid">
                <button type="submit" className="btn btn-primary btn-sm me-3">
                  {' '}
                  Submit
                </button>
              </div>
              <div className="col-sm-4 d-grid">
                <Link to="/user">
                  <button type="button" className="btn btn-secondary me-2">
                    {' '}
                    Back{' '}
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
