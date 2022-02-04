import { Button, Input, useToast, BodyModal, Box } from 'src/design-system'

import { useState } from 'react'
import { useMutation } from '@redwoodjs/web'
import { TagGroupItem } from 'src/components/Tag/TagItem/TagItem'
import { Flex } from '@chakra-ui/react'
import { QUERIES_TO_REFETCH } from 'src/components/Tag/EditTagsModal/EditTagsModal'

const CREATE_TAG = gql`
  mutation CreateTag($name: String!, $tagGroupId: String!) {
    createTag(input: { name: $name, tagGroupId: $tagGroupId }) {
      id
      name
      tagGroupId
      __typename
    }
  }
`
export const CreateTagModal = ({ tagGroup, onClose }) => {
  const createTagMutation = useMutation(CREATE_TAG)
  const [tagName, setTagName] = useState('')
  const toast = useToast()

  const [createTag, { loading }] = createTagMutation
  const handleCreateTag = (name) =>
    createTag({
      variables: { name, tagGroupId: tagGroup.id },
      refetchQueries: QUERIES_TO_REFETCH,
    }).then((res) => {
      if (res.error) {
        toast({
          title: 'Error creating tag',
          description: res.error.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      } else {
        toast({
          title: 'Tag created completed',
          description: `${tagGroup.name} / ${name}`,
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        onClose()
      }
    })

  return (
    <BodyModal
      isOpen={loading || !!tagGroup}
      onClose={onClose}
      title="Create Tag"
      body={
        <>
          <Box mb={2}>
            <TagGroupItem tagGroup={tagGroup} />
          </Box>
          <Input
            type="text"
            placeholder="Tag name"
            onChange={(e) => setTagName(e.target.value)}
          />
          <Flex justify="end" my={4}>
            <Button onClick={onClose} mr={2}>
              Cancel
            </Button>
            <Button
              onClick={() => handleCreateTag(tagName)}
              isLoading={loading}
              variant="solid"
              colorScheme="blue"
            >
              Create
            </Button>
          </Flex>
        </>
      }
    />
  )
}