import express from "express";
import bodyParser from "body-parser";
import _ from "lodash";

const app = express();
const port = 3000;


const monthNumber = new Date().getMonth();
    const month =(m)=>{

        switch (m) {
                case 0: return "January";
                        
                case 1:return "February";
                case 2:return "March";
                case 3: return "April";
                case 4:return "May";
                case 5:return "June";
                case 6:return "July";
                case 7:return "August";
                case 8: return "September";
                case 9:return "October";
                case 10:return "November";
                case 11: return"December";
                default:    break;
            }
    }

let posts = [{title:"I did it!!!", day:"1, November, 2023", input: "Happy to complete this challenge"}];


app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

const homeContent = "Welcome to our blog, your one-stop destination for insightful articles, exciting stories, and a wealth of knowledge on a wide range of topics. Whether you're passionate about travel, technology, lifestyle, or anything in between, our blog has something for everyone. We believe in the power of sharing experiences and ideas, and our dedicated team of writers is here to bring you fresh and engaging content. Explore our collection of articles, tips, and personal narratives that inspire, inform, and entertain. Plus, we encourage you to become a part of our growing community by contributing your unique perspective. Share your own stories, expertise, and interests with our readers. We can't wait to read your blogs and connect with you on this exciting journey of learning and discovery."

const aboutContent ="Welcome to our blog, your one-stop destination for insightful articles, exciting stories, and a wealth of knowledge on a wide range of topics. Whether you're passionate about travel, technology, lifestyle, or anything in between, our blog has something for everyone. We believe in the power of sharing experiences and ideas, and our dedicated team of writers is here to bring you fresh and engaging content. Explore our collection of articles, tips, and personal narratives that inspire, inform, and entertain. Plus, we encourage you to become a part of our growing community by contributing your unique perspective. Share your own stories, expertise, and interests with our readers. We can't wait to read your blogs and connect with you on this exciting journey of learning and discovery."

const contactContent = `<p class="content">Email: maunykrishna@gmail.com<br>Mobile: 9198451588</p>`



app.get("/", (req, res)=>{
    res.render("home.ejs",
     {
        homeContent: homeContent,
        posts: posts,
    } );
})

app.get("/about", (req, res)=>{
    res.render("about.ejs",{aboutContent: aboutContent});
    console.log(req.params);

})

app.get("/contact", (req, res)=>{
    res.render("contact.ejs", {contactContent: contactContent});
})

app.get("/compose", (req, res)=>{
    
    const data = {
        date: new Date().getDate(),
        month: month(monthNumber),
        year: new Date().getFullYear()
    }
    res.render("compose.ejs", data);

})

app.post("/compose", (req, res)=>{
    const compose={
        title: req.body["title"],
        day: req.body["day"],
        input: req.body["input"],
    }
    posts.push(compose);
    res.redirect("/");
})

app.get("/posts/:postName", function(req,res){

    var parameter = _.lowerCase(req.params.postName);
    
    posts.forEach((post)=>{
        
        var postTitle = _.lowerCase(post.title)

        if(parameter === postTitle){

           res.render("post.ejs",{
            title: post.title,
            day: post.day,
            content: post.input
           })
           console.log("success")
        }
        else{
            console.log("error",parameter, postTitle)
        }
    })

})

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})