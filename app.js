// Capture Elemts
const form = document.getElementById("formInputs");
const cardStudent = document.getElementById("cardStudents");
const cardTeacher = document.getElementById("cardTeachers");
const templateStudent = document.getElementById("templateStudents").content;
const templateTeacher = document.getElementById("templateTeachers").content;

const studentsArray = [];
const teacherArray = [];

// CONSTRUCTION FUNCTION (class Person)
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  static printPersonUI(person, type) {
    if (type === "Student") {
      cardStudent.textContent = "";
      const fragment = new DocumentFragment();

      person.forEach((item) => {
        fragment.append(item.addNewStudent());
      });

      cardStudent.append(fragment);
    }

    if (type === "Teacher") {
      cardTeacher.textContent = "";
      const fragment = new DocumentFragment();

      person.forEach((item) => {
        fragment.append(item.addNewTeacher());
      });

      cardTeacher.append(fragment);
    }
  }
}

// CONSTRUCTION FUNCTION (class Students)
class Students extends Person {
  #state = false;
  #student = "Student";

  set setState(state) {
    this.#state = state;
  }

  get getStudent() {
    return this.#student;
  }

  addNewStudent() {
    const clone = templateStudent.cloneNode(true);

    clone.querySelector("h5 .text-primary").textContent = this.name;
    clone.querySelector("h6").textContent = this.getStudent;
    clone.querySelector(".lead").textContent = this.age;

    if (this.#state) {
      clone.querySelector(".badge").className = "badge bg-success";
      clone.querySelector(".btn-success").disabled = true;
      clone.querySelector(".btn-danger").disabled = false;
    } else {
      clone.querySelector(".badge").className = "badge bg-danger";
      clone.querySelector(".btn-danger").disabled = true;
      clone.querySelector(".btn-success").disabled = false;
    }

    clone.querySelector(".badge").textContent = this.#state
      ? "Approved"
      : "Failed";

    clone.querySelector(".btn-success").dataset.name = this.name;
    clone.querySelector(".btn-danger").dataset.name = this.name;

    return clone;
  }
}

// CONSTRUCTION FUNCTION (class Teacher)
class Teacher extends Person {
  #teacher = "Teacher";

  addNewTeacher() {
    const clone = templateTeacher.cloneNode(true);

    clone.querySelector("h5").textContent = this.name;
    clone.querySelector("h6").textContent = this.#teacher;
    clone.querySelector(".lead").textContent = this.age;
    return clone;
  }
}

// Event Delegation Form
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputs = new FormData(form);
  const [name, age, option] = [...inputs.values()]; //Destructuring array (...rest)
  //inputs.forEach((item) => console.log(item));

  if (option === "Student") {
    const student = new Students(name, age);
    studentsArray.push(student);
    Person.printPersonUI(studentsArray, option);
  }

  if (option === "Teacher") {
    const teacher = new Teacher(name, age);
    teacherArray.push(teacher);
    Person.printPersonUI(teacherArray, option);
  }

  console.log(studentsArray);
});

// Event Delegation Document (Buttons)
document.addEventListener("click", (e) => {
  if (e.target.dataset.name) {
    if (e.target.matches(".btn-success")) {
      studentsArray.map((item) => {
        if (item.name === e.target.dataset.name) {
          item.setState = true;
        }
        console.log(item);
        return item;
      });
    }

    if (e.target.matches(".btn-danger")) {
      studentsArray.map((item) => {
        if (item.name === e.target.dataset.name) {
          item.setState = false;
        }
        console.log(item);
        return item;
      });
    }

    Person.printPersonUI(studentsArray, "Student");
  }
});

// // CONSTRUCTOR FUNCTION (Prototype)
// function Person(name) {
//   this.name = name;
//   this.greet = function () {
//     return `${this.name} says Hello!`;
//   };
// }
// // PROTOTYPE METHOD
// Person.prototype.greetSpaish = function () {
//   return `${this.name} says Hola!`;
// };
// // INSTANTIATION
// const personName = new Person("Víctor");

// console.log(personName.greet);

// // NEW FORM OF DECLARATE CONSTRUCTOR FUNCTION (class)
// class Person {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }

//   // Getter, not acept parameters
//   get getName() {
//     return this.name;
//   }

//   // Setter, it only receives one parameter
//   set setName(parameter) {
//     this.name = parameter;
//   }

//   // This method is transported automaticle to Prototype Object.
//   greet() {
//     return `${this.name} says Hello!`;
//   }

//   // Static method
//   //static greetTest(name) {
//   //  return `${name} testing static says`;
//   //}
// }
// // Use or call static method, no require instantation.
// //console.log(Person.greetTest("Henrry"));

// // INSTANTATION
// const person = new Person("Vic", 32);

// // Sending setName in setter method
// //person.setName = "Jimmy the pija kid";

// // Use propertys and methods from class Person.
// //console.log(person.getName);
// //console.log(person.greet());

// // HEREDITY FROM CLASS PERSON (extends)
// class Students extends Person {
//   constructor(nombre, edad, note) {
//     // With super, heredity properties and methods from person class
//     super(nombre, edad);
//     this.notes = note || [];
//   }

//   get getNotes() {
//     return this.note;
//   }

//   set setNotes(parameter) {
//     this.notes.push(parameter);
//   }
// }

// const student = new Students("Frank", 31);

// student.setNotes = 4;
// student.setNotes = 5;
// student.setNotes = 6;

// console.log(student.notes);

// // PRIVATE CLASS FIELDS
// class Students extends Person {
//   //declare array private (#)
//   #arrayNotes = [];

//   get getNotes() {
//     return this.#arrayNotes;
//   }

//   set setNotes(parameter) {
//     this.#arrayNotes.push(parameter);
//   }
// }

// const student = new Students("Frank", 31);

// student.setNotes = 4;
// student.setNotes = 5;
// student.setNotes = 6;

// console.log(student.getNotes);
