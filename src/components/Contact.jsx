import React from "react";

function Contact() {
  return (
    <div id="Contact">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h3>Encontranos en las redes sociales</h3>
            <hr />
            <p>autentika@gmail.com</p>
            <p>096 416 968</p>
            <p>@autentika</p>
          </div>
          <div className="col-md-6">
            <h3>Contactanos</h3>
            <hr />
            <form name="contact" method="POST" data-netlify="true" className="contactForm">
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
