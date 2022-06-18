import React, { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function Vende() {
  const [infoToShow, setInfoToShow] = useState(0);
  const handleChange = (id) => {
    if (infoToShow !== id) {
      setInfoToShow(id);
    } else {
      setInfoToShow(0);
    }
  };
  return (
    <div id="Vende">
      <h1>Info para vender</h1>
      <div className="infos">
        <div className="info">
          <p onClick={() => handleChange(1)} className="infoTitle">
            QUE TIPO DE PRENDAS ACEPTAMOS <ArrowDropDownIcon />
          </p>
          {infoToShow === 1 && (
            <div>
              <p>
                TRABAJAMOS PRENDAS, BOLSOS/CARTERAS, CALZADOS Y ACCESORIOS DE
                MUJER
              </p>
              <p>La selección de prendas depende de múltiples factores…</p>
              <p>ESTADO</p>
              <p>
                Es excluyente que la prenda este en buen estado en general… ¿a
                que nos referimos? Las prendas deben estar lavadas; sin olores,
                manchas, marcas ni partes gastadas. La presentación de la prenda
                es decisiva en el proceso de selección. Los calzados deben estar
                especialmente conservados; no aceptaremos ningún calzado gastado
                y/o marcado, ni con roturas de ningún tipo. Estos requisitos
                excluyentes son aplicables a cualquier artículo que pretenda
                ingresar a la tienda.
              </p>
              <p>TEMPORADA</p>
              <p>
                Que la prenda se corresponda con la estación es sumamente
                considerado en el proceso de selección. Hay prendas no
                estacionales que circulamos constantemente, pero hay otras que
                se corresponden únicamente con una estación en particular y,
                debido al costo de almacenaje, si se entregan fuera de temporada
                no las aceptamos. (ej: campera de invierno en verano)
              </p>
              <p>MARCA</p>
              <p>
                Las prendas de mayor rotación suelen ser de marcas nacionales e
                internacionales; por lo tanto, en el proceso de selección
                ponderamos especialmente la ropa de marca. Haciendo click acá
                podés chechear la lista de referencia con las marcas que más
                buscamos.
              </p>
              <p>
                Estado, Temporada y Marca son los tres factores de mayor
                incidencia en el proceso de selección de prendas. Cuando
                rechazamos ropa, no es personal ni con ánimo de ofender;
                simplemente buscamos efectivizar la venta a través de algunos
                criterios entre los que se destacan los mencionados.
              </p>
            </div>
          )}
        </div>
        <div className="info">
          <p onClick={() => handleChange(2)} className="infoTitle">
            COMO PUEDO COBRAR MIS VENTAS <ArrowDropDownIcon />
          </p>
          {infoToShow === 2 && (
            <div>
              <p>
                PODES LLEVARTE EL 30% DEL VALOR DE VENTA DE LAS PRENDAS EN
                EFECTIVO, AL MOMENTO DE ENTREGARLAS.
              </p>
              <p>
                PODES DEJAR LAS PRENDAS A CONSIGNACIÓN Y COBRAR EL 50% DEL VALOR
                DE VENTA. PODES SEGUIR TUS VENTAS EN TIEMPO REAL A TRAVÉS DE TU
                USUARIO DE autentika.uy
              </p>
              <p>
                PODES OPTAR POR LLEVARTE EL 60% DEL VALOR DE VENTA DE LAS
                PRENDAS EN CRÉDITO, PARA COMPRAR EN AUTENTIKA.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Vende;
