import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="greeting"
export default class extends Controller {
  static targets = ["name","roll","dipartment","session"];

  greet() {
    const name = this.nameTarget.value;
    const roll = this.rollTarget.value;
    const dipartment = this.dipartmentTarget.value;
    const session = this.sessionTarget.value;
    alert(`Name: ${name}\nRoll: ${roll}\nDepartment: ${dipartment}\nSession: ${session}`);

  }
}
