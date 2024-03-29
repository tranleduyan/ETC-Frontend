//#region Import Neccessary Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { MESSAGE } from '../../../Constants';
//#endregion

// Import Stylings
import './AvailableModelList.css';

//#region Import UI Components
import AvailableModelCard from '../../Cards/AvailableModelCard/AvailableModelCard';
//#endregion

function AvailableModelList(props) {

  // Extract necessary props
  const { className, availableModels, selectedModels, onSelectModel, isMakingReservation } = props;

  return (
    <div className={`${availableModels?.length > 0 ? 'AvailableModelList-Container' : 'AvailableModelList-Message'} ${className}`}>
      {availableModels?.length > 0
        ?
        availableModels.map((item) => (
          <AvailableModelCard
          key={item.modelId}
          modelId={item.modelId}
          modelName={item.modelName}
          modelPhoto={item.modelPhoto}
          typeName={item.typeName}
          typeId={item.typeId}
          availableCount={item.availableCount}
          isSelected={selectedModels.some(selectedModel => selectedModel.modelId === item.modelId)}
          onSelect={onSelectModel}
          isMakingReservation={isMakingReservation}
          />
        ))
        :
          <p className='paragraph-1'>{MESSAGE.emptyAvailableModels}</p>
      }

    </div>
  )
};

// Define PropTypes for AvailableModelList
AvailableModelList.propTypes = {
  className: PropTypes.string,
  availableModels: PropTypes.array,
  selectedModels: PropTypes.array,
  onSelectModel: PropTypes.func,
  isMakingReservation: PropTypes.bool,
};

// Define default props value for AvailableModelList
AvailableModelList.defaultProps = {
  className: '',
  availableModels: [],
  selectedModels: [],
  onSelectModel: () => {},
  isMakingReservation: false,
};
// Exports the AvailableModelList component as the default export for the AvailableModelList module.
export default AvailableModelList;
