import {Redirect} from "react-router";

function PrivateRoute (props) {
  const privateUrls = [
    '/profile',
    '/profile/',
    '/profile/modify',
    '/profile/modify/',
    '/profile/sessions',
    '/profile/sessions/',
    '/profile/teams',
    '/profile/teams/',
    '/profile/join/team',
    '/profile/join/team/',
    '/profile/create/team',
    '/profile/create/team/',
    '/join/session',
    '/join/session/',
    '/join/session/validation',
    '/join/session/validation/',
    '/join/session/actual',
    '/join/session/actual/',
    '/admin/',
    '/admin,',
    '/admin/sessions/',
    '/admin/sessions',
    '/admin/challenges/',
    '/admin/challenges',
    '/admin/proofs/',
    '/admin/proofs',
    '/admin/articles',
    '/admin/articles/',
    '/admin/notValidated/',
    '/admin/notValidated'
  ]

  const pathName  = window.location.pathname.toLowerCase()

  const find = privateUrls.find(el => el === pathName);

  if (!props.authed && find){
    return <Redirect to={{pathname: '/login'}} />
  }
  return (
    <div>
      {props.children}
    </div>
  )
}

export default PrivateRoute;
