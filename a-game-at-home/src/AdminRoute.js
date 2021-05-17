import {Redirect} from "react-router";

function AdminRoute (props) {
  const adminUrls = [
    '/admin/',
    '/admin,',
    '/admin/sessions/',
    '/admin/sessions',
    '/admin/challenges/',
    '/admin/challenges',
    '/admin/proofs/',
    '/admin/proofs',
    '/admin/notValidated/',
    '/admin/notValidated'
  ]

  const pathName  = window.location.pathname.toLowerCase()

  const find = adminUrls.find(el => el === pathName);

  if (!props.authed && find){
    return <Redirect to={{pathname: '/'}} />
  }
  return (
    <div>
      {props.children}
    </div>
  )
}

export default AdminRoute;
