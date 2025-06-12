
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-neutral-50 border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-neutral-600 text-sm">
              &copy; {new Date().getFullYear()} Portal de Questionários em Medicina do Sono – Dr. Fernando Azevedo
            </p>
          </div>
          <div>
            <ul className="flex flex-wrap justify-center space-x-4">
              <li>
                <Link to="/sobre" className="text-primary-600 hover:text-primary-800 text-sm">
                  Sobre
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-primary-600 hover:text-primary-800 text-sm">
                  Contato
                </Link>
              </li>
              <li>
                <Link to="/termos" className="text-primary-600 hover:text-primary-800 text-sm">
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
