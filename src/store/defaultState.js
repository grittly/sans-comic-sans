const state = {
  srcImage: {
    status: null,
    src: null,
    width: 0,
    height: 0,
    aspectRatio: 1,
    scale: 1,
  },
  selections: {
    collection: [],
    activeSelectionId: null,
    hasErrors: false,
    validated: false,
  },
  settings: {
    decrypt: false,
  },
};

export default state;
