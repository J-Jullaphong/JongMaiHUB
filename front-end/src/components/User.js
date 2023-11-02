class User {
  static instance;

  constructor() {
    this.uid = null;
    this.name = null;
    this.profilePicture = null;
    this.isProvider = false;
    this.isStaff = false;
    this.listeners = [];
  }

  static getInstance() {
    if (!User.instance) {
      User.instance = new User();
    }
    return User.instance;
  }

  getUID() {
    return this.uid;
  }

  getName() {
    return this.name;
  }

  getProfilePicture() {
    return this.profilePicture;
  }

  getIsProvider() {
    return this.isProvider;
  }

  getIsStaff() {
    return this.isStaff;
  }

  setUID(uid) {
    this.uid = uid;
    this.notifyListeners();
  }

  setName(name) {
    this.name = name;
    this.notifyListeners();
  }

  setProfilePicture(profilePic) {
    this.profilePicture = profilePic;
    this.notifyListeners();
  }

  setIsProvider(isProvider) {
    this.isProvider = isProvider;
    this.notifyListeners();
  }

  setIsStaff(isStaff) {
    this.isStaff = isStaff;
    this.notifyListeners();
  }

  signOut() {
    this.setUID(null);
    this.setName(null);
    this.setProfilePicture(null);
    this.setIsProvider(false);
    this.setIsStaff(false);
  }

  addListener(callback) {
    this.listeners.push(callback);
  }

  removeListener(callback) {
    this.listeners = this.listeners.filter((listener) => listener !== callback);
  }

  notifyListeners() {
    this.listeners.forEach((listener) => listener());
  }
}

export default User;
