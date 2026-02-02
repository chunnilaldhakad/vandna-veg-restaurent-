import Text "mo:core/Text";
import List "mo:core/List";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Float "mo:core/Float";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Principal "mo:core/Principal";

actor {
  // Dish Type & Menu Module
  type Dish = {
    name : Text;
    description : Text;
    price : Float;
    image : Text;
    category : Text;
  };

  module Dish {
    public func compareByPrice(dish1 : Dish, dish2 : Dish) : Order.Order {
      Float.compare(dish1.price, dish2.price);
    };
  };

  let menuList = List.empty<Dish>();

  public shared ({ caller }) func addDish(name : Text, description : Text, price : Float, image : Text, category : Text) : async () {
    menuList.add({
      name;
      description;
      price;
      image;
      category;
    });
  };

  public query ({ caller }) func getMenuByCategory(category : Text) : async [Dish] {
    let filteredList = menuList.filter(func(dish) { dish.category == category });
    filteredList.toArray();
  };

  // Review and Reply Types
  type Review = {
    id : Nat;
    name : Text;
    rating : Nat;
    comment : Text;
    timestamp : Int;
    parentId : ?Nat;
    replies : List.List<Nat>;
  };

  type ReviewView = {
    id : Nat;
    name : Text;
    rating : Nat;
    comment : Text;
    timestamp : Int;
    parentId : ?Nat;
    replies : [Nat];
  };

  type ReviewResponse = {
    id : Nat;
    name : Text;
    rating : Nat;
    comment : Text;
    timestamp : Int;
    replies : [ReviewResponse];
  };

  module Review {
    public func compareByRating(review1 : Review, review2 : Review) : Order.Order {
      Float.compare(review1.rating.toFloat(), review2.rating.toFloat());
    };
  };

  let reviewsMap = Map.empty<Nat, Review>();
  var nextReviewId = 1;

  public shared ({ caller }) func addReview(name : Text, rating : Nat, comment : Text, parentId : ?Nat) : async () {
    if (rating < 1 or rating > 5) { Runtime.trap("Rating must be between 1 and 5") };
    let review : Review = {
      id = nextReviewId;
      name;
      rating;
      comment;
      timestamp = Time.now();
      parentId;
      replies = List.empty<Nat>();
    };
    reviewsMap.add(nextReviewId, review);

    switch (parentId) {
      case (null) {};
      case (?id) {
        switch (reviewsMap.get(id)) {
          case (null) { Runtime.trap("Parent review not found") };
          case (?parentReview) {
            if (id == nextReviewId) {
              Runtime.trap("Cannot reply to itself");
            };
            let updatedParent = {
              parentReview with
              replies = parentReview.replies;
            };
            reviewsMap.add(id, updatedParent);
          };
        };
      };
    };

    nextReviewId += 1;
  };

  public shared ({ caller }) func addReply(parentId : Nat, name : Text, rating : Nat, comment : Text) : async () {
    if (rating < 1 or rating > 5) { Runtime.trap("Rating must be between 1 and 5") };

    // Check if the parent review exists
    let parentReview = switch (reviewsMap.get(parentId)) {
      case (null) { Runtime.trap("Parent review not found") };
      case (?review) { review };
    };

    // Ensure that the reply is not to itself (should never happen due to separate ID generation)
    let id = nextReviewId;
    if (id == parentId) {
      Runtime.trap("Cannot reply to itself");
    };

    let reply : Review = {
      id;
      name;
      rating;
      comment;
      timestamp = Time.now();
      parentId = ?parentId;
      replies = List.empty<Nat>();
    };
    reviewsMap.add(id, reply);

    // Update the parent review with new reply ID
    let updatedParent = {
      parentReview with
      replies = parentReview.replies;
    };
    reviewsMap.add(parentId, updatedParent);

    nextReviewId += 1;
  };

  // Helper function to empty list (simulating clear)
  func clearReplies(list : List.List<Nat>) {
    while (not list.isEmpty()) {
      ignore list.removeLast();
    };
  };

  // Helper function to recursively build ReviewResponse
  func buildReviewResponse(review : Review) : ReviewResponse {
    let replyResponses = review.replies.toArray().map(
      func(replyId) {
        switch (reviewsMap.get(replyId)) {
          case (null) { Runtime.trap("Reply not found") };
          case (?reply) { buildReviewResponse(reply) };
        };
      }
    );
    {
      id = review.id;
      name = review.name;
      rating = review.rating;
      comment = review.comment;
      timestamp = review.timestamp;
      replies = replyResponses;
    };
  };

  func buildReviewViewImmutable(review : Review) : ReviewView {
    {
      id = review.id;
      name = review.name;
      rating = review.rating;
      comment = review.comment;
      timestamp = review.timestamp;
      parentId = review.parentId;
      replies = review.replies.toArray();
    };
  };

  public query ({ caller }) func getTopLevelReviews() : async [ReviewResponse] {
    let topLevelReviews = reviewsMap.filter(
      func(_id, review) {
        switch (review.parentId) {
          case (null) { true };
          case (_) { false };
        };
      }
    );

    topLevelReviews.values().map(func(review) { buildReviewResponse(review) }).toArray();
  };

  public query ({ caller }) func getAllReviewsByRating() : async [ReviewView] {
    reviewsMap.values().map(buildReviewViewImmutable).toArray();
  };

  public query ({ caller }) func getReview(id : Nat) : async ReviewView {
    switch (reviewsMap.get(id)) {
      case (null) { Runtime.trap("Review not found") };
      case (?review) { buildReviewViewImmutable(review) };
    };
  };

  // Testimonial Type & Functions
  type Testimonial = {
    name : Text;
    message : Text;
    rating : Nat;
    date : Int;
  };

  let testimonials = List.empty<Testimonial>();

  public shared ({ caller }) func addTestimonial(name : Text, message : Text, rating : Nat) : async () {
    let testimonial : Testimonial = {
      name;
      message;
      rating;
      date = Time.now();
    };
    testimonials.add(testimonial);
  };

  public query ({ caller }) func getTestimonials() : async [Testimonial] {
    testimonials.toArray();
  };

  // FoodGallery Type & Functions
  type FoodGallery = {
    image : Text;
    title : Text;
    description : Text;
  };

  let foodGalleries = List.empty<FoodGallery>();

  public shared ({ caller }) func addFoodGallery(image : Text, title : Text, description : Text) : async () {
    let foodGallery : FoodGallery = {
      image;
      title;
      description;
    };
    foodGalleries.add(foodGallery);
  };

  public query ({ caller }) func getFoodGalleries() : async [FoodGallery] {
    foodGalleries.toArray();
  };

  // Reservation Type & Functions
  type Reservation = {
    name : Text;
    email : Text;
    date : Int;
    tableSize : Nat;
    notes : Text;
  };

  let reservations = List.empty<Reservation>();

  public shared ({ caller }) func addReservation(name : Text, email : Text, date : Int, tableSize : Nat, notes : Text) : async () {
    let reservation : Reservation = {
      name;
      email;
      date;
      tableSize;
      notes;
    };
    reservations.add(reservation);
  };

  public query ({ caller }) func getReservations() : async [Reservation] {
    reservations.toArray();
  };

  // SocialLink Type & Functions
  type SocialLink = {
    platform : Text;
    url : Text;
  };

  let socialLinks = List.empty<SocialLink>();

  public shared ({ caller }) func addSocialLink(platform : Text, url : Text) : async () {
    let socialLink : SocialLink = {
      platform;
      url;
    };
    socialLinks.add(socialLink);
  };

  public query ({ caller }) func getSocialLinks() : async [SocialLink] {
    socialLinks.toArray();
  };

  // Contact Type & Functions
  type Contact = {
    name : Text;
    email : Text;
    message : Text;
  };

  let contacts = List.empty<Contact>();

  public shared ({ caller }) func addContact(name : Text, email : Text, message : Text) : async () {
    let contact : Contact = {
      name;
      email;
      message;
    };
    contacts.add(contact);
  };

  public query ({ caller }) func getContacts() : async [Contact] {
    contacts.toArray();
  };

  // RestaurantInfo Type & Functions
  type RestaurantInfo = {
    name : Text;
    address : Text;
    phone : Text;
    email : Text;
    hours : Text;
  };

  public query ({ caller }) func getRestaurantInfo() : async RestaurantInfo {
    {
      name = "Vandana Veg. Restaurant";
      address = "Pratap Nagar, Jaipur";
      phone = "+91-1234567890";
      email = "contact@vandanasveg.com";
      hours = "Mon-Sun: 10am - 10pm";
    };
  };
};
