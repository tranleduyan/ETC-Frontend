import React from 'react';
import PropTypes from 'prop-types';
import AvailableModelCard from '../../Cards/AvailableModelCard/AvailableModelCard';
import { MESSAGE } from '../../../Constants';

import './AvailableModelList.css';

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
          availableCount={item.availableCount}
          isSelected={selectedModels.includes(item.modelId)}
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
  selectedModel: PropTypes.array,
  onSelectModel: PropTypes.func,
};

// Define default props value for AvailableModelList
AvailableModelList.defaultProps = {
  className: '',
  availableModels: [],
  selectedModel: [],
  onSelectModel: () => {},
};

export default AvailableModelList;
