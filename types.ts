import type { OverridableComponent } from '@mui/types'
import type { SvgIconTypeMap } from '@mui/material'

export type Icon = OverridableComponent<SvgIconTypeMap> & { muiName: string }
