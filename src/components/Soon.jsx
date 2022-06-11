import React, { useState } from "react";

function Soon() {
  const [show, setShow] = useState(true);
  return (
    <div>
      {show && (
        <div className="soon">
          <div>
            <h1 style={{ textAlign: "center" }}>VOID - COMING SOON</h1>
            <p style={{ textAlign: "center" }}>
              La aplicacion esta en etapa de desarrollo
            </p>
            <p style={{ textAlign: "center" }}>
              El diseño, las imagenes y los productos son datos de testing
            </p>
            <p style={{ textAlign: "center", marginTop: "20px", }}>
              Tarjeta de Prueba : <br />
              NUM : 5031 7557 3453 0604	<br />
              NOMBRE : APRO	<br />
              VENCE : 11/25 <br />
              SEG : 123

            </p>
            <p
              onClick={() => setShow(false)}
              style={{
                textAlign: "center",
                textDecoration: "underline",
                marginTop: "20px",
                cursor:"pointer"
              }}
            >
              Quiero hecharle un vistazo
            </p>
            <p
              onClick={() =>
                (window.location.href = process.env.REACT_APP_API + "/admin")
              }
              style={{
                textAlign: "center",
                textDecoration: "underline",
                marginTop: "20px",
                cursor:"pointer"
              }}
            >
              Si eres administrador, puedes realizar cambios en la base de
              datos, pulsando aqui.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Soon;
