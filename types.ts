import type { OverridableComponent } from '@mui/types'
import type { SvgIconTypeMap } from '@mui/material'

export type Icon = OverridableComponent<SvgIconTypeMap> & { muiName: string }

const LimitedTimeOptions = [
  'Pumpkin Spice',
  'Snickerdoodle',
  'Hot Cocoa',
  'Gingerbread'
] as const
export const FlavorOptions = [
  'Original',
  'Organic Vanilla',
  'Chocolate',
  'Chocolate Chip',
  ...LimitedTimeOptions
] as const
export type FlavorOptionType = (typeof FlavorOptions)[number]

export const DeliveryOptions = [
  'Pick up at baker’s location - $0',
  'Meet in the middle - $5',
  'Delivery to location (Greater St. Louis Area only) - $10',
  'Shipping via UPS - Market Price'
] as const
export type DeliveryOptionType = (typeof DeliveryOptions)[number]

export const AllergyOptions = ['Gluten', 'Nut', 'Dairy'] as const
export type AllergyOptionType = (typeof AllergyOptions)[number]
