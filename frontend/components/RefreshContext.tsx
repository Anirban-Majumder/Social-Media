import React from 'react'

const RefreshContext = React.createContext({
    refresh: false,
    setRefresh: (value: boolean) => {}
  });

export default RefreshContext