//#region Dashboard API Response Body Simulation

// Inventory Summary Response - Simulate the API Response Body that populates the inventory list in Dashboard
const InventorySummaryResponse = [
  {
    typeID: 1,
    typeName: 'Voltmeter',
    inventoryAmount: 20,
    reservationAmount: 5,
  },
  {
    typeID: 2,
    typeName: 'Thermometer',
    inventoryAmount: 15,
    reservationAmount: 5,
  },
  {
    typeID: 3,
    typeName: 'Barometer',
    ç: 12,
    reservationAmount: 0,
  },
  {
    typeID: 4,
    typeName: 'Ammeter',
    inventoryAmount: 8,
    reservationAmount: 2,
  },
  {
    typeID: 5,
    typeName: 'Multimeter',
    inventoryAmount: 5,
    reservationAmount: 8,
  },
  {
    typeID: 6,
    typeName: 'Hydrometer',
    inventoryAmount: 10,
    reservationAmount: 3,
  },
  {
    typeID: 7,
    typeName: 'Oscilloscope',
    inventoryAmount: 18,
    reservationAmount: 6,
  },
  {
    typeID: 8,
    typeName: 'Spectrophotometer',
    inventoryAmount: 22,
    reservationAmount: 1,
  },
  {
    typeID: 9,
    typeName: 'Manometer',
    inventoryAmount: 7,
    reservationAmount: 0,
  },
  {
    typeID: 10,
    typeName: 'Luxmeter',
    inventoryAmount: 14,
    reservationAmount: 4,
  },
];

// All Reservations Response  - Simulate the API Response Body that populates the reservations list in Dashboard (For Admin and Faculty view)
const AllReservationsResponse = [
  {
    reservationID: 7,
    renterName: 'Emily Wilson',
    startDate: '12/20/2023',
    endDate: '12/22/2023',
    status: 'Requested',
    reserveAmount: 8,
  },
  {
    reservationID: 9,
    renterName: 'Amanda Lee',
    startDate: '12/28/2023',
    endDate: '12/30/2023',
    status: 'Approved',
    reserveAmount: 6,
  },
  {
    reservationID: 11,
    renterName: 'Sophia Johnson',
    startDate: '12/23/2023',
    endDate: '12/26/2023',
    status: 'Requested',
    reserveAmount: 7,
  },
  {
    reservationID: 12,
    renterName: 'Robert White',
    startDate: '12/28/2023',
    endDate: '12/31/2023',
    status: 'Requested',
    reserveAmount: 2,
  },
];

// In Use Ammeter Reponse - Simulate the API Response Body that populates the equipment that is in use upon clicking on an inventory summary card in Dashboard.
const InUseAmmeter = [
  {
    typeID: 4,
    typeName: 'Ammeter',
    modelID: 1,
    modelName: 'Fluke 87V Max',
    modelPhotoPath: null,
    serialNumber: 'AM-5567'
  },
  {
    typeID: 4,
    typeName: 'Ammeter',
    modelID: 5,
    modelName: 'Fluke 95V',
    modelPhotoPath: null,
    serialNumber: 'AM-8892'
  },
  {
    typeID: 4,
    typeName: 'Ammeter',
    modelID: 6,
    modelName: 'Agilent 34410A',
    modelPhotoPath: null,
    serialNumber: 'AM-7890'
  },
  {
    typeID: 4,
    typeName: 'Ammeter',
    modelID: 7,
    modelName: 'Keithley 6487',
    modelPhotoPath: null,
    serialNumber: 'AM-2468'
  },
  {
    typeID: 4,
    typeName: 'Ammeter',
    modelID: 8,
    modelName: 'Hioki 3280-10F',
    modelPhotoPath: null,
    serialNumber: 'AM-1357'
  }
];

// In Use Voltmeter Reponse - Simulate the API Response Body that populates the equipment that is in use upon clicking on an inventory summary card in Dashboard.
const InUseVoltmeter = [
  {
    typeID: 1,
    typeName: 'Voltmeter',
    modelID: 12,
    modelName: 'BrandX V123',
    modelPhotoPath: null,
    serialNumber: 'VM-1234'
  },
  {
    typeID: 1,
    typeName: 'Voltmeter',
    modelID: 13,
    modelName: 'TechVolt 2000',
    modelPhotoPath: null,
    serialNumber: 'VM-5678'
  },
];

// In Use Thermometer Reponse - Simulate the API Response Body that populates the equipment that is in use upon clicking on an inventory summary card in Dashboard.
const InUseThermometer = [
  {
    typeID: 2,
    typeName: 'Thermometer',
    modelID: 14,
    modelName: 'ThermoPro TP50',
    modelPhotoPath: 'https://dam-assets.fluke.com/s3fs-public/F-179_01e-350x500.png',
    serialNumber: 'TM-9876'
  },
  {
    typeID: 2,
    typeName: 'Thermometer',
    modelID: 15,
    modelName: 'AcuRite 00592A4',
    modelPhotoPath: null,
    serialNumber: 'TM-5432'
  },
  {
    typeID: 2,
    typeName: 'Thermometer',
    modelID: 16,
    modelName: 'Etekcity Lasergrip 774',
    modelPhotoPath: null,
    serialNumber: 'TM-1234'
  },
  {
    typeID: 2,
    typeName: 'Thermometer',
    modelID: 17,
    modelName: 'iHealth No-Touch Forehead Thermometer',
    modelPhotoPath: null,
    serialNumber: 'TM-5678'
  },
  {
    typeID: 2,
    typeName: 'Thermometer',
    modelID: 18,
    modelName: 'Taylor Precision Products Wireless Digital Thermometer',
    modelPhotoPath: null,
    serialNumber: 'TM-4321'
  },
];

// In Use Barometer Reponse - Simulate the API Response Body that populates the equipment that is in use upon clicking on an inventory summary card in Dashboard.
const InUseBarometer = [
  {
    typeID: 3,
    typeName: 'Barometer',
    modelID: 21,
    modelName: 'Fischer Instruments 1512-22',
    modelPhotoPath: null,
    serialNumber: 'BR-8765'
  },
  {
    typeID: 3,
    typeName: 'Barometer',
    modelID: 22,
    modelName: 'Ambient Weather WS-8600',
    modelPhotoPath: null,
    serialNumber: 'BR-5432'
  },
  {
    typeID: 3,
    typeName: 'Barometer',
    modelID: 23,
    modelName: 'La Crosse Technology C85845',
    modelPhotoPath: null,
    serialNumber: 'BR-2345'
  },
  {
    typeID: 3,
    typeName: 'Barometer',
    modelID: 24,
    modelName: 'AcuRite 01022M',
    modelPhotoPath: null,
    serialNumber: 'BR-7890'
  },
  {
    typeID: 3,
    typeName: 'Barometer',
    modelID: 25,
    modelName: 'Oregon Scientific BAR208HGX',
    modelPhotoPath: null,
    serialNumber: 'BR-4321'
  },
];

// In Use Multimeter Reponse - Simulate the API Response Body that populates the equipment that is in use upon clicking on an inventory summary card in Dashboard.
const InUseMultimeter = [
  {
    typeID: 5,
    typeName: 'Multimeter',
    modelID: 31,
    modelName: 'Fluke 87V',
    modelPhotoPath: null,
    serialNumber: 'MM-1234'
  },
  {
    typeID: 5,
    typeName: 'Multimeter',
    modelID: 32,
    modelName: 'Agilent U1272A',
    modelPhotoPath: null,
    serialNumber: 'MM-5678'
  },
  {
    typeID: 5,
    typeName: 'Multimeter',
    modelID: 33,
    modelName: 'Klein Tools MM700',
    modelPhotoPath: null,
    serialNumber: 'MM-9012'
  },
  {
    typeID: 5,
    typeName: 'Multimeter',
    modelID: 34,
    modelName: 'UNI-T UT61E',
    modelPhotoPath: null,
    serialNumber: 'MM-3456'
  },
  {
    typeID: 5,
    typeName: 'Multimeter',
    modelID: 35,
    modelName: 'Extech EX330',
    modelPhotoPath: null,
    serialNumber: 'MM-7890'
  },
];

// In Use Hydrometer Reponse - Simulate the API Response Body that populates the equipment that is in use upon clicking on an inventory summary card in Dashboard.
const InUseHydrometer = [
  {
    typeID: 6,
    typeName: 'Hydrometer',
    modelID: 41,
    modelName: 'Fisher Scientific 15-078-16',
    modelPhotoPath: null,
    serialNumber: 'HY-9876'
  },
  {
    typeID: 6,
    typeName: 'Hydrometer',
    modelID: 42,
    modelName: 'H-B Instrument Durac',
    modelPhotoPath: null,
    serialNumber: 'HY-5432'
  },
  {
    typeID: 6,
    typeName: 'Hydrometer',
    modelID: 43,
    modelName: 'Bel-Art H-B DURAC',
    modelPhotoPath: null,
    serialNumber: 'HY-2109'
  },
];

// In Use Oscilloscope Reponse - Simulate the API Response Body that populates the equipment that is in use upon clicking on an inventory summary card in Dashboard.
const InUseOscilloscope = [
  {
    typeID: 7,
    typeName: 'Oscilloscope',
    modelID: 51,
    modelName: 'Tektronix TBS1052B',
    modelPhotoPath: null,
    serialNumber: 'OSC-1234'
  },
];

// In Use Spectrophotometer Reponse - Simulate the API Response Body that populates the equipment that is in use upon clicking on an inventory summary card in Dashboard.
const InUseSpectrophotometer = [
  {
    typeID: 8,
    typeName: 'Spectrophotometer',
    modelID: 61,
    modelName: 'Thermo Scientific GENESYS 10S',
    modelPhotoPath: null,
    serialNumber: 'SPC-1234'
  },
  {
    typeID: 8,
    typeName: 'Spectrophotometer',
    modelID: 62,
    modelName: 'Shimadzu UV-1800',
    modelPhotoPath: null,
    serialNumber: 'SPC-5678'
  },
];

// In Use Manometer Reponse - Simulate the API Response Body that populates the equipment that is in use upon clicking on an inventory summary card in Dashboard.
const InUseManometer = [
  {
    typeID: 9,
    typeName: 'Manometer',
    modelID: 71,
    modelName: 'Dwyer Instruments 475-3-FM',
    modelPhotoPath: null,
    serialNumber: 'MAN-1234'
  },
];

// In Use Luxmeter Reponse - Simulate the API Response Body that populates the equipment that is in use upon clicking on an inventory summary card in Dashboard.
const InUseLuxmeter = [
  {
    typeID: 10,
    typeName: 'Luxmeter',
    modelID: 83,
    modelName: 'HOLDPEAK 866B',
    modelPhotoPath: null,
    serialNumber: 'LUX-9012'
  },
];

// Under repair Ammeter Reponse - Simulate the API Response Body that populates the equipment that is under repair upon clicking on an inventory summary card in Dashboard.
const UnderRepairAmmeter = [
  {
    typeID: 4,
    typeName: 'Ammeter',
    modelID: 9,
    modelName: 'Tektronix DMM4050',
    modelPhotoPath: null,
    serialNumber: 'AM-9753'
  },
  {
    typeID: 4,
    typeName: 'Ammeter',
    modelID: 10,
    modelName: 'Rigol DM3068',
    modelPhotoPath: null,
    serialNumber: 'AM-6421'
  },
  {
    typeID: 4,
    typeName: 'Ammeter',
    modelID: 11,
    modelName: 'Keysight 34461A',
    modelPhotoPath: null,
    serialNumber: 'AM-3141'
  }
];

// Under repair Voltmeter Reponse - Simulate the API Response Body that populates the equipment that is under repair upon clicking on an inventory summary card in Dashboard.
const UnderRepairVoltmeter = [
  {
    typeID: 1,
    typeName: 'Voltmeter',
    modelID: 101,
    modelName: 'Fluke 87V',
    modelPhotoPath: null,
    serialNumber: 'VR-1234'
  },
  {
    typeID: 1,
    typeName: 'Voltmeter',
    modelID: 102,
    modelName: 'Agilent U1272A',
    modelPhotoPath: null,
    serialNumber: 'VR-5678'
  },
  {
    typeID: 1,
    typeName: 'Voltmeter',
    modelID: 103,
    modelName: 'Tektronix DMM7510',
    modelPhotoPath: null,
    serialNumber: 'VR-9012'
  },
];

// Under repair Thermometer Reponse - Simulate the API Response Body that populates the equipment that is under repair upon clicking on an inventory summary card in Dashboard.
const UnderRepairThermometer = [
  {
    typeID: 2,
    typeName: 'Thermometer',
    modelID: 111,
    modelName: 'Fluke 51 II',
    modelPhotoPath: null,
    serialNumber: 'TR-1234'
  },
  {
    typeID: 2,
    typeName: 'Thermometer',
    modelID: 112,
    modelName: 'Testo 922',
    modelPhotoPath: null,
    serialNumber: 'TR-5678'
  },
  {
    typeID: 2,
    typeName: 'Thermometer',
    modelID: 113,
    modelName: 'UEi Test Instruments PDT650',
    modelPhotoPath: null,
    serialNumber: 'TR-9012'
  },
];

// Under repair Barometer Reponse - Simulate the API Response Body that populates the equipment that is under repair upon clicking on an inventory summary card in Dashboard.
const UnderRepairBarometer = [
  {
    typeID: 3,
    typeName: 'Barometer',
    modelID: 121,
    modelName: 'Fischer Barometer',
    modelPhotoPath: null,
    serialNumber: 'BR-1234'
  },
  {
    typeID: 3,
    typeName: 'Barometer',
    modelID: 122,
    modelName: 'AcuRite 00795A2',
    modelPhotoPath: null,
    serialNumber: 'BR-5678'
  },
  {
    typeID: 3,
    typeName: 'Barometer',
    modelID: 123,
    modelName: 'Taylor Precision Products 6700',
    modelPhotoPath: null,
    serialNumber: 'BR-9012'
  },
];

// Under repair Multimeter Reponse - Simulate the API Response Body that populates the equipment that is under repair upon clicking on an inventory summary card in Dashboard.
const UnderRepairMultimeter = [
  {
    typeID: 5,
    typeName: 'Multimeter',
    modelID: 131,
    modelName: 'Fluke 117',
    modelPhotoPath: null,
    serialNumber: 'MR-1234'
  },
  {
    typeID: 5,
    typeName: 'Multimeter',
    modelID: 132,
    modelName: 'Klein Tools MM700',
    modelPhotoPath: null,
    serialNumber: 'MR-5678'
  },
  {
    typeID: 5,
    typeName: 'Multimeter',
    modelID: 133,
    modelName: 'Amprobe AM-570',
    modelPhotoPath: null,
    serialNumber: 'MR-9012'
  },
];

// Under repair Hydrometer Reponse - Simulate the API Response Body that populates the equipment that is under repair upon clicking on an inventory summary card in Dashboard.
const UnderRepairHydrometer = [
  {
    typeID: 6,
    typeName: 'Hydrometer',
    modelID: 142,
    modelName: 'Fisher Scientific S23272',
    modelPhotoPath: null,
    serialNumber: 'HR-5678'
  },
  {
    typeID: 6,
    typeName: 'Hydrometer',
    modelID: 143,
    modelName: 'Bel-Art B60700-0000',
    modelPhotoPath: null,
    serialNumber: 'HR-9012'
  },
];

// Under repair Oscilloscope Reponse - Simulate the API Response Body that populates the equipment that is under repair upon clicking on an inventory summary card in Dashboard.
const UnderRepairOscilloscope = [
  {
    typeID: 7,
    typeName: 'Oscilloscope',
    modelID: 52,
    modelName: 'Rigol DS1054Z',
    modelPhotoPath: null,
    serialNumber: 'OSC-5678'
  },
  {
    typeID: 7,
    typeName: 'Oscilloscope',
    modelID: 53,
    modelName: 'Keysight DSOX1102G',
    modelPhotoPath: null,
    serialNumber: 'OSC-9012'
  },
  {
    typeID: 7,
    typeName: 'Oscilloscope',
    modelID: 54,
    modelName: 'Siglent SDS1104X-E',
    modelPhotoPath: null,
    serialNumber: 'OSC-3456'
  },
  {
    typeID: 7,
    typeName: 'Oscilloscope',
    modelID: 55,
    modelName: 'Hantek DSO5072P',
    modelPhotoPath: null,
    serialNumber: 'OSC-7890'
  },
];

// Under repair Spectrophotometer Reponse - Simulate the API Response Body that populates the equipment that is under repair upon clicking on an inventory summary card in Dashboard.
const UnderRepairSpectrophotometer = [
  {
    typeID: 8,
    typeName: 'Spectrophotometer',
    modelID: 63,
    modelName: 'PerkinElmer Lambda 365',
    modelPhotoPath: null,
    serialNumber: 'SPC-9012'
  },
];

// Under repair Manometer Reponse - Simulate the API Response Body that populates the equipment that is under repair upon clicking on an inventory summary card in Dashboard.
const UnderRepairManometer = [
  {
    typeID: 9,
    typeName: 'Manometer',
    modelID: 72,
    modelName: 'Testo 510',
    modelPhotoPath: null,
    serialNumber: 'MAN-5678'
  },
  {
    typeID: 9,
    typeName: 'Manometer',
    modelID: 73,
    modelName: 'UEi Test Instruments EM201B',
    modelPhotoPath: null,
    serialNumber: 'MAN-9012'
  },
];

// Under repair Lux meter Reponse - Simulate the API Response Body that populates the equipment that is under repair upon clicking on an inventory summary card in Dashboard.
const UnderRepairLuxmeter = [
  {
    typeID: 10,
    typeName: 'Luxmeter',
    modelID: 81,
    modelName: 'Extech LT300',
    modelPhotoPath: null,
    serialNumber: 'LUX-1234'
  },
  {
    typeID: 10,
    typeName: 'Luxmeter',
    modelID: 82,
    modelName: 'Dr.Meter LX1330B',
    modelPhotoPath: null,
    serialNumber: 'LUX-5678'
  },
];

//ReservationDetailsAPI Simulation Response body to populate the details of the reservation upon clicking on the reservation card.
const ReservationDetailsEmilyWilsonResponse = [
  {
    reservedEquipmentID: 2,
    typeID: 1,
    typeName: 'Voltmeter',
    modelID: 13,
    modelName: 'TechVolt 2000',
    modelPhotoPath: null,
    reservedQuantity: 7,
  },
  {
    reservedEquipmentID: 3,
    typeID: 2,
    typeName: 'Thermometer',
    modelID: 14,
    modelName: 'ThermoPro TP50',
    modelPhotoPath: null,
    reservedQuantity: 5,
  },
];

//ReservationDetailsAPI Simulation Response body to populate the details of the reservation upon clicking on the reservation card.
const ReservationDetailsAmandaLeeResponse = [
  {
    reservedEquipmentID: 1,
    typeID: 1,
    typeName: 'Voltmeter',
    modelID: 13,
    modelName: 'TechVolt 2000',
    modelPhotoPath: null,
    reservedQuantity: 3, 
  },
  {
    reservedEquipmentID: 5,
    typeID: 2,
    typeName: 'Thermometer',
    modelID: 14,
    modelName: 'ThermoPro TP50',
    modelPhotoPath: null,
    reservedQuantity: 3, 
  },
];

//ReservationDetailsAPI Simulation Response body to populate the details of the reservation upon clicking on the reservation card.
const ReservationDetailsRobertWhiteResponse = [
  {
    reservedEquipmentID: 8,
    typeID: 4,
    typeName: 'Ammeter',
    modelID: 6,
    modelName: 'Agilent 34410A',
    modelPhotoPath: null,
    reservedQuantity: 1,
  },
  {
    reservedEquipmentID: 9,
    typeID: 10,
    typeName: 'Luxmeter',
    modelID: 83,
    modelName: 'HOLDPEAK 866B',
    modelPhotoPath: null,
    reservedQuantity: 1,
  },
];

//ReservationDetailsAPI Simulation Response body to populate the details of the reservation upon clicking on the reservation card.
const ReservationDetailsSophiaJohnsonResponse = [
  {
    reservedEquipmentID: 12,
    typeID: 1,
    typeName: 'Voltmeter',
    modelID: 13,
    modelName: 'TechVolt 2000',
    modelPhotoPath: null,
    reservedQuantity: 6, 
  },
  {
    reservedEquipmentID: 15,
    typeID: 2,
    typeName: 'Thermometer',
    modelID: 14,
    modelName: 'ThermoPro TP50',
    modelPhotoPath: null,
    reservedQuantity: 1, 
  },
];
//#endregion

//#region Inventory API Placeholder Response 
const EquipmentInventoryResponse = [
  {
    equipmentSerialId: 'A817S12',
    typeId: 122248,
    typeName: 'Ammeter',
    maintenanceStatus: 'Ready',
    modelId: 122,
    modelName: 'AMT-222',
    modelPhoto: 'https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/71wHk9xqToL._AC_UF1000,1000_QL80_.jpg',
  },
  {
    equipmentSerialId: 'A217S2',
    typeId: 122241,
    typeName: 'Ammeter',
    maintenanceStatus: 'Ready',
    modelId: 124,
    modelName: 'AMT-222',
    modelPhoto: 'https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/71wHk9xqToL._AC_UF1000,1000_QL80_.jpg',
  },
];
//#endregion

export { 
  EquipmentInventoryResponse,

  InventorySummaryResponse, 
  AllReservationsResponse, 

  InUseVoltmeter,
  InUseThermometer,
  InUseBarometer,
  InUseAmmeter, 
  InUseMultimeter,
  InUseHydrometer,
  InUseOscilloscope,
  InUseSpectrophotometer,
  InUseManometer,
  InUseLuxmeter,

  UnderRepairVoltmeter,
  UnderRepairThermometer,
  UnderRepairBarometer,
  UnderRepairAmmeter,
  UnderRepairMultimeter,
  UnderRepairHydrometer,
  UnderRepairOscilloscope,
  UnderRepairSpectrophotometer,
  UnderRepairManometer,
  UnderRepairLuxmeter,

  ReservationDetailsEmilyWilsonResponse,
  ReservationDetailsAmandaLeeResponse,
  ReservationDetailsRobertWhiteResponse,
  ReservationDetailsSophiaJohnsonResponse,
};
