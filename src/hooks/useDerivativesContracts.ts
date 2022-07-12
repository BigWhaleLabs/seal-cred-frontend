import useDerivativeContracts from 'hooks/useDerivativeContracts'

export default function () {
  const {
    externalERC721derivativeContracts,
    ERC721derivativeContracts,
    emailDerivativeContracts,
  } = useDerivativeContracts()

  return [
    ...externalERC721derivativeContracts,
    ...ERC721derivativeContracts,
    ...emailDerivativeContracts,
  ]
}
