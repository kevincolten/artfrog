//Require node, express and mysql
const mysql = require('mysql')
const con = mysql.createConnection({
    host: '35.225.37.118',
    user: 'root',
    password: 'projectx1',
    database: 'testdb'
})

let classArray = null
let teacherName = null
con.connect(function(err){
    if (err) throw err
    con.query("SELECT * FROM teachers", function(err, result){
        if (err) throw err
        console.log(result);
        classArray=result
        teacherName =`${result[0].first_name} ${result[0].last_name}`
    })
})
window.addEventListener('load', appendDoc(), false);
setTimeout(function appendDoc(){
    let nodeContainer = document.createElement('section')
        nodeContainer.innerHTML = teacherName
        document.getElementById('currentCourses').appendChild(nodeContainer)
}, 1000)
setTimeout(function(){console.log('type of : ' + typeof(classArray))}, 1000)












// //Create the class object constructor for Courses.
// class ArtTeacher {
//     constructor(id, name, desc, img){
//         this.id = id;
//         this.name = name;
//         this.desc = desc;
//         this.img = img;
//     }

// }

// //create an Array to hold courses being created.
// const classArry = []

// //create sample courses
//   let newCourse = new ArtTeacher ("1", "Beginner Painting", "This painting course is designed for beginners with little or no previous painting experience ", "img")
//   classArry.push(newCourse)

//   let newCourse1 = new ArtTeacher ("2", "Beginner Drawing", "This drawing course is designed for beginners with little or no previous painting experience ", "img")
//   classArry.push(newCourse)

//   let newCourse2 = new ArtTeacher ("3", "Art Ima Teacher", "Art is an experiences Ceramics and Painting Instructor with 20 years of experience. ", "img")
//   classArry.push(newCourse)

// //create counters to identify programmatically created elements
// console.log(newCourse)
// let counterArt = 2
// let counterUl = 2

// //Create function to alternate class listing background color
// function articleColor(){
//     let articleBkGrnd = document.getElementsByTagName("section")[counterArt]
//     if(counterArt %2!==0){articleBkGrnd.style.backgroundColor = "#22313F"; articleBkGrnd.style.color = '#f0f0f0'} else {articleBkGrnd.style.backgroundColor ='#f0f0f0'; articleBkGrnd.style.color = "#22313F"}
// }

// //create a function to create a new course and push to an array
// function appendClassList(classid) {
//     // let classNode = document.create(classid);
//     let nodeContainer = document.createElement('section')
//     document.getElementById('currentCourses').appendChild(nodeContainer)
    
//     let nodeList = document.createElement('UL')

//     let nodeArticle = document.getElementsByTagName("section")[counterArt]
//     nodeArticle.appendChild(nodeList)

//     for(let key in classid) {
//         let node = document.createElement('li');
//         let nodeListUl = document.getElementsByTagName('UL')[counterUl]
//         node.innerHTML = classid[key];
//         nodeListUl.appendChild(node);  
// }
//     let nodeButton = document.createElement('button')
//     nodeButton.innerHTML = `Register for ${classid.name}`
//     nodeArticle.appendChild(nodeButton)
//     articleColor()
//     counterUl+=1
//     counterArt+=1
    
// // node.appendChild(classNode);
// }

// appendClassList(newCourse)
// appendClassList(newCourse1)
// appendClassList(newCourse2)

//Dynamically change Course listing background colors so that every other course entry has a different background color: