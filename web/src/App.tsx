import { AuthProvider } from '@redwoodjs/auth'

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'
import { ChakraProvider } from '@chakra-ui/react'
import { chakraTheme } from './design-system'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './scaffold.css'
import './index.css'

import './lib/locale'

import { FilterContextProvider } from 'src/contexts/filter'
import { TagContextProvider } from 'src/contexts/tags'
import { SelectContextProvider } from 'src/contexts/select'

import { graphQLClientConfig } from 'src/lib/apollo'
const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <ChakraProvider theme={chakraTheme}>
      <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
        <AuthProvider type="dbAuth">
          <RedwoodApolloProvider graphQLClientConfig={graphQLClientConfig}>
            <FilterContextProvider>
              <TagContextProvider>
                <SelectContextProvider>
                  <Routes />
                </SelectContextProvider>
              </TagContextProvider>
            </FilterContextProvider>
          </RedwoodApolloProvider>
        </AuthProvider>
      </RedwoodProvider>
    </ChakraProvider>
  </FatalErrorBoundary>
)

export default App
