import { useState, useEffect, memo, useRef, ReactNode } from 'react'
import { sendRequest, apiUrl } from '../../clients/core/request'
import { toast } from 'react-toastify'
import CustomModal from '../../components/ui/Modal'
import client from '../../clients/core/clients'

import { Link, useNavigate } from 'react-router-dom'
import useDebound from '../../lib/hooks/useDebound'
import { Input } from '../../components/core/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/core/table'
import { baseRequest } from '../../clients/core/axiosConfig'
import { RequestMethod } from '../../clients/core/common'
import CustomPagination from '../../components/features/pagination'

interface UserType {
  name: string
  id: number
  email: string
}
function UserList() {
  const navigator = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(1)
  const [pageSize, setPageSize] = useState(1)

  const [users, setUsers] = useState(Array<UserType>)
  const [filter, setFilter] = useState('')
  const [Form, SetShowForm] = useState(false)

  const filterValue = useDebound({ value: filter })

  //Delete Modal
  const [showModal, setShowModal] = useState(false)
  const [id, setId] = useState<number>(0)

  const totalPages = Math.ceil(totalCount / pageSize)

  const toggleModal = (id: any) => {
    setShowModal(!showModal)
    setId(id)
  }

  const userFiltered = users.filter((value) =>
    value.name.toLowerCase().includes(filterValue.toLowerCase()),
  )
  useEffect(() => {
    async function getUsers(url: string) {
      try {
        const res = await client.get(url, { page: currentPage })

        setUsers(res.records)
        setTotalCount(Math.ceil(res.total))
        setPageSize(res.limit)

        setIsLoading(false)
      } catch (err: any) {
        console.log(err)
      }
    }

    getUsers('http://127.0.0.1:8000/api/users')
  }, [currentPage])

  const handlePageChange = (page: any) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(() => page)
      setIsLoading(true)
    }
  }

  function deleteUser(id: number) {
    const res = client.delete()
    sendRequest('DELETE', apiUrl + '/' + id, JSON.stringify(users[id]))
      .then(() => {
        setShowModal(!showModal)
        toast.info('xoa thanh cong')
        setIsLoading(true)
      })
      .catch((error: any) => console.log(error))
  }

  return (
    <>
      <h2 className="text-center mb-3">List of Users</h2>
      <form className="d-flex">
        <Input
          type="seach"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder=" Search"
        ></Input>
        <Link to="/user/add">
          <button
            type="button"
            className="btn btn-outline-success my-2 my-sm-0"
          >
            {' '}
            Create
          </button>
        </Link>
      </form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userFiltered.map((user, index) => {
            return (
              <TableRow key={`trow${index}`}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell style={{ width: '10px', whiteSpace: 'nowrap' }}>
                  <Link to={`/user/edit/${user.id}`}>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm me-2"
                    >
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => toggleModal(index)}
                    type="button"
                    className="btn btn-danger btn-sm "
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      {users[id] && (
        <CustomModal
          showModal={showModal}
          toggleModal={toggleModal}
          user={users[id]}
          deleteUser={deleteUser}
        />
      )}

      <CustomPagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={totalCount}
        pageSize={pageSize}
        onPageChange={(page: any) => handlePageChange(page)}
        siblingCount={1}
      />
    </>
  )
}

export default memo(UserList)
