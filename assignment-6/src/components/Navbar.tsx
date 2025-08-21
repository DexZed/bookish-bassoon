// TODO: ADD functionality and styling
import { Link } from 'react-router'

type Props = {}

function Navbar({}: Props) {
    
  return (
    <header>
        <nav>
          <Link to="/">🏠 Home</Link> |{" "}
          <Link to="/about">ℹ️ About</Link> |{" "}
          <Link to="/contact">📞 Contact</Link> |{" "}
          <Link to="/login">🔑 Login</Link> |{" "}
          <Link to="/register">📝 Register</Link>
        </nav>
        <hr />
      </header>
  )
}

export default Navbar