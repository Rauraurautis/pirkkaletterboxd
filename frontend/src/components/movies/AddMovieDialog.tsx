import { FC } from 'react'

interface AddMovieDialogProps {

}

const AddMovieDialog: FC<AddMovieDialogProps> = ({ }) => {
    return (
        <div className="z-10 max-h-[600px] w-[400px] md:w-[700px] bg-zinc-700 absolute left-[50%]
         translate-x-[-50%] top-[50%] translate-y-[-50%] rounded-xl flex flex-col items-center gap-5 pt-5 pb-10" id="review">

        </div>
    )
}

export default AddMovieDialog