import ChildrenProp from 'models/ChildrenProp'
import classNamesToString from 'helpers/classNamesToString'
import classnames, {
  alignItems,
  backgroundColor,
  borderRadius,
  display,
  flexDirection,
  gridColumn,
  justifyContent,
  padding,
  space,
} from 'classnames/tailwind'

const badgeWrapper = (minted: boolean) =>
  classnames(
    display('flex'),
    flexDirection('flex-col'),
    justifyContent(minted ? 'justify-start' : 'justify-center'),
    space('space-y-2'),
    alignItems('items-center'),
    borderRadius('rounded-lg'),
    backgroundColor(minted ? 'bg-primary-dimmed' : 'bg-primary-background'),
    padding('px-4', 'py-4'),
    gridColumn('col-span-1', 'lg:col-span-2')
  )

export default function ({
  children,
  minted,
}: ChildrenProp & { minted: boolean }) {
  return (
    <div
      className={classNamesToString(
        badgeWrapper(minted),
        'lg:each-new-line-3:pre-last:col-span-3',
        'lg:each-from-second:not-each-new-line-3:not-thirds:last:col-span-3', // will select only 2, 5, 8
        'lg:each-new-line-3:last:col-span-full',
        'smToLg:odd:last:col-span-full'
      )}
    >
      {children}
    </div>
  )
}

// @media screen and (min-width: 1024px) {
//   /* take only 1, 4, 7 + before-last */
//   .last-row-modifier:nth-child(3n - 2):nth-last-child(2),
// /* take 2, 3, 4, exclude 1, 4, 7, exclude dividable by 3 + take only last */
// /* = take 2, 5, 8 only last of those */
// .last-row-modifier:nth-child(n + 2):not(:nth-child(3n
//       -
//       2)):not(:nth-child(3n)):last-child {
//     grid-column: span 3 / span 3;
//   }

//   .last-row-modifier:nth-child(3n - 2):last-child {
//     grid-column: var(--col-span-full);
//   }
// }
// @media screen and (min-width: 450px) and (max-width: 1024px) {
//   .last-row-modifier:nth-child(odd):last-child {
//     grid-column: var(--col-span-full);
//   }
// }
