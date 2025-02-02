import React from "react";

export const Title = ({
  title1 = "Default Title", // Valor predeterminado para el título principal
  title2 = "", // Valor predeterminado para el subtítulo
  titleStyles = "",
  title1Styles = "",
  paraStyles = "",
  showParagraph = false, // Controla si el párrafo debe mostrarse
}) => {
  return (
    <div className={`${titleStyles} pb-1`} aria-label="Title component">
      {/* Título principal */}
      <h3 className={`${title1Styles} h3`}>
        {title1}
        <span className="text-secondary !font-light">{title2}</span>
      </h3>

      {/* Párrafo opcional */}
      {showParagraph && (
        <p className={`${paraStyles}`}>
          Discover the latest trends and styles in fashion, accessories, and
          beauty at
          <span className="text-secondary"> OutfiroER</span>
        </p>
      )}
    </div>
  );
};
