import {Redirect} from "react-router";

function AdminRoute (props) {
  const adminUrls = [
    '/admin/',
    '/admin/sessions',
    '/admin/challenges',
    '/admin/proofs',
    '/admin/notValidated'
  ]

  const pathName  = window.location.pathname.toLowerCase()

  const find = adminUrls.find(el => el === pathName);

  if (!props.authed && find){
    return <Redirect to={{pathname: '/Presentation'}} />
  }
  return (
    <div>
      {props.children}
    </div>
  )
}

export default AdminRoute;
