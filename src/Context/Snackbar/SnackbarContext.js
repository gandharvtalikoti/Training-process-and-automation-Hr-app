import {createContext, useContext} from 'react'

export const SnackbarContext = createContext()

export const SnackbarContextProvider = SnackbarContext.Provider

// Snackbar hook - can be used in functional components
export const useSnackbar = () => {
  const {showSnackbar} = useContext(SnackbarContext)
  return showSnackbar
}

// Snackbar wrapper - can be used with class components
export const withSnackbar = Component => {
  const Wrappedcomponent = newProps => {
    return <SnackbarContext.Consumer>{props => <Component {...props} {...newProps} />}</SnackbarContext.Consumer>
  }
  return Wrappedcomponent
}
