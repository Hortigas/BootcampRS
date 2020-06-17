class person {
    constructor(name, weight, height, sex, age, contribution) {
        this.name = name;
        this.weight = weight;
        this.height = height;
        this.sex = sex;
        this.age = age;
        this.contribution = contribution;
        this.IMC = weight / (height * height);
    }
}
//Cálculo de IMC
function testIMC(person) {
    return person.IMC >= 30 ? 'Acima do peso' : 'Abaixo do peso';
}
//Cálculo de aposentadoria
function retire(person) {
    let contri = 35;
    let sum = 95;
    if (person.sex == 'F') {
        contri = 30;
        sum = 85;
    }
    if (
        person.contribution >= contri &&
        person.age + person.contribution >= sum
    )
        return `${person.name}, você pode se aposentar!`;
    else return `${person.name}, você ainda não pode se aposentar!`;
}

let person1 = new person('Alex', 90, 1.6, 'M', 23, 4);
let person2 = new person('Silvana', 65, 1.5, 'F', 60, 30);

console.log(testIMC(person1) + `, IMC: ${person1.IMC.toFixed(2)}`);
console.log(testIMC(person2) + `, IMC: ${person2.IMC.toFixed(2)}`);

console.log('\n' + retire(person1));
console.log(retire(person2));
