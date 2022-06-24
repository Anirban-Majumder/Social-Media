export default {
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    {
      name: 'comment',
      title: 'Comment',
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
      name: 'tweet',
      title: 'Tweet',
      description: 'Reference Tweet the comment is associated with:',
      type: 'reference',
      to: {
        type: 'tweet'
      }
    }
  ],
}
