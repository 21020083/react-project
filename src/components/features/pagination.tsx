import React from 'react'
import classnames from 'classnames'
import { usePagination, DOTS } from '../../lib/hooks/usePagination'
import '../../styles/pagination.css'

interface CustomPaginationInterface {
  currentPage: number
  totalCount: number
  siblingCount: number
  pageSize: number
  onPageChange: (curPage: number) => void
  className: string
}
const CustomPagination = ({
  currentPage,
  totalCount,
  siblingCount = 1,
  pageSize,
  className,
  onPageChange,
}: CustomPaginationInterface) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })

  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  let lastPage = paginationRange[paginationRange.length - 1]
  return (
    <ul
      className={classnames('pagination-container', { [className]: className })}
    >
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map((pageNumber: any, index: any) => {
        if (pageNumber === DOTS) {
          return (
            <li key={pageNumber + index} className="pagination-item dots">
              &#8230;
            </li>
          )
        }

        return (
          <li
            key={pageNumber}
            className={classnames('pagination-item', {
              selected: pageNumber === currentPage,
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        )
      })}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  )
}

export default CustomPagination
