import React from "react";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import InstagramIcon from '@mui/icons-material/Instagram';

function Contact() {
  return (
    <div id="Contact">
      <div className="container">
        <div className="row">
          <div className="col-md-6 contactInfo">
            <h3>Encontranos en las redes sociales</h3>
            <hr />
            <p><LocationOnIcon/> Carlos Sáez 6418</p>
            <p><PhoneIcon/> +598 97 748 613</p>
            <p><InstagramIcon/> <a href="https://www.instagram.com/autentika.secondhand/">@autentika.secondhand</a></p>
          </div>
          <div className="col-md-6">
            <h3>Contactanos</h3>
            <hr />
            <form name="contact" netlify method="post" className="contactForm">
              <input name="name" required type="text" placeholder="Nombre Completo" />
              <input name="phone" required type="text" placeholder="Celular" />
              <input name="email" required type="email" placeholder="Mail" />
              <textarea name="info" required placeholder="Que necesitas?"></textarea>
              <button type="submit">Enviar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
