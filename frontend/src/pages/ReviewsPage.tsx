import { FC, useCallback, useEffect, useState } from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import MovieReviewThumbnail from '../components/reviews/MovieReviewThumbnail'
import MovieReview from '../components/reviews/MovieReviewCard'
import { useReviewSearchQuery } from '../hooks/reviewQueries'
import { ReviewType } from '../lib/types'
import ReviewSearchForms from '../components/reviews/ReviewSearchForms'
import { useSearchParams } from 'react-router-dom'

interface ReviewsPageProps {

}

export type ReviewSearchType = { searchMode: "movie", value: any } | null



const ReviewsPage: FC<ReviewsPageProps> = ({ }) => {
  const [page, setPage] = useState(0)
  const [_, setSearchParams] = useSearchParams({ searchMode: "", searchQuery: "" })
  const [searchMode, setSearchMode] = useState<ReviewSearchType | null>(null)
  const { reviews = [], isPending, refetch } = useReviewSearchQuery(searchMode?.value ?? null)
  const [review, setReview] = useState<ReviewType | null>(null)

  useEffect(() => {
    if (refetch) {
      refetch()
    }
  }, [searchMode])

  const visibleReviews = page === 0 ? reviews.slice(0, 6) : reviews.slice(page * 6, page * 6 + 6)

  const applySearch = useCallback((val: ReviewSearchType | null) => {
    if (val) {
      setSearchParams(prev => {
        prev.set("searchMode", val.searchMode)
        prev.set("searchQuery", val.value)
        return prev
      })
      setSearchMode(val)
    }
  }, [setSearchMode])

  return (
    <section className="h-full  flex flex-col items-center gap-20 animate-fadeIn">
      {review && <MovieReview review={review} setReview={setReview} />}
      <ReviewSearchForms applySearch={applySearch} />
      <div className="flex flex-col items-center gap-5 relative w-dvw select-none">
        <h2 className="text-2xl">
          {!searchMode && "Random user reviews"}
          {searchMode && reviews.length === 0 && `No reviews found with the movie search term '${searchMode.value}'`}
          {searchMode && reviews.length! > 0 && `Reviews found for '${searchMode.value}'`}
        </h2>
        <div className="w-[50%] h-[1px] bg-white"></div>
        <div className="grid gap-5 grid-cols-3 md:grid-cols-6 w-[90%] h-full min-h-[500px]">
          {isPending ? <h1>Loading</h1> : <>{
            visibleReviews.map((review, i) => (
              <MovieReviewThumbnail key={i} review={review} setReview={setReview} />
            ))
          }</>
          }
        </div>
        {visibleReviews.length === 6 && <div className="absolute top-[50%] right-5 cursor-pointer " onClick={() => setPage(prev => prev + 1)}><AiOutlineArrowRight style={{ width: "50px", height: "50px" }} /></div>}
        {page > 0 && <div className="absolute top-[50%] left-5 cursor-pointer" onClick={() => setPage(prev => prev - 1)}><AiOutlineArrowLeft style={{ width: "50px", height: "50px" }} /></div>}
      </div>
    </section>
  )
}



export default ReviewsPage