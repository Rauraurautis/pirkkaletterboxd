import { FC } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { ReviewSearchType } from '../../pages/ReviewsPage'

interface ReviewSearchFormsProps {
    applySearch: (val: ReviewSearchType | null) => void
}

const ReviewSearchForms: FC<ReviewSearchFormsProps> = ({ applySearch }) => {
    const { register, handleSubmit, formState: { errors } } = useForm()

    const handleReviewSearch = async (e: FieldValues) => {
        applySearch({ searchMode: "movie", value: e.movie })
    }
    return (
        <div className="flex w-full lg:w-[50%] justify-around">
            <div className="flex flex-col items-center gap-2">
                <h2 className='underline underline-offset-[5px]'>Search by movie name</h2>
                <form className="flex flex-col gap-5 items-center" onSubmit={handleSubmit(handleReviewSearch)}>
                    <input type="text" {...register("movie", { required: true })} placeholder='Movie name' className='p-1 bg-gray-800 text-white' />
                    {errors.name && <p className="text-red-600">Enter a movie name or a part of a movie name!</p>}
                    <button className="p-2 bg-blue-800 w-fit">Search</button>
                </form>
            </div>
        </div>
    )
}

export default ReviewSearchForms