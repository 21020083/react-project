import { toast } from 'react-toastify'
import { sendRequest, apiUrl } from '../../clients/core/request'
import { AxiosError, AxiosResponse } from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function UserForm() {
  const [user, setUser] = useState({ name: '', email: '' })
  const [isLoading, setIsLoading] = useState(false)

  const { id } = useParams()
  const navigator = useNavigate()

  useEffect(() => {
    if (id) {
      setIsLoading(true)
      sendRequest('GET', apiUrl + '/' + id)
        .then((response: AxiosResponse) => {
          setUser(response.data)
          setIsLoading(false)
        })
        .catch((error: AxiosError) => {
          console.log(error)
        })
    }
  }, [])

  function handleSubmit(event: any) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const newUser = Object.fromEntries(formData.entries())

    if (!newUser.name || !newUser.email) {
      toast.warning('thieu thong tin dang nhap!')
      return
    }
    if (!id) {
      sendRequest('POST', apiUrl, newUser)
        .then((response: AxiosResponse) => {
          toast.success('them user thanh cong')
          navigator('/user')
        })
        .catch((error: AxiosError) => {
          console.log(error)
        })
    } else {
      sendRequest('PUT', apiUrl + '/' + id, newUser)
        .then((response: AxiosResponse) => {
          toast.success('sua thong tin thanh cong')
          navigator('/user')
        })
        .catch((error: AxiosError) => {
          console.log(error)
        })
    }
  }
  if (isLoading) return <></>

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
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Name</label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  name="name"
                  defaultValue={user.name}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Email</label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  name="email"
                  defaultValue={user.email}
                />
              </div>
            </div>
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
