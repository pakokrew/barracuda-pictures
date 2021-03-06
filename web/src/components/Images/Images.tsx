import moment from 'moment'
import { VStack, Wrap, WrapItem } from '@chakra-ui/react'
import { Box, Heading } from '@chakra-ui/react'
import { useEffect, useMemo, useRef } from 'react'

import debounce from 'lodash.debounce'
import { FindImages } from 'types/graphql'
import { ImagesItem } from './ImagesItem'

type ImagesProps = {
  images: FindImages['images']
  loadMore: () => void
}

const Images = ({ images, loadMore }: ImagesProps) => {
  // Split by Month _ Year
  const imageGroups = useMemo(() => {
    const groups = []
    let currentYear = -1
    let currentMonth = -1

    images.forEach((image) => {
      const year = moment(image.dateTaken).year()
      const month = moment(image.dateTaken).month()
      if (year !== currentYear || month !== currentMonth) {
        groups.push({
          title: `${moment.months()[month]} ${year}`,
          images: [image],
        })
      } else groups[groups.length - 1].images.push(image)
      currentYear = year
      currentMonth = month
    })
    return groups
  }, [images])

  // Infinite scroll load
  const scrollRef = useRef(null)
  useEffect(() => {
    const div = scrollRef.current
    const handleScroll = debounce(() => {
      if (div.scrollTop + div.offsetHeight >= div.scrollHeight) {
        loadMore()
      }
    }, 100)
    div.addEventListener('scroll', handleScroll)
    return () => {
      div.removeEventListener('scroll', handleScroll)
    }
  }, [loadMore])

  return (
    <VStack
      ref={scrollRef}
      align="start"
      h="100%"
      overflow="auto"
      pt={4}
      pb={4}
      spacing={4}
    >
      {imageGroups.map((group) => (
        <Box key={group.title}>
          <Heading
            textStyle="h4"
            size="sm"
            borderBottomColor="gray.300"
            borderBottomWidth={1}
          >
            {group.title}
          </Heading>
          <Wrap mt={2} spacing={0.5}>
            {group.images.map((image) => (
              <WrapItem key={image.id}>
                <ImagesItem image={image} />
              </WrapItem>
            ))}
          </Wrap>
        </Box>
      ))}
    </VStack>
  )
}

export default Images
