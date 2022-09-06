import { Component } from 'react'

class ErrorBoundary extends Component {
   state = {
      error: false
   }

   componentDidCatch(error, errorInfo) {
      console.log(error, errorInfo)
      this.setState({
         error: true
      })
   }
   render() {
      if (this.state.error) {
         return <h2>Что-то пошло не так.</h2>
      }
      return this.props.childres
   }
}
export default ErrorBoundary;