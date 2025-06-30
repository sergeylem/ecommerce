import { IsString } from 'class-validator'

export class CategoryDto {
	@IsString({
		message: 'Name is required'
	})
	title: string

	@IsString({
		message: 'Description is required'
	})
	description: string
}
