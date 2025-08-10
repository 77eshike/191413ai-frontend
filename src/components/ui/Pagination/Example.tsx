'use client'

import React, { useState } from 'react'
import { Pagination } from './Pagination'

export default function Example() {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = 10

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="p-4">
      <Pagination current={currentPage} total={totalPages} onChange={handlePageChange} />
    </div>
  )
}
