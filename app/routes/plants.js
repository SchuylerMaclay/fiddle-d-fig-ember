import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return this.get("store").findRecord('user','me');
  },
  actions: {
    dragResult: function(plant) {
      debugger;
      let user = this.controllerFor('application').get('currentUser');
      let userPlant = this.store.createRecord('user-plant', {
        ownership: 'garden',
        user: user,
        plant: plant,
        name: user.get('name') + " " + plant.get('name')
      });
      userPlant.save();
      console.log(userPlant.get('name'));
      // this.set('dragFinishText', ops.target.resultText);
      // console.log('Content of draggable-object :',obj);
    },
    dragStart: function() {
      this.set('dragEndedText', false);
      this.set('dragStartedText','Drag Has Started');
    },
    dragEnd: function() {

      this.set('dragStartedText', false);
      this.set('dragEndedText','Drag Has Ended');
    },
    draggingOverTarget: function() {
      $('#drag-alert').html(`<div class="alert alert-dismissible alert-danger">
      <button type="button" class="close" data-dismiss="alert">x</button>
      <strong>Drop the plant to add it to your garden</strong></div>`);
    },
    leftDragTarget: function() {
      $('#drag-alert').empty();
    }
  }
});
