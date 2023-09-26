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
