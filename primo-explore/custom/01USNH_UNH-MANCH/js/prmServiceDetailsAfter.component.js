// - configure lod author card - //
app.component('prmServiceDetailsAfter', {
  bindings: {
    parentCtrl: "<"
  },
  template: '<lod-author-card-component parent-ctrl="$ctrl.parentCtrl"></lod-author-card-component>'
});