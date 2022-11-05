import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="app__footer">
       <ul className="app__footer__list">
        <li className="app__footer__list-item">
          <a href="#">Home</a>
        </li>
        <li className="app__footer__list-item">
          <a href="#">New</a>
        </li>
        <li className="app__footer__list-item">
          <a href="#">About</a>
        </li>
        <li className="app__footer__list-item">
          <a href="#">Contacts</a>
        </li>
      </ul>
      
      <p>Netflix &copy; 2022</p>
    </footer>
  );
};
