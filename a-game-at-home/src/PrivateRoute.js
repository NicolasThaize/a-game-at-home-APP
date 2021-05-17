import {Redirect} from "react-router";

function PrivateRoute (props) {
  if (!props.authed){
    return <Redirect to={{pathname: '/login'}} />
  }
  return (
    <div>
      {props.children}
    </div>
  )
}

export default PrivateRoute;
