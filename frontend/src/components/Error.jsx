const Error = ({children}) => {
  
  return (
    <div className="alert alert-danger">
      {children}
    </div>
  )
}

export default Error