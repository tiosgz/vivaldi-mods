// This mod changes the spacing of tree-view items
// It is very likely to break the visible result, so you may need to use
// additional CSS to change the size of the items' children
//
// Please keep in mind that you need to run VivaldiHooks by justdanpo in order
// to get this working

// Waiting for the UI may not be needed, but it’s better if we do
vivaldi.jdhooks.onUIReady(() => vivaldi.jdhooks.require('common_VivaldiTreeList').defaultProps.rowHeight = 16);
