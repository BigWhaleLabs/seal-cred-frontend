import { FC, ReactNode } from 'react'
import { HeaderText, PopupBodyText, SubheaderText } from 'components/Text'
import {
  alignItems,
  backgroundColor,
  borderRadius,
  classnames,
  display,
  height,
  inset,
  justifyContent,
  margin,
  opacity,
  padding,
  position,
  visibility,
  zIndex,
} from 'classnames/tailwind'
import Button from 'components/Button'
import usePopUp from 'components/Popup/usePopup'

interface PopupProps {
  title?: string
  body?: string
  activator?: ReactNode
  activatorTitle?: string
  closeTitle?: string
  confirmTitle?: string
  onClose?: () => void
  onConfirm?: () => void
}

const popupOverlay = (shown: boolean) =>
  classnames(
    position(shown ? 'fixed' : undefined),
    visibility(shown ? undefined : 'invisible'),
    height(shown ? 'h-full' : 'h-0'),
    margin('mt-0'),
    inset('inset-0'),
    backgroundColor('bg-primary'),
    opacity('opacity-20'),
    zIndex('z-50')
  )
const popupBlock = (shown: boolean) =>
  classnames(
    position(shown ? 'fixed' : undefined),
    display(shown ? undefined : 'hidden'),
    inset(
      'top-28',
      'left-6',
      'right-6',
      'md:top-40',
      'md:left-32',
      'md:right-32'
    ),
    borderRadius('rounded-3xl'),
    padding('px-6', 'py-12', 'md:px-12'),
    backgroundColor('bg-background'),
    zIndex('z-50')
  )
const popupFooter = (oneButton: boolean) =>
  classnames(
    display('flex'),
    justifyContent(
      'justify-center',
      oneButton ? 'md:justify-center' : 'md:justify-end'
    ),
    alignItems('items-center'),
    margin('mt-4')
  )
const popupDefaultButtons = classnames(margin('mx-2'))

const Popup: FC<PopupProps> = ({
  title = '',
  body,
  activator,
  activatorTitle,
  closeTitle,
  confirmTitle,
  onClose,
  onConfirm,
  children,
}) => {
  const { showPopup, togglePopup } = usePopUp()

  const activatorButton = activator ? (
    <div onClick={() => togglePopup()}>{activator}</div>
  ) : (
    <Button
      color="accent"
      title={activatorTitle || 'Open'}
      onClick={() => closeMethod()}
    />
  )

  const isCloseButton = !!closeTitle || !!onClose
  const isConfirmButton = !!confirmTitle || !!onConfirm
  const isOneButton =
    (isCloseButton && !isConfirmButton) || (!isCloseButton && isConfirmButton)

  const closeMethod = () => {
    if (onClose) onClose()
    closePopup()
  }
  const confirmMethod = () => {
    if (onConfirm) onConfirm()
    closePopup()
  }

  const closeBtn = (
    <div className={popupDefaultButtons}>
      <Button
        color="primary"
        title={closeTitle ? closeTitle : 'Close'}
        onClick={() => closeMethod()}
      />
    </div>
  )
  const confirmBtn = (
    <div className={popupDefaultButtons}>
      <Button
        color="primary"
        title={confirmTitle ? confirmTitle : 'Confirm'}
        onClick={() => confirmMethod()}
      >
        {confirmTitle ? confirmTitle : 'Confirm'}
      </Button>
    </div>
  )
  const footer =
    isCloseButton || isConfirmButton ? (
      <div className={popupFooter(isOneButton)}>
        {isCloseButton ? closeBtn : null}
        {isConfirmButton ? confirmBtn : null}
      </div>
    ) : null
  const propPopup = (
    <>
      <SubheaderText>{body}</SubheaderText>
      {footer}
    </>
  )
  const closePopup = () => togglePopup(false)

  return (
    <div>
      {activatorButton}
      <div
        className={popupOverlay(showPopup)}
        onClick={() => closePopup()}
      ></div>
      <div className={popupBlock(showPopup)}>
        <HeaderText>{title}</HeaderText>
        <div className="my-2">
          <PopupBodyText>{children ? children : propPopup}</PopupBodyText>
        </div>
      </div>
    </div>
  )
}

export default Popup
