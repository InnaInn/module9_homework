const parser = new DOMParser();

const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

const xmlDOM = parser.parseFromString(xmlString, 'text/xml');

const studentNodes = xmlDOM.querySelectorAll("student");

const result = {list: []};

for (let studentNode of studentNodes) {
    const nameNode = studentNode.querySelector("name");
    const firstName = nameNode.querySelector("first");
    const secondName = nameNode.querySelector("second");
    const ageNode = studentNode.querySelector("age");
    const profNode = studentNode.querySelector("prof");

    const langAttribute = nameNode.getAttribute('lang');

    const student = {
        lang: langAttribute,
        name: firstName.textContent + " " + secondName.textContent,
        age: Number(ageNode.textContent),
        prof: profNode.textContent,
    };
    result.list.push(student);
}

console.log(result);