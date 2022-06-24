export default {
  name: 'tweet',
  title: 'Tweet',
  type: 'document',
  fields: [
    {
      name: 'text',
      title: 'Text in the Tweet',
      type: 'string',
    },
    {
      name: 'blockTweet',
      title: 'Block Tweet',
      description: 'ADMIN Controls: Toggle if Tweet is inappropriate',
      type: 'boolean'
    },
    {
      name: 'image',
      title: 'Tweet Image',
      type: 'string',
    },
    {
      name: 'user',
      title: 'User',
      description: 'Reference to User the comment is associated with:',
      type: 'reference',
      to: {
        type: 'user'
      }
    },
    {
      name: 'likes',
      title: 'No. of likes',
      type: 'number',
    },
  ]
}
