import 'simplebar/dist/simplebar.min.css'
import { FC } from 'react'
import SimpleBar from 'simplebar-react'

const CustomScrollbar: FC<{ maxHeight?: number }> = ({
  children,
  maxHeight = 350,
}) => {
  return <SimpleBar style={{ maxHeight }}>{children}</SimpleBar>
}

export default CustomScrollbar
