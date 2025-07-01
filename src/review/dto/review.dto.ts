import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator'

export class ReviewDto {
	@IsString({
		message: 'Text of review must be a string'
	})
	@IsNotEmpty({ message: 'Text of review is required' })
	text: string

	@IsNumber({}, { message: 'Rating must be a number' })
	@Min(1, { message: 'Minimum rating - 1' })
	@Max(5, { message: 'Maximum rating - 5' })
	@IsNotEmpty({ message: 'Rating is required' })
	rating: number
}
