//#region Import Necessary Dependencies
import React from "react";
import PropTypes from "prop-types";
import { MESSAGE } from "../../../Constants";
//#endregion

// Import Stylings
import "./ModelInventory.css";

// Import UI Components
import ModelInventoryCard from "../../Cards/ModelInventoryCard/ModelInventoryCard";

// Define ModelInventory Component
function ModelInventory(props) {
  // Extract necessary props
  const { className, selectedModels, onSelectModel, modelInventory } = props;

  return (
    <div
      className={`${
        modelInventory?.length > 0
          ? "ModelInventory-Container"
          : "ModelInventory-Message"
      } ${className}`}
    >
      {modelInventory?.length > 0 ? (
        modelInventory.map((item) => (
          <ModelInventoryCard
            key={item.modelId}
            modelId={item.modelId}
            modelPhoto={item.modelPhoto}
            modelName={item.modelName}
            typeName={item.typeName}
            equipmentAmount={item.equipmentCount}
            isSelected={selectedModels.includes(item.modelId)}
            onSelect={onSelectModel}
          />
        ))
      ) : (
        <p className="paragraph-1">{MESSAGE.emptyModel}</p>
      )}
    </div>
  );
}

// Define Proptypes for the component
ModelInventory.propTypes = {
  className: PropTypes.string,
  selectedModels: PropTypes.array.isRequired,
  onSelectModel: PropTypes.func.isRequired,
  modelInventory: PropTypes.array.isRequired,
};

// Define DefaultProps for the component
ModelInventory.defaultProps = {
  className: "",
};

// Exports the ModelInventory component as the default export for the ModelInventory module.
export default ModelInventory;
