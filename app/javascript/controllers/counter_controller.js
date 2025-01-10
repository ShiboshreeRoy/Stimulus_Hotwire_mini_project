import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="counter"
export default class extends Controller {
  static values = { count: Number};

  increment(){
    this.countValue++;
    this.element.querySelector('span').textContent = this.countValue;
  }
}
