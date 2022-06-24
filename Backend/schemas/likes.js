export default {
    name: 'likes',
    title: 'Likes',
    type: 'document',
    fields: [
        {
            name: 'liked',
            title: 'Liked',
            type: 'boolean'
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