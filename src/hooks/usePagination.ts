import { useEffect, useState } from 'react'

export function usePagination<T>(participants: T[]) {
  const [currentPage, setCurrentPage] = useState(1) // Pages are 1 indexed
  const maxGalleryViewParticipants = 6

  const totalPages = Math.ceil(participants.length / maxGalleryViewParticipants)
  const isBeyondLastPage = currentPage > totalPages

  useEffect(() => {
    if (isBeyondLastPage) {
      setCurrentPage(totalPages)
    }
  }, [isBeyondLastPage, totalPages])

  const paginatedParticipants = participants.slice(
    (currentPage - 1) * maxGalleryViewParticipants,
    currentPage * maxGalleryViewParticipants
  )

  return { paginatedParticipants, setCurrentPage, currentPage, totalPages }
}
