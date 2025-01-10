### Stimulus Hotwire Tutorial (Basic to Advanced)

Hotwire (HTML Over The Wire) is a modern framework for building fast, interactive web applications without relying heavily on JavaScript. It includes three main components: Turbo, Stimulus, and Strada. In this tutorial, we will focus on **Stimulus** with Rails, progressing from the basics to advanced usage.

---

## **1. What is Stimulus?**
Stimulus is a JavaScript framework designed to enhance HTML by adding interactivity and responsiveness. It pairs seamlessly with Rails and is particularly effective in combination with Hotwire.

---

## **2. Setting up Stimulus in a Rails Application**

### **Step 1: Create a Rails App**
```bash
rails new hotwire_app --css=tailwind
cd hotwire_app
```

### **Step 2: Install Hotwire**
Run the Rails generator to install Hotwire, which includes Stimulus:
```bash
rails hotwire:install
```
This will:
- Add Turbo and Stimulus to your app.
- Create a `controllers` directory under `app/javascript`.

### **Step 3: Verify Setup**
Ensure that the `app/javascript/controllers` folder exists with an `index.js` file, which registers Stimulus controllers.

---

## **3. Basic Stimulus Example**

### **Step 1: Create a Controller**
Generate a Stimulus controller:
```bash
rails generate stimulus greeting
```

This creates:
- `app/javascript/controllers/greeting_controller.js`

Edit the controller:
```javascript
// greeting_controller.js
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["name"];

  greet() {
    const name = this.nameTarget.value;
    alert(`Hello, ${name}!`);
  }
}
```

### **Step 2: Update the View**
Add HTML for the controller in a Rails view:
```erb
<!-- app/views/pages/index.html.erb -->
<div data-controller="greeting">
  <input data-greeting-target="name" type="text" placeholder="Enter your name" />
  <button data-action="click->greeting#greet">Greet</button>
</div>
```

### **Step 3: Start the Rails Server**
Run the server:
```bash
bin/dev
```
Visit `http://localhost:3000` and test the greeting feature.

---

## **4. Intermediate Stimulus Features**

### **1. Passing Values**
Stimulus supports passing values via `data-*` attributes.

#### Controller:
```javascript
// counter_controller.js
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static values = { count: Number };

  increment() {
    this.countValue++;
    this.element.querySelector("span").textContent = this.countValue;
  }
}
```

#### View:
```erb
<div data-controller="counter" data-counter-count-value="0">
  <span>0</span>
  <button data-action="click->counter#increment">Increment</button>
</div>
```

### **2. Classes API**
Stimulus can toggle CSS classes dynamically.

#### Controller:
```javascript
// toggle_controller.js
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static classes = ["hidden"];

  toggle() {
    this.element.classList.toggle(this.hiddenClass);
  }
}
```

#### View:
```erb
<div data-controller="toggle" data-toggle-hidden-class="hidden">
  <p>This is toggled content.</p>
  <button data-action="click->toggle#toggle">Toggle Visibility</button>
</div>
```

Add CSS for `.hidden`:
```css
.hidden {
  display: none;
}
```

---

## **5. Advanced Stimulus Concepts**

### **1. Custom Events**
Stimulus can listen to custom events in your application.

#### Controller:
```javascript
// event_listener_controller.js
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    window.addEventListener("custom:event", this.handleEvent.bind(this));
  }

  disconnect() {
    window.removeEventListener("custom:event", this.handleEvent.bind(this));
  }

  handleEvent(event) {
    alert(`Custom Event Triggered: ${event.detail}`);
  }
}
```

#### Triggering a Custom Event:
```javascript
const event = new CustomEvent("custom:event", { detail: "Hello, Stimulus!" });
window.dispatchEvent(event);
```

### **2. Nested Controllers**
You can nest Stimulus controllers to manage complex components.

#### Parent Controller:
```javascript
// parent_controller.js
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    console.log("Parent connected");
  }
}
```

#### Child Controller:
```javascript
// child_controller.js
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    console.log("Child connected");
  }
}
```

#### View:
```erb
<div data-controller="parent">
  <div data-controller="child">
    Nested Controller Example
  </div>
</div>
```

---

## **6. Integrating Stimulus with Turbo**

Stimulus works seamlessly with Turbo for creating dynamic updates.

### Example: Updating Content Dynamically
#### Controller:
```javascript
// update_controller.js
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  update() {
    fetch("/pages/data")
      .then(response => response.text())
      .then(html => {
        this.element.innerHTML = html;
      });
  }
}
```

#### View:
```erb
<div data-controller="update">
  <button data-action="click->update#update">Load Data</button>
  <div id="data-container">
    <!-- Dynamic content will load here -->
  </div>
</div>
```

#### Rails Route:
```ruby
get "pages/data", to: "pages#data"
```

#### Rails Controller Action:
```ruby
class PagesController < ApplicationController
  def data
    render plain: "Dynamic Content Loaded!"
  end
end
```

---

## **7. Tips for Scaling Stimulus Applications**

1. **Organize Controllers**: Keep related controllers in subdirectories, e.g., `app/javascript/controllers/admin/`.
2. **Use StimulusReflex**: Combine Stimulus with StimulusReflex for real-time features.
3. **Leverage Value Types**: Stimulus supports boolean, array, and object values for dynamic functionality.

---

This tutorial covers everything from a basic setup to advanced Stimulus usage. By integrating Stimulus into your Rails app, you can build fast, interactive, and maintainable features without the complexity of a heavy JavaScript framework.
