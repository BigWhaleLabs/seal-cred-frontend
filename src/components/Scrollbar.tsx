import 'simplebar/dist/simplebar.min.css'
import { FC } from 'react'
import SimpleBar from 'simplebar-react'

const Scrollbar: FC<{ maxHeight?: number }> = ({
  children,
  maxHeight = 350,
}) => {
  return <SimpleBar style={{ maxHeight }}>{children}</SimpleBar>
}

export default Scrollbar
