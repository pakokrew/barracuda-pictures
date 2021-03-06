import { useFilterContext } from 'src/contexts/filter'
import { Flex, ButtonGroup, IconButton } from '@chakra-ui/react'
import { FilterSection } from 'src/components/Filter/FilterSection'
import { FaEquals, FaGreaterThanEqual, FaLessThanEqual } from 'react-icons/fa'
import { MdStar, MdStarOutline } from 'react-icons/md'
import { useCallback } from 'react'
import { Rating } from 'src/design-system/components/Rating'

export const RatingPanel = () => {
  const {
    filter: { rating },
    setRating,
  } = useFilterContext()

  const value = rating?.value || 0
  const condition = rating?.condition || 'gte'

  const handleChange = useCallback(
    (v, c) => {
      if (v === 0 && c === 'gte') {
        setRating(null)
      } else {
        setRating({
          value: v,
          condition: c,
        })
      }
    },
    [setRating, condition]
  )

  const setValue = useCallback(
    (v) => {
      handleChange(v, condition)
    },
    [setRating, condition]
  )

  const setCondition = useCallback(
    (c) => {
      handleChange(value, c)
    },
    [setRating, value]
  )

  return (
    <FilterSection
      title="Rating"
      active={!!rating}
      onClear={() => setRating(null)}
    >
      <Flex align="center" justify="space-around">
        <Rating
          value={value}
          onChange={(v) => (v === value ? setValue(0) : setValue(v))}
        />

        <ButtonGroup isAttached size="sm" variant="outline" colorScheme="green">
          <IconButton
            aria-label="lte"
            icon={<FaLessThanEqual />}
            variant={condition === 'lte' ? 'solid' : 'outline'}
            onClick={() => setCondition('lte')}
          />
          <IconButton
            aria-label="equals"
            icon={<FaEquals />}
            variant={condition === 'equals' ? 'solid' : 'outline'}
            onClick={() => setCondition('equals')}
          />
          <IconButton
            aria-label="gte"
            icon={<FaGreaterThanEqual />}
            variant={condition === 'gte' ? 'solid' : 'outline'}
            onClick={() => setCondition('gte')}
          />
        </ButtonGroup>
      </Flex>
    </FilterSection>
  )
}
