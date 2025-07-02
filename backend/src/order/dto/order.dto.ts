import { EnumOrderStatus } from '@prisma/client'
import { Type } from 'class-transformer'
import {
	IsArray,
	IsEnum,
	IsNumber,
	IsOptional,
	IsString,
	ValidateNested
} from 'class-validator'

export class OrderDto {
	@IsOptional()
	@IsEnum(EnumOrderStatus, {
		message: 'Status of order is required'
	})
	status: EnumOrderStatus

	@IsArray({
		message: 'There is no product in the order'
	})
	@ValidateNested({ each: true })
	@Type(() => OrderItemDto)
	items: OrderItemDto[]
}

export class OrderItemDto {
	@IsNumber({}, { message: 'Quantity must be a number' })
	quantity: number

	@IsNumber({}, { message: 'Price must be a number' })
	price: number

	@IsString({ message: 'Product ID must be a string' })
	productId: string

	@IsString({ message: 'Store ID must be a string' })
	storeId: string
}
