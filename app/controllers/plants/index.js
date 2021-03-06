import Ember from 'ember';

export default Ember.Controller.extend({

  editGardenPlantName: false,
  currentGardenPlant: null,
  myStickyOptions: {
    wrapperClassName: 'col-xs-3',
    topSpacing: 0 //px, default: 0
  },
  dragFinishText: false,
  dragStartedText: false,
  dragEndedText: false,
  myObject:{id:1, name:'objectName'},
  applicationController: Ember.inject.controller('application'),

  currentUser: Ember.computed.reads('applicationController.currentUser'),
  reviewFormVisible: false,
  editFormVisible: false,
  buttonsVisible: Ember.computed('editFormVisible', 'reviewFormVisible', function(){
    return !(this.get('editFormVisible') || this.get('reviewFormVisible'));
  }),
  reviewContent: null,
  ratings: ["1","2","3",'4','5','6','7','8','9','10'],
  selectedRating: null,
  // isValid: Ember.computed('plant.name', 'plant.imageUrl', function() {
  //   return !Ember.isEmpty(this.get('plant.name')) && !Ember.isEmpty(this.get('plant.imageUrl'));
  //   }
  // ),


// Purple Thing
  actions: {
    clearForms: function() {
      this.set('reviewFormVisible', false);
      this.set('editFormVisible', false);
    },
    toggleGardenPlantNameEdit: function(gardentPlant){
      this.set('currentGardenPlant', gardentPlant);
      this.set('editGardenPlantName', !this.get('editGardenPlantName'));
    },
    editSubmit: function(){
      this.get('currentGardenPlant').save();
      this.set('currentGardenPlant', null);
      this.set('editGardenPlantName', false);
    },
    deleteUserPlant: function(userPlant){
      userPlant.destroyRecord();
    },
    addWishlistToGarden: function(userPlant){
      userPlant.set("ownership", "garden");
    },
    dragResultGarden: function(plant) {
      let user = this.controllerFor('application').get('currentUser');
      let userPlant = this.store.createRecord('user-plant', {
        ownership: 'garden',
        user: user,
        plant: plant,
        name: user.get('name') + " " + plant.get('name')
      });
      userPlant.save();
      console.log(userPlant.get('name'));
    },
    dragResultWishlist: function(plant) {
      let user = this.controllerFor('application').get('currentUser');
      let userPlant = this.store.createRecord('user-plant', {
        ownership: 'wishlist',
        user: user,
        plant: plant,
        name: user.get('name') + " " + plant.get('name')
      });
      userPlant.save();
      console.log(userPlant.get('name'));
    },
    dragStart: function() {
      // this.set('dragEndedText', false);
      // this.set('dragStartedText','Drag Has Started');
    },
    dragEnd: function() {
      // this.set('dragStartedText', false);
      // this.set('dragEndedText','Drag Has Ended');
    },
    draggingOverGardenTarget: function() {
      Ember.$('#target-garden').css('border','solid #c59ab9 3px');
    },
    draggingOverWishlistTarget: function() {
      Ember.$('#target-wishlist').css('border','solid #c59ab9 3px');
    },
    gardenDragTarget: function() {
      Ember.$('#target-garden').css('border','solid #fff 3px');
    },
    wishlistDragTarget: function() {
      Ember.$('#target-wishlist').css('border','solid #fff 3px');
    },
    showReview: function(plant){
      this.set('reviewFormVisible', true);
    },
    showEdit: function(plant){
      this.set('editFormVisible', true);
    },
    cancel(){
      this.set('reviewFormVisible', false);
      this.set('reviewContent', null);
      this.set('selectedRating', null);
    },
    showReview(){
      this.set('reviewFormVisible', true);
    },
    submitReview(plant){
      // let plant = "this.controllerFor('plants').get('plant')";
      let review = this.store.createRecord('review');
      let user = this.controllerFor('application').get('currentUser');
      review.set('content', this.reviewContent);
      review.set('rating', parseInt(this.selectedRating));
      plant.get('reviews').addObject(review);
      user.get('reviews').addObject(review);
      review.save();
      this.set('reviewFormVisible', false);
      this.set('reviewContent', null);
      this.set('selectedRating', null);

      // this.transitionToRoute('plants.plant', plant);
    },
    save(plant) {
      plant.save();
      this.set('editFormVisible', false);
    },
    cancelEdit() {
      this.set('editFormVisible', false);
    }


  }

});
